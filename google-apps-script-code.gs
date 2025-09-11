// GOOGLE APPS SCRIPT - Deploy this in Google Apps Script
// 1. Go to https://script.google.com
// 2. Create new project
// 3. Paste this code
// 4. Click Deploy > New Deployment
// 5. Choose "Web app" 
// 6. Set "Execute as: Me" and "Who has access: Anyone"
// 7. Copy the Web App URL and update it in google-form-handler.js

function doPost(e) {
  try {
    // Your spreadsheet ID
    const SPREADSHEET_ID = '1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro';
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Parse the incoming data
    let data;
    if (e.postData) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }
    
    // Add timestamp if not provided
    const timestamp = data.timestamp || new Date().toISOString();
    
    // Append row to spreadsheet
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',
      data.company || '',
      data.message || data.description || '',
      data.source || 'Website Form'
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Data added to spreadsheet',
        'row': sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify script has access to spreadsheet
function testSpreadsheetAccess() {
  const SPREADSHEET_ID = '1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro';
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
  
  // Add test row
  sheet.appendRow([
    new Date().toISOString(),
    'Test Name',
    'test@example.com',
    'Test Company',
    'This is a test message from Google Apps Script',
    'Script Test'
  ]);
  
  console.log('Test row added successfully!');
}

// GET request handler (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput('JufipAI Form Handler is running! Use POST to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}