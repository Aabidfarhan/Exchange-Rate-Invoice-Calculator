# CI/CD Automation Note

## Overview
This document outlines the strategy and implementation details for automating our Pytest (Backend) and Playwright (Frontend E2E) scripts using Azure DevOps.

## CI Strategy

1. **Trigger**
   - The pipeline is triggered automatically on `push` to the `main` branch or a `pull_request` against `main`.

2. **Backend Validation (Pytest)**
   - Environment: `ubuntu-latest` (Linux container) or `windows-latest`.
   - Setup Python 3.11.
   - Install dependencies (`pip install -r requirements.txt`).
   - Run `pytest`.
   - If `pytest` fails, the pipeline fails and stops execution to prevent deploying broken backend code.

3. **Frontend Validation & E2E (Playwright)**
   - Environment: Node.js 18.x or 20.x environment.
   - Install frontend dependencies (`npm install`).
   - Install Playwright browsers (`npx playwright install --with-deps`).
   - Run unit tests (`npm test`).
   - Start the backend and frontend application servers as background jobs on the CI runner.
   - Run Playwright E2E automation script (`npx playwright test`).
   - Publish Playwright HTML report and screenshots as pipeline artifacts for QA review.

## Implementation (Azure DevOps)

An `azure-pipelines.yml` file is located at the root of the repository. This YAML file codifies the pipeline strategy.

### Setup Instructions in ADO:
1. Create a new Azure DevOps Organization (Free tier supports up to 5 users).
2. Create a new Project named `Exchange-Rate-Invoice-Calculator`.
3. Push this repository to Azure Repos.
4. Go to **Pipelines** > **Create Pipeline**.
5. Select **Azure Repos Git**, choose the repository, and select **Existing Azure Pipelines YAML file**.
6. Select `/azure-pipelines.yml` and hit **Run**.
