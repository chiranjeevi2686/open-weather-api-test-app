var reporter = require('cucumber-html-reporter');
const path =  __dirname;

var options = {
        theme: 'bootstrap',
        jsonFile: `${path}/report.json`,
        output: `${path}/cucumber_report.html`,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"1.0",
            "Test Environment": "PRE-PROD",
            "Agent": "superTest",
            "Platform": "MAC OS",
        }
    };

    reporter.generate(options);