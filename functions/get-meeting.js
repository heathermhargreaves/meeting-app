exports.handler = (context, event, callback) => {
    const Airtable = require('airtable');
    const base = new Airtable({apiKey: context.AIRTABLE_KEY}).base(context.ATTENDEES_TABLE_ID);
  
    const text_split = event.text.split(" ")
    const meeting_id = (text_split.length > 1) ? text_split[1].toLowerCase() : text_split[0].toLowerCase();
    let meeting_exists = {status: "false"};
    console.log(meeting_id);
  
    
    base('meetings').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      
        records.forEach(function(record) {
          
            if(record.get('Name') === meeting_id) {
              meeting_exists.status = 'true';
            }
            else {console.log('no user')}
        });
  
        fetchNextPage();
  
    }, function done(err) {
        if (err) { console.error(err); return; }  
          
        callback(null, meeting_exists)
  
    });
  };