
exports.handler = (context, event, callback) => {
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: context.AIRTABLE_KEY}).base(context.ATTENDEES_TABLE_ID);
    
   base('attendees').create([
      {
        "fields": {
          "Name": event.name,
          "Number": event.number,
          "Meeting_Name": event.firstText.split(" ")[1].toLowerCase(),
          "Fun_Fact": event.funFact,
          "Role": event.role
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