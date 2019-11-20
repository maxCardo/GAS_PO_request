function postSlack(record){
  
 var postRoute = 'https://hooks.slack.com/services/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';
 
 const slackBody = {text: record.text} 
  
 var options = {
  'method' : 'post',
  'contentType': 'application/json',
  'payload' : JSON.stringify(slackBody)
 };
   
 UrlFetchApp.fetch(postRoute, options);  
}


function postToSlackTest(){
  var data = {text:'this is a test'}
  
  postSlack(data);

}


