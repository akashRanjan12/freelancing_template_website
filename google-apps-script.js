/**
 * Google Apps Script for saving Contact Form messages to Google Sheets / Google Drive
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open Google Sheets (https://sheets.new) while logged into: gravityanti87@gmail.com
 * 2. Name your spreadsheet (e.g., "Client Website Inquiries")
 * 3. In the top menu, go to: Extensions -> Apps Script
 * 4. Replace any default code with THIS entire file content and press Save (Ctrl + S)
 * 5. Click the blue "Deploy" button at top right -> Select "New deployment"
 * 6. Click the gear icon next to "Select type" -> choose "Web app"
 * 7. Set configuration:
 *    - Description: "Website Contact Form"
 *    - Execute as: "Me (gravityanti87@gmail.com)"
 *    - Who has access: "Anyone" (VERY IMPORTANT: must be "Anyone", NOT "Only myself")
 * 8. Click "Deploy" -> Click "Authorize access" -> Choose your Google account -> Click "Advanced" -> "Go to Untitled project (unsafe)" -> Click "Allow"
 * 9. Copy the "Web app URL" (starts with https://script.google.com/macros/s/.../exec)
 * 10. Give that URL to the assistant or paste it into components/Contact.js as GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Email", "Message", "Method"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#f3f3f3");
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
    
    // Append row to Google Sheet
    sheet.appendRow([timestamp, email, message, method || "Web Form"]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Saved to Google Sheet successfully" }))
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
