# Test Cases for Exchange Rate Invoice Calculator

## Overview
This document outlines the comprehensive test scenarios for the Exchange Rate Invoice Calculator application, covering both frontend validation and backend API interactions.

| Test Case ID | Feature | Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| TC-001 | Conversion | Convert USD to JPY with valid rate | Application is running | 1. Enter valid USD amount (e.g. 100)<br>2. Enter valid rate (e.g. 150.5)<br>3. Click Convert | Successful conversion, JPY amount displayed | | Not Executed |
| TC-002 | Validation | Enter negative USD | Application is running | 1. Enter -50 for USD<br>2. Submit | Form shows validation error for USD field | | Not Executed |
| TC-003 | Validation | Enter negative rate | Application is running | 1. Enter 100 for USD<br>2. Enter -10 for rate<br>3. Submit | Form shows validation error for rate field | | Not Executed |
| TC-004 | Validation | Submit empty form | Application is running | 1. Leave all fields empty<br>2. Submit | Required validation errors triggered | | Not Executed |
| TC-005 | Conversion | Select BOJ rate source | Application is running | 1. Select BOJ from rate source dropdown<br>2. Submit | Conversion uses BOJ source label | | Not Executed |
| TC-006 | Conversion | Select Mizuho TTM source | Application is running | 1. Select Mizuho TTM from rate source<br>2. Submit | Conversion uses Mizuho TTM source label | | Not Executed |
| TC-007 | Conversion | Select Manual rate source | Application is running | 1. Select Manual from rate source<br>2. Enter custom rate<br>3. Submit | Conversion uses Manual source label | | Not Executed |
| TC-008 | Calculation | Verify JPY rounding | Application is running | 1. Enter 100 USD<br>2. Enter 149.999 rate<br>3. Submit | JPY amount is correctly rounded to nearest integer (or based on spec) | | Not Executed |
| TC-009 | History | Verify record appears in history | TC-001 passed | 1. Navigate to History section | The newly created conversion appears at the top | | Not Executed |
| TC-010 | History | Verify pagination works | >10 records exist | 1. Go to History<br>2. Click Next Page | History list displays next set of records | | Not Executed |
| TC-011 | History | Verify date filter works | Records exist | 1. Apply date filter matching a record<br>2. Apply date filter not matching | List filters appropriately | | Not Executed |
| TC-012 | History | Delete conversion record | Record exists | 1. Click Delete next to a record<br>2. Confirm | Record is removed from DB and UI | | Not Executed |
| TC-013 | UI/UX | Verify success message | Application is running | 1. Perform successful conversion | Success toast/message is displayed | | Not Executed |
| TC-014 | API | Verify backend validation errors | Backend is running | 1. Send invalid JSON payload to POST /convert | Appropriate 400/422 HTTP response returned | | Not Executed |
| TC-015 | API | Verify API response using Swagger | Backend is running | 1. Go to /docs<br>2. Execute POST /convert | Swagger displays 200 OK and response schema | | Not Executed |
