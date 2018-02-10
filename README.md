# Jest regression

Simple zero dependency tool to check for test regression between commits.

Features:
- create basic json report for current project state and save it under current checked out git commit id
- check for test regression between two commits `node ./node_modules/.bin/jest-regression <fom commit> <to commit>`

## Installation
`npm install jest-regression`

## Running

First create report for your current project state. Just simply run all tests with `jest`.
Report with name of current checked out git commit id will be saved inside `./jest-regression` folder (you can change default folder via config).
 
For instruction purposes lets say commit id is 79262dc.
Example: `./jest-regression/79262dc.json`

When you our your co-worker do next commit (lets say it's 4930822), just simply run tests again.
Report will saved:
Example: `./jest-regression/4930822.json`


Now you can make regression test with command `jest-regression <fom commit> <to commit>`.

Example:
```
$ node ./node_modules/.bin/jest-regression 79262dc 4930822
```
... or if you add "jest-regression": "jest-regression" under scripts in package.json:

<package.json>
```
{
 ...
 "scripts": {
    "jest-regression": "jest-regression"
 },
 ...
}
```

```
$ npm run jest-regression 79262dc 4930822
```


Example output:
```
$ jest-regression "79262dc" "4930822"

Checking for test regression from commit 5751a1a to 01d30c6.
Regression detected.
-----------
 FAILED    Test suite A Test 001
/path/to/test/file.spec.ts

 FAILED    Test suite A Test 002
/path/to/test/file.spec.ts

 FAILED    Test suite B Test 001
/path/to/test/file.b.spec.ts
```

## Config

By default you don't have to configure anything.

| Key  | Default value  | Description  |
|---|---|---|
| testResultsProcessor  | / | used to call next results processor, for example jest-html-reporter  |
| skip | false | to skip jest-regression  |
| skipNextProcessor | false | to prevent running next results processor  |
| outputDir | './jest-regression'  | save directory for jest-regression  |


Configuration is done via package.json

Example - changing output dir:

```
{
 ...
 "jest-regression": {
    "outputDir": "./jest-regression"
  }
  ...
}
```

Example - passing results to `jest-html-reporter` package:
```
{
 "scripts": {
    "jest-regression": "jest-regression"
 },
    
 ...
 "jest-regression": {
    "testResultsProcessor": "./node_modules/jest-html-reporter",
    "skipNextProcessor": false,
  }
  ...
}
```

Example - skip report creation:
```
{
 ...
 "jest-regression": {
    "skip": true
  }
  ...
}
```

Full example:
```
{
 "scripts": {
    "jest-regression": "jest-regression"
 },
    
 ...
 "jest-regression": {
    "testResultsProcessor": "./node_modules/jest-html-reporter",
    "skip": false,
    "skipNextProcessor": false,
    "outputDir": "./jest-regression"
  }
  ...
}
```
