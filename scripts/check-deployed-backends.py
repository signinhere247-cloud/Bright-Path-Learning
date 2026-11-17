#!/usr/bin/env python3
"""Read-only audit of deployed BrightPath JS, including lazy-loaded chunks."""
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

SITES = {
    "main": "https://bright-path-learning.onrender.com/",
    "testing": "https://brightpath-cloud-auth-testing.onrender.com/",
}
REF = re.compile(rb"https://([a-z0-9]{20})\.supabase\.co(?:[/\x22\x27\x60]|$)")
# Vite outputs lazy chunks via import("./chunk-xxxx.js") and preload helpers.
CHUNK = re.compile(rb'["\x27\x60]([^"\x27\x60<>\s]{1,180}\.js)["\x27\x60]')
MAX_ASSETS = 60
MAX_BYTES = 4_000_000

class Scripts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []
    def handle_starttag(self, tag, attrs):
        if tag == "script":
            for key, value in attrs:
                if key == "src" and value:
                    self.paths.append(value)

def read(url):
    req = Request(url, headers={"User-Agent": "BrightPath-readonly-backend-audit/1.1"})
    with urlopen(req, timeout=15) as response:
        if urlparse(response.geturl()).netloc != urlparse(url).netloc:
            raise RuntimeError("unexpected redirect host")
        if int(response.headers.get("Content-Length", "0")) > MAX_BYTES:
            raise RuntimeError("asset too large")
        data = response.read(MAX_BYTES + 1)
        if len(data) > MAX_BYTES:
            raise RuntimeError("asset too large")
        return data

def safe_asset_url(site_url, parent_url, candidate):
    url = urljoin(parent_url, candidate)
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.netloc != urlparse(site_url).netloc:
        return None
    if not parsed.path.endswith(".js"):
        return None
    return url

def scan_site(site_url):
    html = read(site_url)
    parser = Scripts()
    parser.feed(html.decode("utf-8", "replace"))
    refs = set(REF.findall(html))
    pending = [(site_url, path) for path in parser.paths]
    seen = set()
    while pending:
        parent, path = pending.pop(0)
        asset_url = safe_asset_url(site_url, parent, path)
        if asset_url is None or asset_url in seen:
            continue
        if len(seen) >= MAX_ASSETS:
            raise RuntimeError("asset scan limit reached; incomplete")
        seen.add(asset_url)
        asset = read(asset_url)
        refs.update(REF.findall(asset))
        for chunk in CHUNK.findall(asset):
            pending.append((asset_url, chunk.decode("utf-8", "replace")))
    return sorted(ref.decode() for ref in refs), len(seen)

def main():
    refs = {}
    for name, url in SITES.items():
        try:
            refs[name], count = scan_site(url)
        except Exception as error:
            print(f"{name}: inspection incomplete ({type(error).__name__})")
            return 2
        print(f"{name}: JS assets scanned = {count}; project refs = {', '.join(refs[name]) if refs[name] else 'unavailable'}")
    if len(refs["main"]) != 1 or refs["testing"] != ["kvsmoxyemuimmlivcevn"]:
        print("BLOCKED: main backend not established or testing backend unexpected")
        return 2
    if refs["main"] == refs["testing"]:
        print("BLOCKED: both sites expose the same Supabase project")
        return 2
    print("Distinct public refs observed; not permission to write to either database.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
