Running Tests for Each Project

# Run tests for Project 1
npx playwright test --config=project1/playwright.config.js

# Run tests for Project 2
npx playwright test --config=project2/playwright.config.js

curl -X POST -H "Authorization: token ghp_<token>" \
-H "Accept: application/vnd.github.v3+json" \
https://api.github.com/repos/json10082011/Automation/actions/workflows/project2-ci.yml/dispatches \
-d '{"ref":"main"}' \
--insecure