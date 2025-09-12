// Google Apps Script for JufipAI Contact Form Integration
// This script connects your website contact form to Google Spreadsheet
// Spreadsheet ID: 1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro

function doPost(e) {
  try {
    // Your Google Spreadsheet ID
    const SPREADSHEET_ID = '1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro';
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet(); // or specify sheet name: spreadsheet.getSheetByName('Sheet1');
    
    // Get form data
    const formData = e.parameter;
    
    // Create timestamp
    const timestamp = new Date();
    
    // Prepare data for spreadsheet (matching your column structure)
    // Column A: Full Name
    // Column B: Email Address  
    // Column C: Company Name
    // Column D: Project Description
    // Column E: Timestamp
    const rowData = [
      formData['Full Name'] || '',
      formData['Email Address'] || '',
      formData['Company Name'] || '',
      formData['Project Description'] || '',
      timestamp
    ];
    
    // Add data to spreadsheet
    sheet.appendRow(rowData);
    
    // Log success
    console.log('Data added to spreadsheet:', rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data submitted successfully',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error submitting data: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (optional - for testing)
  return ContentService
    .createTextOutput('JufipAI Contact Form API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}