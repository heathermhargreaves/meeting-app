
exports.handler = (context, event, callback) => {
    const Airtable = require('airtable');
    const base = new Airtable({apiKey: context.AIRTABLE_KEY}).base(context.ATTENDEES_TABLE_ID);
    
  
    const meeting_id = event.meeting_id.toLowerCase();
  
    let users = [];
    let user = {}
    
    base('attendees').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      
        records.forEach(function(record) {
          
            if(record.get('Meeting_Name') === meeting_id) {
              user.name = record.get('Name');
              user.role = record.get('Role');
              user.number = record.get('Number');
              user.fun_fact = record.get('Fun_Fact');
            
              users.push(user);
            }
            else {console.log('no user')}
        });
  
        fetchNextPage();
  
    }, function done(err) {
        if (err) { console.error(err); return; }  
          
        callback(null, users)
  
    });
  };