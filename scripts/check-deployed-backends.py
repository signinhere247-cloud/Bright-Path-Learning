#!/usr/bin/env python3
"""Read-only check of public BrightPath built assets; print project refs only."""
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
    req = Request(url, headers={"User-Agent": "BrightPath-readonly-backend-audit/1.0"})
    with urlopen(req, timeout=15) as response:
        if response.geturl().split("/")[2] != urlparse(url).netloc:
            raise RuntimeError("unexpected redirect host")
        if int(response.headers.get("Content-Length", "0")) > 4_000_000:
            raise RuntimeError("asset too large")
        return response.read(4_000_001)

def scan_site(url):
    html = read(url)
    if len(html) > 4_000_000:
        raise RuntimeError("index too large")
    parser = Scripts()
    parser.feed(html.decode("utf-8", "replace"))
    refs = set(REF.findall(html))
    for path in parser.paths[:30]:
        asset_url = urljoin(url, path)
        if urlparse(asset_url).netloc != urlparse(url).netloc:
            continue
        if not urlparse(asset_url).path.endswith(".js"):
            continue
        asset = read(asset_url)
        if len(asset) > 4_000_000:
            raise RuntimeError("asset too large")
        refs.update(REF.findall(asset))
    return sorted(ref.decode() for ref in refs)

def main():
    refs = {}
    for name, url in SITES.items():
        try:
            refs[name] = scan_site(url)
        except Exception as error:
            print(f"{name}: unable to inspect deployed assets ({type(error).__name__})")
            return 2
        print(f"{name}: project refs = {', '.join(refs[name]) if refs[name] else 'unavailable'}")
    if len(refs["main"]) != 1 or refs["testing"] != ["kvsmoxyemuimmlivcevn"]:
        print("BLOCKED: project reference unknown or unexpected")
        return 2
    if refs["main"] == refs["testing"]:
        print("BLOCKED: both sites use same Supabase project")
        return 2
    print("Distinct refs observed in publicly deployed assets. No database writes permitted.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
