import importlib.util
import pathlib
import unittest

module_path = pathlib.Path(__file__).resolve().parents[1] / "scripts" / "check-deployed-backends.py"
spec = importlib.util.spec_from_file_location("backend_audit", module_path)
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

class PublicAssetAuditTests(unittest.TestCase):
    def test_same_origin_chunk(self):
        self.assertEqual(audit.safe_asset_url("https://bright-path-learning.onrender.com/", "https://bright-path-learning.onrender.com/assets/index.js", "./cloud.js"), "https://bright-path-learning.onrender.com/assets/cloud.js")
    def test_reject_cross_origin(self):
        self.assertIsNone(audit.safe_asset_url("https://bright-path-learning.onrender.com/", "https://bright-path-learning.onrender.com/assets/index.js", "https://example.com/cloud.js"))
    def test_find_lazy_chunk(self):
        self.assertIn(b"./cloud-abc.js", audit.CHUNK.findall(b'const x=()=>import("./cloud-abc.js")'))
    def test_missing_main_ref_stays_blocked(self):
        output = StringIO()
        with patch.object(audit, 'scan_site', side_effect=[([], 2), (['kvsmoxyemuimmlivcevn'], 2)]), redirect_stdout(output):
            result = audit.main()
        self.assertEqual(result, 2)
        self.assertIn('no Supabase URL found', output.getvalue())
        self.assertIn('no accounts or database writes', output.getvalue())
    def test_supabase_ref(self):
        self.assertEqual(audit.REF.findall(b'https://kvsmoxyemuimmlivcevn.supabase.co"'), [b'kvsmoxyemuimmlivcevn'])

if __name__ == "__main__":
    unittest.main()
