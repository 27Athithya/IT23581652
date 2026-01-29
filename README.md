# Tamil Changathi Test Suite

Playwright test suite for testing Tamil language conversion on the Changathi platform.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests:
```bash
npx playwright test
```

### Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

### Run a specific test file:
```bash
npx playwright test tests/sample.spec.js
```

### Run a specific test by name:
```bash
npx playwright test -g "Personal feeling statement"
```

### Run tests in debug mode:
```bash
npx playwright test --debug
```

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

Test results are also saved in markdown format as `test-report.md`

## Project Structure

- `tests/` - Test files
- `custom-reporter.js` - Custom test reporter
- `playwright.config.js` - Playwright configuration
- `test-results/` - Test execution results
- `playwright-report/` - HTML test reports

## Configuration

Edit `playwright.config.js` to modify:
- Test timeout
- Retry attempts
- Browser viewport size
- Other Playwright settings
