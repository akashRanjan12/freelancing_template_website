/**
 * Google Apps Script for saving Contact Form messages to Google Sheets / Google Drive
 * and sending instant email notifications to gravityanti87@gmail.com.
 * 
 * CURRENT ACTIVE DEPLOYMENT URL:
 * https://script.google.com/macros/s/AKfycbxa89-8S4l4SVaEc_NgNlBLYyNKjas64OWErlPqEVcf3v7i5LdpM7O20we5xW-qJfOFXA/exec
 */

// 1. SELECT THIS FUNCTION IN THE TOP DROPDOWN AND CLICK "Run" (▶️) ONCE TO AUTHORIZE EMAIL PERMISSION:
function testEmail() {
  MailApp.sendEmail({
    to: "gravityanti87@gmail.com",
    subject: "Test from your Website Contact Form",
    body: "Congratulations! Your Google Apps Script is now fully authorized to send emails to your inbox directly from your website form."
  });
  Logger.log("Email sent successfully!");
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Email", "Message", "Method", "Email Status"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#f3f3f3");
    }
    
    var email = "";
    var message = "";
    var method = "";
    
    if (e.postData && e.postData.contents) {
      try {
        var data = JSON.parse(e.postData.contents);
        email = data.email || "";
        message = data.message || "";
        method = data.method || "";
      } catch (jsonErr) {}
    }
    
    if (!email && e.parameter) {
      email = e.parameter.email || "";
      message = e.parameter.message || "";
      method = e.parameter.method || "";
    }
    
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MM-yyyy HH:mm:ss");
    
    // Send email notification to Gmail
    var emailStatus = "Sent";
    try {
      var recipient = "gravityanti87@gmail.com";
      var subject = "New Client Message from " + (email || "Website Visitor");
      var body = "You received a new inquiry on your website:\n\n" +
                 "Time: " + timestamp + "\n" +
                 "Client Email: " + email + "\n" +
                 "Contact Method: " + (method || "Web Form") + "\n\n" +
                 "Message:\n" + message + "\n\n" +
                 "---\nSaved to your Google Sheet automatically.";

      MailApp.sendEmail({
        to: recipient,
        subject: subject,
        body: body,
        replyTo: email || recipient
      });
    } catch (mailError) {
      emailStatus = "Failed: " + mailError.toString();
    }

    // Append row to Google Sheet (includes whether email was sent or error)
    sheet.appendRow([timestamp, email, message, method || "Web Form", emailStatus]);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        emailStatus: emailStatus 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "online" }))
    .setMimeType(ContentService.MimeType.JSON);
}
