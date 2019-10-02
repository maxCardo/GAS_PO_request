//ops
function onFormSubmit(e) {

  var sheet = e.range.getSheet();
  var sheetId = sheet.getSheetId();
   

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var form1 = ss.getSheetByName("first_req");
  var form1Id = form1.getSheetId();
  var form2 = ss.getSheetByName("appr_form");
  var form2Id = form2.getSheetId();
  
    if (sheetId == form1Id){  
      first_req();
    }
    if (sheetId == form2Id){
      approval()
  } 
  
} 
