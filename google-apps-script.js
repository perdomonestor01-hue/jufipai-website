/**
 * Google Apps Script for JufipAI Contact Form
 * Spreadsheet ID: 1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Save and name the project "JufipAI Contact Form Handler"
 * 5. Deploy as Web App with these settings:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and replace it in script.js line 501
 */

function doPost(e) {
  try {
    // Your spreadsheet ID - already filled in
    const SPREADSHEET_ID = '1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro';
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get or create the "Contact Submissions" sheet
    let sheet = spreadsheet.getSheetByName('Contact Submissions');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Contact Submissions');
      // Add headers
      sheet.getRange(1, 1, 1, 6).setValues([[
        'Timestamp', 
        'Full Name', 
        'Email Address', 
        'Company Name', 
        'Project Description',
        'Source Page'
      ]]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#fbbf24');
      headerRange.setFontColor('#000000');
    }
    
    // Get form data
    const params = e.parameter;
    const timestamp = new Date();
    const fullName = params['Full Name'] || '';
    const email = params['Email Address'] || '';
    const company = params['Company Name'] || '';
    const description = params['Project Description'] || '';
    
    // Determine source page (contact page vs homepage)
    const referer = e.parameter.referer || 'Unknown';
    const sourcePage = referer.includes('/contact') ? 'Contact Page' : 'Homepage';
    
    // Add data to sheet
    sheet.appendRow([
      timestamp,
      fullName,
      email,
      company,
      description,
      sourcePage
    ]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 6);
    
    // Log success
    console.log('Form submission added successfully:', {
      timestamp: timestamp,
      name: fullName,
      email: email,
      source: sourcePage
    });
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Error processing form submission',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput('JufipAI Contact Form Handler is running. Use POST to submit forms.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test function to verify script works
 * Run this in the Apps Script editor to test
 */
function testFormSubmission() {
  const testData = {
    parameter: {
      'Full Name': 'Test User',
      'Email Address': 'test@example.com',
      'Company Name': 'Test Company',
      'Project Description': 'This is a test submission',
      'referer': 'https://jufipai.com/contact'
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}