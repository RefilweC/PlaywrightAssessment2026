# PlaywrightAssessment2026

End-to-end and API tests for the Ndosi Simplified Automation profile-picture upload flow. Tests use Playwright with TypeScript and run against Chromium.

## Coverage

- **UI:** Logs in, navigates to profile settings, verifies a successful image upload, rejects an oversized image, and rejects a non-image file. Native JavaScript alert dialogs are checked for their type and message.
- **API:** Validates login, profile retrieval, and profile-image upload return HTTP 200. Negative cases verify protected profile endpoints reject an invalid access token with HTTP 401.
- The API base URL is `https://www.ndosiautomation.co.za/APIDEV`.
- The UI base URL defaults to `https://ndosisimplifiedautomation.vercel.app/` and can be overridden with `BASE_URL`.

## Requirements

- Node.js 20 or later
- Java 17 or later to generate/open Allure reports
- Playwright Chromium browser

## Setup

Install dependencies and the Chromium browser:

```bash
npm ci
npx playwright install chromium
```

The tests read login credentials from the first data row of `data/testData.xlsx`; ensure it has `email` and `password` columns. Keep real credentials out of public repositories and CI logs. The test images are stored in `data/`.

## Run tests

```bash
# Run the full suite
npm test

# Run UI or API coverage individually
npx playwright test tests/ui/profilePictureValidation.spec.ts
npx playwright test tests/api/profilePictureAPIValidations.spec.ts

# Run with a visible browser
npm run test:headed
```

Tests are configured to run with one worker because the UI and API suites use the same account/session. Playwright captures traces on the first retry and failure screenshots/videos according to the Playwright configuration.

## Reports

Playwright generates its HTML report in `playwright-report/`. View it with:

```bash
npx playwright show-report
```

Allure result files are written to `allure-results/`. Generate and open an Allure HTML report with:

```bash
npm run allure:generate
npm run allure:open
```

## CI/CD

The GitHub Actions workflow at `.github/workflows/playwright.yml` runs the suite on pushes, pull requests, manual dispatches, and nightly at **00:00 South Africa Standard Time (SAST)** (22:00 UTC). It uploads Playwright and Allure reports as workflow artifacts for 30 days.

Successful pushes to `main` or `master` also publish the Allure report to GitHub Pages. Set the repository's Pages build/deployment source to **GitHub Actions** to enable publishing. GitHub scheduled workflows run from the repository's default branch, so the workflow must be committed there for the nightly schedule to take effect.

## Project layout

```text
src/
	api/Clients/       API request clients
	api/Models/        API request and response types
	fixtures/          Shared UI and API Playwright fixtures
	ui/pages/          UI page objects
	data/              Test-data readers
tests/
	api/               Profile API validations
	ui/                Profile-picture UI validations
data/                 Credential workbook and image fixtures
.github/workflows/   GitHub Actions CI, nightly run, and report deployment
```
