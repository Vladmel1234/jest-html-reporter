const path = require('path');
const fs = require('fs');

const config = {};

// Attempt to locate and assign configurations from package.json
try {
	const packageJson = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8');
	if (packageJson) {
		Object.assign(config, JSON.parse(packageJson)['jest-html-reporter']);
	}
} catch (e) { /** do nothing */ }
// Attempt to locate and assign configurations from jesthtmlreporter.config.json
try {
	const jesthtmlreporterconfig = fs.readFileSync(path.join(process.cwd(), 'jesthtmlreporter.config.json'), 'utf8');
	if (jesthtmlreporterconfig) {
		Object.assign(config, JSON.parse(jesthtmlreporterconfig));
	}
} catch (e) { /** do nothing */ }

/**
 * Returns the output path for the test report
 * @return {String}
 */
const getOutputFilepath = () =>
	config.outputPath || process.env.JEST_HTML_REPORTER_OUTPUT_PATH || path.join(process.cwd(), 'test-report.html');

/**
 * Returns the style-override path for the test report
 * @return {String}
 */
const getStylesheetFilepath = () =>
	config.styleOverridePath || process.env.JEST_HTML_REPORTER_STYLE_OVERRIDE_PATH || path.join(__dirname, '../style.css');

/**
 * Returns the configured test report title
 * @return {String}
 */
const getPageTitle = () =>
	config.pageTitle || process.env.JEST_HTML_REPORTER_PAGE_TITLE || 'Test report';

/**
 * Returns whether the report should contain failure messages or not
 * @return {Boolean}
 */
const shouldIncludeFailureMessages = () =>
	config.includeFailureMsg || process.env.JEST_HTML_REPORTER_INCLUDE_FAILURE_MSG || false;

module.exports = {
	getOutputFilepath,
	getStylesheetFilepath,
	getPageTitle,
	shouldIncludeFailureMessages,
};