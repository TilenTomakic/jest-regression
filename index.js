'use strict';

var execSync = require('child_process').execSync;
var path     = require('path');
var fs       = require('fs');

var commit      = execSync('git rev-parse HEAD').toString().split('\n').join('');
var commitShort = execSync('git rev-parse --short HEAD').toString().split('\n').join('');
var branch      = execSync('git rev-parse --abbrev-ref HEAD').toString().split('\n').join('');

var config = {
  skip                : false,
  skipNextProcessor   : false,
  outputDir           : './jest-regression',
  testResultsProcessor: undefined
};

// Attempt to locate and assign configurations from package.json
try {
  const packageJson = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8');
  if (packageJson) {
    Object.assign(config, JSON.parse(packageJson)[ 'jest-regression' ]);
  }
} catch (e) {
}

module.exports = function (data) {
  if (!config.skip) {
    var out = {};
    data.testResults.forEach(y => {
      var path = y.testFilePath;
      y.testResults.forEach(x => {
        var fullName = x.fullName;
        var status   = x.status; // "failed" | "pending" | "passed"

        out[ path ]             = out[ path ] || {};
        out[ path ][ fullName ] = { status: status };
      });
    });

    // var fileName = branch + '-' + commit + '.json';
    var fileName = commitShort + '.json';
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir);
    }
    fs.writeFileSync(config.outputDir + '/' + fileName, JSON.stringify(out, null, 2), 'utf8');
    fs.writeFileSync(config.outputDir + '/last', fileName, 'utf8');
    console.log('Report saved to: ' + config.outputDir + '/' + fileName);
  } else {
    console.log('Jest-regression save skipped.');
  }

  if (config.testResultsProcessor && !config.skipNextProcessor) {
    if (config.testResultsProcessor.startsWith('./') || config.testResultsProcessor.startsWith('../')) {
      config.testResultsProcessor = '../../' + config.testResultsProcessor;
    }

    return require(config.testResultsProcessor)(data);
  }

  return data;
};
