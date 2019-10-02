var ss = SpreadsheetApp.getActiveSpreadsheet();
var super = "Michelle"
var superEmail = "mberkowitz@tryko.com"

function first_req() {
  var first_req = ss.getSheetByName('first_req');
  var lastRow = first_req.getLastRow();
  var fillDown = first_req.getRange(lastRow,11,1);
  first_req.getRange("k2:p2").copyTo(fillDown);
  
  //get varibles of new request sent in array
  var reqData = first_req.getRange(lastRow, 1, 1, 11).getValues()[0];
  
  //email templet for approval request
  
  var approvalLink = "https://docs.google.com/forms/d/e/1FAIpQLScmpeIPxq__S3u_lBJXGQr0jin0cgRuv84blkiUWaRlC3U3Ww/viewform?usp=pp_url&entry.1832772607="+ reqData[10] +"&entry.19759008="+ reqData[1] +"&entry.499336511="+ super +"";
  var subject = "New PO Request From " +reqData[2];
  var emailBody = "This is an error for PO Request Please forward to adamp@tryko.com" 
  
  Logger.log(reqData);
  var htmlBody = 
      
      "<h3>A new PO Request has been enterd.</h3>" +

        "<p><b>Request By:</b> " + reqData[2] +
          "<br/><b>For:</b> " +" need to ad property to form " + 
          "<br/><b>CC Purchase?:</b> "+ reqData[3] +
          "<br/><b>Chargable to Resident?:</b> " + reqData[9]  +  
          "<br/><b>Vendor:</b> "+ reqData[4] +
          "<br/><b>Projected Cost:</b> " + reqData[5] +
          "<br/><b>Unit/Location:</b> " + reqData[6] +
          "<br/><b>Reason For Purchase:</b> " + reqData[7] +
          "<br/>"+
          "<br/><b>Order Details:</b> "+ reqData[8] +  
            
        "</p>" +

        "<a href = " + approvalLink + "><BUTTON><b>Click Here To Approve</b></BUTTON></a>"
  

  
 var optAdvancedArgs = {htmlBody: htmlBody}; 
  
 MailApp.sendEmail(superEmail, subject, emailBody, optAdvancedArgs); //include email address from var at top without quotes, or manually enter a unique email address with quotes 
  
}

function approval() {
  
  var approval = ss.getSheetByName("appr_form");
  var lastRow = approval.getLastRow();
  var fillDown = approval.getRange(lastRow,7,1);
  
  approval.getRange("g2:j2").copyTo(fillDown);
  
  var approvalData = approval.getRange(lastRow, 1, 1, 10).getValues()[0];
  
  //email templet
  
  var subject = "PO Request Update"
  var emailBody = "This is an error for PO Request Please forward to adamp@tryko.com"
  var PONum = '';
  if (approvalData[3] === "APPROVED"){
    PONum = "<br/><b>PO Num: </b> " +approvalData[1]+".";
  }
  var htmlBody = 
      
      "<h3>Your PO Request for "+approvalData[7]+".</h3>" +

        "<p><b>Vendor:</b> " + approvalData[7] +
          "<br/><b>Amount:</b> " + approvalData[8] +
          "<br/><b>Amount:</b> " + approvalData[9] +
          
          "<br/>"+
          "<br/><b>Your Request Has Been </b> "+ approvalData[3] +
            PONum+
          "<br/><b>Notes </b> " +
           "<br/>"+approvalData[5]+  
        "</p>" +

        "If you have any quastions please contact your purchase approving manager"
  

  
 var optAdvancedArgs = {htmlBody: htmlBody};
  
 MailApp.sendEmail(superEmail, subject, emailBody, optAdvancedArgs); 
  
}

