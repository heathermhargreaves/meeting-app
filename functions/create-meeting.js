exports.handler = (context, event, callback) => {
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: context.AIRTABLE_KEY}).base(context.ATTENDEES_TABLE_ID);
    
    
   base('meetings').create([
      {
        "fields": {
          "name": event.meeting_name.toLowerCase().split(" ")[0],
          "ae_name": event.ae_name
        }
      }
    ], function(err, records) {
      if (err) {
        console.log(err);
        return;
      }
      else{
        callback(null, 'success!')
      }   
      
    });
  };