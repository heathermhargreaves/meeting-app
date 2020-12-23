exports.handler = (context, event, callback) => {
    const Airtable = require('airtable');
    const base = new Airtable({apiKey: context.AIRTABLE_KEY}).base(context.ATTENDEES_TABLE_ID);
    
    let meetings = [];
    const ae_name = event.ae_name;
    let list = {meeting_list: meetings}
    
    base('meetings').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      
        records.forEach(function(record) {
          
            if(record.get('ae_name') === ae_name) {
              const meeting_id = record.get('name')
              meetings.push(meeting_id);
            }
            else {console.log('no user')}
        });
  
        fetchNextPage();
  
    }, function done(err) {
        if (err) { console.error(err); return; }  
          
        callback(null, list)
  
    });
  };