// Explicitly opt-in during a dedicated testing-site build only.
// Prints safe metadata to stdout; no secrets, files or deployments are created.
import {createTestingBuildReport} from '../src/testingBuildReport.js';
try{
 const report=createTestingBuildReport(process.env);
 process.stdout.write(JSON.stringify(report)+'\n');
}catch(error){
 process.stderr.write('Testing build report refused: '+error.message+'\n');
 process.exitCode=1;
}
