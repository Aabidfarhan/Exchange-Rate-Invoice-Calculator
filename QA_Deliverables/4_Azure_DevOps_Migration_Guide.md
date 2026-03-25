# Azure DevOps Migration Guide

This guide covers the manual steps required to move this project to Azure DevOps under a single organization and set up the CI/CD automation pipelines. Everything is configured to stay within the free tier (up to 5 users).

## 1. Organization & Project Setup
1. Navigate to [dev.azure.com](https://dev.azure.com).
2. Sign in with your Microsoft account.
3. If you don't have an organization, create a new one (e.g., `Aabidfarhan-Org`). The free tier includes 5 basic users and 1,800 minutes of free CI/CD per month.
4. Click **New Project**, name it `Exchange-Rate-Invoice-Calculator`.
5. Set the visibility to **Private** and click **Create**.

## 2. Push Code to Azure Repos
Your project is currently stored locally (and likely on GitHub). You need to push it to your new Azure DevOps Repository.

1. In your new ADO project, go to **Repos** > **Files**.
2. Under "Push an existing repository from command line", copy the provided Git URL.
3. Open a terminal in the root of your local project and run the following commands:
   ```bash
   # Add Azure DevOps as a remote destination
   git remote add azure <YOUR_AZURE_DEVOPS_REPO_URL>
   
   # Push your code
   git push -u azure main
   ```
   *(You will be prompted to authenticate. Use your Microsoft account credentials or Generate Git Credentials from the ADO UI.)*

## 3. Configure the CI/CD Pipeline
The `azure-pipelines.yml` file at the root directory contains the full Pytest and Playwright multi-stage workflow.

1. In ADO, navigate to **Pipelines** > **Pipelines**.
2. Click **Create Pipeline**.
3. For "Where is your code?", select **Azure Repos Git**.
4. Select the `Exchange-Rate-Invoice-Calculator` repository.
5. In the "Configure your pipeline" step, choose **Existing Azure Pipelines YAML file**.
6. Select the `azure-pipelines.yml` file from the dropdown.
7. Click **Run**.

## 4. Pipeline Execution & Evaluation
- The pipeline will automatically install dependencies and run tests across both the backend and frontend.
- **Backend**: Captures pytest unit tests and outputs a standard JUnit XML.
- **Frontend**: Runs Playwright scripts covering E2E UI testing and captures test executions.
- Upon completion, the Playwright HTML report and screenshots will be published as **Pipeline Artifacts**, accessible directly from the Pipeline run summary page.
