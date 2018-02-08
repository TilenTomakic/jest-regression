# Jest regression

Create report for each git commit. provide diff tool to check for regression between two commits.

## Config

You can configure via package.json

Example:

```
{
 ...
 "jest-regression": {
    "outputDir": "./jest-regression"
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

- testResultsProcessor - used to call next results processor, for example jest-html-reporter
- skip - to skip jest-regression
- skipNextProcessor - to prevent running next results processor
- outputDir - save dir for jest-regression


## Saving test report for current commit
```
$ jest
```

## Checking regression

```
$ npm run jest-regression <commit hash> <commit hash>
```
