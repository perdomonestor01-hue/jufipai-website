// Google Apps Script for JufipAI Contact Form Integration
// This script connects your website contact form to Google Spreadsheet
// AND sends automated welcome email with Calendly scheduling link
// Spreadsheet ID: 1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro

function doPost(e) {
  try {
    // Your Google Spreadsheet ID (under contact@jufipai.com)
    const SPREADSHEET_ID = '13NFtxV9zryZt5BWsdVcWjR7fQIFaxElxcmSKleWq9ws';

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

    // Send automated welcome email with Calendly link
    sendWelcomeEmail(
      formData['Email Address'],
      formData['Full Name'],
      formData['Company Name'] || 'your company'
    );

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data submitted successfully and welcome email sent',
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

/**
 * Sends automated welcome email with Calendly scheduling link
 */
function sendWelcomeEmail(customerEmail, customerName, companyName) {
  try {
    // Email subject
    const subject = 'Welcome to JufipAI - Schedule Your Free 30-Minute Consultation';

    // Calendly scheduling link
    const calendlyLink = 'https://calendly.com/perdomonestor01/30min';

    // HTML Email Template
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #334155;
      max-width: 600px;
      margin: 0 auto;
      background-color: #f8fafc;
    }
    .email-container {
      background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
      padding: 40px 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid;
      border-image: linear-gradient(90deg, #fbbf24, #3b82f6) 1;
    }
    .logo {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, #fbbf24 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    .greeting {
      font-size: 20px;
      color: #1e293b;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .content {
      color: #475569;
      font-size: 16px;
      margin-bottom: 25px;
    }
    .cta-section {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      padding: 30px;
      border-radius: 8px;
      text-align: center;
      margin: 30px 0;
      border: 2px solid #3b82f6;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #fbbf24 0%, #3b82f6 100%);
      color: white !important;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 18px;
      margin: 15px 0;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
    }
    .reminder-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .reminder-title {
      font-weight: 700;
      color: #92400e;
      font-size: 16px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
    .reminder-content {
      color: #78350f;
      font-size: 14px;
      line-height: 1.8;
    }
    .benefits {
      background: #f0fdf4;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0;
    }
    .benefits-title {
      font-weight: 700;
      color: #065f46;
      font-size: 16px;
      margin-bottom: 12px;
    }
    .benefit-item {
      color: #047857;
      font-size: 14px;
      margin: 8px 0;
      padding-left: 20px;
      position: relative;
    }
    .benefit-item:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      color: #64748b;
      font-size: 14px;
    }
    .signature {
      font-weight: 600;
      color: #1e293b;
      margin: 15px 0;
    }
    .ps {
      font-style: italic;
      color: #64748b;
      font-size: 13px;
      margin-top: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">JufipAI</div>
      <div style="color: #64748b; font-size: 14px;">AI Solutions & Automation</div>
    </div>

    <div class="greeting">Hi ${customerName},</div>

    <div class="content">
      Thank you for contacting JufipAI! We received your automation inquiry for <strong>${companyName}</strong> and we're excited to help transform your business with AI-powered solutions.
    </div>

    <div class="cta-section">
      <div style="font-size: 20px; font-weight: 700; color: #1e40af; margin-bottom: 15px;">
        🎯 YOUR NEXT STEP: Schedule Your Free Consultation
      </div>
      <div style="color: #475569; font-size: 15px; margin-bottom: 20px;">
        Click the button below to schedule your 30-minute consultation at your convenience:
      </div>
      <a href="${calendlyLink}" class="cta-button">
        📅 SCHEDULE YOUR CONSULTATION NOW
      </a>
      <div style="color: #64748b; font-size: 13px; margin-top: 15px;">
        Or copy this link: <a href="${calendlyLink}" style="color: #3b82f6;">${calendlyLink}</a>
      </div>
    </div>

    <div class="reminder-box">
      <div class="reminder-title">
        📌 IMPORTANT REMINDERS
      </div>
      <div class="reminder-content">
        We really appreciate your intention of making business with us. When you schedule an appointment, you will receive <strong>2 automated reminders</strong> to attend the virtual meeting. Remember, this is a <strong>30-minute consultation</strong> and we really care about your and our agenda.
        <br><br>
        If you need to reschedule, you can do so easily through the confirmation email.
      </div>
    </div>

    <div class="benefits">
      <div class="benefits-title">💡 What to Expect in Your Consultation:</div>
      <div class="benefit-item">Deep dive into your current workflows</div>
      <div class="benefit-item">Identification of automation opportunities</div>
      <div class="benefit-item">Custom AI integration strategy for your business</div>
      <div class="benefit-item">Clear roadmap and timeline</div>
      <div class="benefit-item">Answer all your questions</div>
    </div>

    <div class="content" style="text-align: center; font-size: 18px; color: #3b82f6; font-weight: 600;">
      Get ready to flip how you work forever! 🚀
    </div>

    <div class="footer">
      <div class="signature">
        Best regards,<br>
        The JufipAI Team
      </div>

      <div class="ps">
        <strong>P.S.</strong> Please check your spam folder if you don't see the Calendly confirmation email after booking. If you have any questions before our call, simply reply to this email.
      </div>

      <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <strong style="color: #1e293b;">JufipAI</strong> - AI Solutions & Automation<br>
        <a href="https://www.jufipai.com" style="color: #3b82f6; text-decoration: none;">www.jufipai.com</a>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Plain text version (fallback for email clients that don't support HTML)
    const plainTextBody = `
Hi ${customerName},

Thank you for contacting JufipAI! We received your automation inquiry for ${companyName} and we're excited to help transform your business with AI-powered solutions.

🎯 YOUR NEXT STEP: Schedule Your Free Consultation

Please schedule your 30-minute consultation at your convenience:
${calendlyLink}

📌 IMPORTANT REMINDERS:

We really appreciate your intention of making business with us. When you schedule an appointment, you will receive 2 automated reminders to attend the virtual meeting. Remember, this is a 30-minute consultation and we really care about your and our agenda.

If you need to reschedule, you can do so easily through the confirmation email.

💡 What to Expect in Your Consultation:

✓ Deep dive into your current workflows
✓ Identification of automation opportunities
✓ Custom AI integration strategy for your business
✓ Clear roadmap and timeline
✓ Answer all your questions

Get ready to flip how you work forever! 🚀

Best regards,
The JufipAI Team

P.S. Please check your spam folder if you don't see the Calendly confirmation email after booking. If you have any questions before our call, simply reply to this email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JufipAI - AI Solutions & Automation
www.jufipai.com
    `;

    // Send email from contact@jufipai.com using Google Workspace
    GmailApp.sendEmail(
      customerEmail,                    // to
      subject,                          // subject
      plainTextBody,                    // body (plain text)
      {
        htmlBody: htmlBody,             // HTML version
        from: 'contact@jufipai.com',    // Send from your custom domain
        name: 'JufipAI Team',           // Display name
        replyTo: 'contact@jufipai.com'  // Reply-to address
      }
    );

    console.log('Welcome email sent successfully from contact@jufipai.com to:', customerEmail);

  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error - we don't want to fail the form submission if email fails
  }
}

function doGet(e) {
  // Handle GET requests (optional - for testing)
  return ContentService
    .createTextOutput('JufipAI Contact Form API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}