var ss = SpreadsheetApp.getActiveSpreadsheet();
var super = "Shannon"
var superEmail = "mabrams@tryko.com"
//ssaks@tryko.com

function first_req() {
  try{
    var first_req = ss.getSheetByName('first_req');
    var lastRow = first_req.getLastRow();
    var fillDown = first_req.getRange(lastRow,12,1);
    first_req.getRange("l2:r2").copyTo(fillDown);
  
    //get varibles of new request sent in array
    var reqData = first_req.getRange(lastRow, 1, 1, 12).getValues()[0];
  
    //email templet for approval request
    var approvalLink = "https://docs.google.com/forms/d/e/1FAIpQLSd24Be3IG1Em5vuQVN_-_rZVTUoDkbfrYe3T-taFe24t0okqg/viewform?usp=pp_url&entry.173543358="+reqData[11]+"&entry.795140384="+reqData[1]+"&entry.1406509789="+super+ ""
      
    var subject = "New PO Request From " +reqData[2];
    var emailBody = "This is an error for PO Request Please forward to adamp@tryko.com" 
  
    Logger.log(reqData);
    var htmlBody = 
      
      "<h3>A new PO Request has been enterd.</h3>" +

        "<p><b>Request By:</b> " + reqData[1] +
          "<br/><b>For:</b> " + reqData[2] + 
          "<br/><b>CC Purchase?:</b> "+ reqData[5] +
          "<br/><b>Chargable to Resident?:</b> " + reqData[9]  +  
          "<br/><b>Vendor:</b> "+ reqData[3] +
          "<br/><b>Projected Cost:</b> " + reqData[7] +
          "<br/><b>Unit/Location:</b> " + reqData[6] +
          "<br/><b>Reason For Purchase:</b> " + reqData[4] +
          "<br/>"+
          "<br/><b>Order Details:</b> "+ reqData[8] +  
            
        "</p>" +

        "<a href = " + approvalLink + "><BUTTON><b>Click Here To Approve</b></BUTTON></a>"
  

  
    var optAdvancedArgs = {htmlBody: htmlBody}; 
  
    MailApp.sendEmail(superEmail, subject, emailBody, optAdvancedArgs); //include email address from var at top without quotes, or manually enter a unique email address with quotes
    
    postSlack({text:'New PO Requested made. PO # '+ reqData[11] +'.'}); 
  
  } catch(e){
    postSlack({text:'System Error!! Check form.'});
  }
    
}

function approval() {
  try{
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
          "<br/><b>For:</b> " + approvalData[9] +
          
          "<br/>"+
          "<br/><b>Your Request Has Been </b> "+ approvalData[3] +
            PONum+
          "<br/><b>Notes </b> " +
           "<br/>"+approvalData[5]+  
        "</p>" +

        "If you have any quastions please contact your purchase approving manager"
  

  
    var optAdvancedArgs = {htmlBody: htmlBody};
  
    MailApp.sendEmail(approvalData[2], subject, emailBody, optAdvancedArgs);  
    postSlack({text:'PO # '+approvalData[1]+' has been '+ approvalData[3] +'.'});
  } catch(e){
    postSlack({text:'System Error!! Check form.'});
  }  
}

