"""Inventory historical BrightPath archives without modifying or deploying them."""
from pathlib import Path
from zipfile import ZipFile
from hashlib import sha256
import json

root = Path(__file__).resolve().parents[3]
archives = sorted(root.glob('BrightPath-Learning-*.zip'))
features = {
    'supabase_schema': ('supabase-schema.sql', 'supabase/migrations/'),
    'family_profile_ui': ('family_profiles', 'FAMILY_KEY', 'addProfile'),
    'curriculum': ('extraLessons', 'lessons.push', 'ks4'),
    'threejs_world': ('THREE.WebGLRenderer', 'from \'three\''),
    'cloud_auth': ('signInWithPassword', 'supabase.auth'),
    'guest_backup': ('parseBackup', 'restoreBackup'),
}
report = []
for path in archives:
    with ZipFile(path) as z:
        entries = [e for e in z.infolist() if not e.is_dir()]
        source = [(e.filename, z.read(e)) for e in entries if e.filename.endswith(('.js', '.jsx', '.sql'))]
        combined = '\n'.join(name + '\n' + data.decode('utf-8', 'replace') for name, data in source)
        report.append({
            'archive': path.name,
            'sha256': sha256(path.read_bytes()).hexdigest(),
            'files': len(entries),
            'source_files': [name for name, _ in source],
            'feature_indicators': {name: any(token in combined for token in tokens) for name, tokens in features.items()},
        })
out = Path(__file__).resolve().parents[1] / 'ARCHIVE-AUDIT.json'
out.write_text(json.dumps(report, indent=2) + '\n')
print(f'Inspected {len(report)} archives; report: {out}')
for r in report:
    print(f"{r['archive']}: {', '.join(k for k,v in r['feature_indicators'].items() if v) or 'no indicators'}")
