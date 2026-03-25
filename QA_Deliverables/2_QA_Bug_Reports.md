# Bug Reports

## BR-001: Frontend Blank Screen / Rendering Timeout on Initial Load
**Severity:** Critical (Sev-1)  
**Status:** Open  
**Environment:** Localhost, Chrome/Safari  

**Description:**  
When launching the frontend application without a successful Redux provider initialization or on a fresh `npm start` / `npx serve build`, the root path `/` sometimes fails to render the `<ConverterForm />` component, leading to a blank screen or missing input elements.

**Steps to Reproduce:**  
1. Start the React frontend server.
2. Navigate to `http://localhost:3000/`.
3. Wait for the application to load.
4. Try to interact with the "USD Amount" input field.

**Expected Result:**  
The Converter Form should mount and display fields for USD Amount, Rate, Source, and Date.

**Actual Result:**  
The form does not render properly, and E2E scripts time out waiting for `input[name="usd_amount"]`. A console error may be thrown regarding Redux store context.

**Attachments / Evidence:**  
- `test-results/.../error-context.md`
- Playwright screenshot timeout.

---

## BR-002: Missing required validation enforcing on Date field
**Severity:** Medium (Sev-3)  
**Status:** Open  
**Environment:** Localhost  

**Description:**  
The `conversion_date` field is marked as `required` in HTML5, but if a user submits the form via programmatic interaction or bypassing HTML validation, the backend does not reject the payload properly, or the frontend fails to catch empty values if the state is altered directly.

**Steps to Reproduce:**  
1. Fill `usd_amount` and `rate` fields.
2. Leave `conversion_date` empty or clear it.
3. Submit the form.

**Expected Result:**  
The form submission should be blocked by React/Redux validation, displaying an inline error message requiring the date.

**Actual Result:**  
The form attempts to submit an empty date string, which either causes a 500 error on the backend or fails silently.
