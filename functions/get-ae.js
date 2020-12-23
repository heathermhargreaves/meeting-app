exports.handler = (context, event, callback) => {
    const Airtable = require('airtable');
    const base = new Airtable({apiKey: context.AIRTABLE_KEY}).base(context.ATTENDEES_TABLE_ID);
    
    const phone_number = event.from;
    let AE_record = {
      status: "false"
    };
  
    base('aes').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {  
        records.forEach(function(record) {     
            if(record.get('phone_number') === phone_number) {
              AE_record.status = 'true';
              AE_record.name = record.get('name');
              AE_record.email = record.get('email');
            }
            else {console.log('no user')}
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }         
        callback(null, AE_record)
    });
  };