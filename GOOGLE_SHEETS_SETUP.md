# Google Sheets Form Setup Instructions

## Your Spreadsheet ID:
`1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro`

## Quick Setup Steps:

### Step 1: Deploy Google Apps Script
1. Go to https://script.google.com
2. Click "New Project"
3. Delete any existing code
4. Copy ALL the code from `google-apps-script-code.gs`
5. Paste it into the script editor
6. Click "Save" (name it "JufipAI Form Handler")

### Step 2: Deploy as Web App
1. Click "Deploy" → "New Deployment"
2. Click the gear icon ⚙️ → Select "Web app"
3. Fill in:
   - Description: "JufipAI Form Handler"
   - Execute as: **Me** (your account)
   - Who has access: **Anyone**
4. Click "Deploy"
5. **COPY THE WEB APP URL** (looks like: https://script.google.com/macros/s/AKfyc.../exec)

### Step 3: Update Your Website
1. Open `google-form-handler.js`
2. Find this line (around line 47):
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/AKfycbwJaLV8kY5h4lxQjvZnr7UJy8Gz-MZeoa8LnQqFOuWIlSwPqT9XJO7H3CaDrGxCZOzV/exec';
   ```
3. Replace it with YOUR Web App URL from Step 2
4. Save the file
5. Commit and push to GitHub

### Step 4: Test the Script
1. In Google Apps Script, click "Run" → "testSpreadsheetAccess"
2. It will ask for permissions - click "Review Permissions"
3. Choose your Google account
4. Click "Advanced" → "Go to JufipAI Form Handler (unsafe)"
5. Click "Allow"
6. Check your spreadsheet - you should see a test row added

### Step 5: Set Up Spreadsheet Headers
Add these headers to Row 1 of your spreadsheet:
- A1: Timestamp
- B1: Name
- C1: Email
- D1: Company
- E1: Message
- F1: Source

## Troubleshooting:

### If forms aren't submitting:
1. Check browser console for errors
2. Make sure you deployed the script as "Anyone can access"
3. Verify the Web App URL is correct in google-form-handler.js

### To see backup data (if submission fails):
Open browser console and type: `getFormBackups()`

## Current Status:
- ✅ Form handler created
- ✅ Google Apps Script ready
- ⏳ Need to deploy script to Google
- ⏳ Need to update Web App URL
- ✅ Local backup system in place