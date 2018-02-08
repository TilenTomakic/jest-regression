# Jest regression

Create report for each git commit. provide diff tool to check for regression between two commits.

## Config

Add entry to package.json

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

## Saving test report for current commit
```
$ jest
```

## Checking regression

```
$ npm run jest-regression <commit hash> <commit hash>
```
