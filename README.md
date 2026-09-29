# PlaywrightAssessment2026
Ndosi's final assessment-Upload a profile picture

## Run tests and view reports

Run the suite with `npm test`. Playwright writes the standard HTML report to `playwright-report/` and Allure result files to `allure-results/`.

Generate and open the Allure HTML report locally with `npm run allure:generate` followed by `npm run allure:open`. Allure CLI requires Java 17 or later.

## CI/CD

The GitHub Actions workflow in `.github/workflows/playwright.yml` runs the Chromium tests on pushes, pull requests, and manual dispatches. It stores Playwright and Allure reports as workflow artifacts. Successful pushes to `main` or `master` publish the Allure report to GitHub Pages; configure the repository's Pages source to **GitHub Actions** to enable deployment.
