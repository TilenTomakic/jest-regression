var fs       = require('fs');
var path     = require('path');

var config = {
  outputDir           : './jest-regression',
};

const packageJson = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8');
if (packageJson) {
  Object.assign(config, JSON.parse(packageJson)[ 'jest-regression' ]);
}

var codeA = process.argv[3];
var codeB = process.argv[2];
console.log('Checking for test regression from commit ' + codeB + ' to ' + codeA + '.');


var a = config.outputDir + '/' + codeA + '.json';
var b = config.outputDir + '/' + codeB + '.json';

var txtA = JSON.parse(fs.readFileSync(a, 'utf8'));
var txtB = JSON.parse(fs.readFileSync(b, 'utf8'));

var newlyFailed = [];

Object.keys(txtB).map(function (path) {
  Object.keys(txtB[path]).map(function (name) {
    if (txtB[path][name].status === 'passed') {
      if (txtA[path] && txtA[path][name] && txtA[path][name].status === 'failed') {
        newlyFailed.push({
          path: path,
          name: name
        });
      }
    }
  })
})

if (newlyFailed.length === 0) {
  console.log('\x1b[32m', 'NO REGRESSION DETECTED' ,'\x1b[0m');
} else {
  console.log('Regression detected.\n-----------');
  newlyFailed.forEach(function (x) {
    console.log('\x1b[36m', 'FAILED' ,'\x1b[0m', ' ', x.name);
    console.log(x.path);
    console.log();
  })
}
