/**
 * Google Apps Script for saving Contact Form messages to Google Sheets / Google Drive
 * AND sending instant email notifications to your Gmail inbox!
 * 
 * ============================================================================
 * STEP-BY-STEP INSTRUCTIONS (MUST BE DONE IN GOOGLE APPS SCRIPT EDITOR):
 * ============================================================================
 * 1. Open your Google Sheet in Google Drive (the one where rows are being saved)
 * 2. In top menu, click: Extensions -> Apps Script
 * 3. Delete everything in the editor and PASTE THIS ENTIRE FILE
 * 4. Press Ctrl + S to save
 * 
 * 5. >>> IMPORTANT: ONE-TIME EMAIL PERMISSION AUTHORIZATION <<<
 *    - In the top toolbar, find the dropdown menu that says "doPost" or "Select function"
 *    - Click the dropdown and select: authorizeAndTestEmail
 *    - Click the "Run" button (triangle icon)
 *    - A popup will say "Authorization required" -> Click "Review permissions"
 *    - Choose your Google account (gravityanti87@gmail.com)
 *    - Click "Advanced" (small text at bottom)
 *    - Click "Go to Untitled project (unsafe)"
 *    - Click "Allow"
 *    - Check your Gmail inbox: you will instantly receive a test email!
 * 
 * 6. >>> IMPORTANT: UPDATE YOUR WEB APP DEPLOYMENT <<<
 *    - Click the blue "Deploy" button at top right
 *    - Select "Manage deployments"
 *    - Click the Pencil (Edit) icon next to your active deployment
 *    - In the "Version" dropdown, choose: "New version"
 *    - Click "Deploy" (blue button at bottom right)
 *    - Click "Done"
 * ============================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Email", "Message", "Method", "Email Status"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#f3f3f3");
    }
    
    var email = "";
    var message = "";
    var method = "";
    
    // Parse JSON body if sent as JSON
    if (e.postData && e.postData.contents) {
      try {
        var data = JSON.parse(e.postData.contents);
        email = data.email || "";
        message = data.message || "";
        method = data.method || "";
      } catch (jsonErr) {}
    }
    
    // Parse form-encoded parameter if not found in JSON
    if (!email && e.parameter) {
      email = e.parameter.email || "";
      message = e.parameter.message || "";
      method = e.parameter.method || "";
    }
    
    // Format current timestamp in Indian Standard Time (IST)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MM-yyyy HH:mm:ss");
    var recipient = "gravityanti87@gmail.com";
    var emailStatus = "Pending";
    
    // Send instant email notification to your Gmail
    try {
      var subject = "🚀 New Client Message from: " + (email || "Website Visitor");
      var htmlBody = 
        '<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">' +
        '<div style="border-bottom: 2px solid #6366f1; padding-bottom: 12px; margin-bottom: 20px;">' +
        '<h2 style="color: #4f46e5; margin: 0; font-size: 22px;">New Client Message Received</h2>' +
        '<p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Submitted via your website portfolio contact form</p>' +
        '</div>' +
        '<p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:' + (email || "") + '" style="color: #4f46e5; text-decoration: none;">' + (email || "Not provided") + '</a></p>' +
        '<p style="margin: 8px 0;"><strong>Date & Time:</strong> ' + timestamp + ' (IST)</p>' +
        '<p style="margin: 8px 0;"><strong>Method:</strong> ' + (method || "Direct Form") + '</p>' +
        '<div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid #6366f1; border-radius: 4px;">' +
        '<p style="margin: 0 0 8px 0; font-weight: bold; color: #334155;">Client Message:</p>' +
        '<p style="margin: 0; white-space: pre-wrap; color: #0f172a; font-size: 15px;">' + (message ? message.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "No message text provided.") + '</p>' +
        '</div>' +
        '<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #94a3b8; text-align: center;">' +
        'This message has also been saved to your Google Sheet database in Google Drive.' +
        '</div>' +
        '</div>';

      var plainBody = "New Inquiry from: " + (email || "Website Visitor") + "\n" +
                      "Time: " + timestamp + "\n" +
                      "Contact Method: " + (method || "Direct Form") + "\n\n" +
                      "Message:\n" + message + "\n\n" +
                      "---\nSaved to your Google Sheet automatically.";

      // Send via GmailApp (primary) or MailApp (fallback)
      try {
        GmailApp.sendEmail(recipient, subject, plainBody, {
          name: "Portfolio Contact Form",
          htmlBody: htmlBody,
          replyTo: email || recipient
        });
        emailStatus = "Delivered via GmailApp";
      } catch (err1) {
        MailApp.sendEmail({
          to: recipient,
          subject: subject,
          body: plainBody,
          htmlBody: htmlBody,
          replyTo: email || recipient
        });
        emailStatus = "Delivered via MailApp";
      }
    } catch (mailError) {
      emailStatus = "Failed: " + mailError.toString();
    }

    // Append row with email delivery status to Google Sheet
    sheet.appendRow([timestamp, email, message, method || "Direct Form", emailStatus]);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        emailStatus: emailStatus,
        message: "Saved to Google Sheet and processed email delivery" 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allows testing GET requests in browser to verify deployment
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "online", message: "Contact Form Web App is active and ready to accept POST requests." }))
    .setMimeType(ContentService.MimeType.JSON);
}

// =========================================================================
// RUN THIS FUNCTION ONCE IN APPS SCRIPT EDITOR TO AUTHORIZE EMAIL PERMISSION!
// In top toolbar: select 'authorizeAndTestEmail' -> Click 'Run' -> Click 'Review Permissions' -> 'Allow'
// =========================================================================
function authorizeAndTestEmail() {
  var recipient = "gravityanti87@gmail.com";
  var testSubject = "✅ Website Contact Form - Email Authorization Test";
  var testBody = "Hello Akash!\n\nIf you are reading this email, your Google Apps Script email sending is 100% AUTHORIZED and WORKING!\n\nAll future messages submitted through your website contact form will now be delivered straight to your inbox and saved to Google Sheets.";
  
  try {
    GmailApp.sendEmail(recipient, testSubject, testBody, {
      name: "Portfolio Contact System"
    });
    Logger.log("SUCCESS! Test email sent via GmailApp to " + recipient);
  } catch (err) {
    MailApp.sendEmail(recipient, testSubject, testBody);
    Logger.log("SUCCESS! Test email sent via MailApp to " + recipient);
  }
}