
exports.handler = async (context, event, callback) => {
    const sgMail = require('@sendgrid/mail');
    
    sgMail.setApiKey(context.SENDGRID_API_KEY);    
      
      const meeting_id = event.meeting_id.toLowerCase();
      const email_address = event.email_address;
      const users = JSON.parse(event.users);
      
      const formatted_text = users.reduce((acc, user) => {
        return acc + `<tr>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>${user.number}</td>
            <td>${user.fun_fact}</td>
          </tr>`
      }, '');   
    
      const msg = {
        to: email_address,
        from: 'hello@meeting-icebreaker.com',
        subject: `Your report for meeting: ${meeting_id}`,
        text: 'Your meeting participants:',
        html: `<table><thead><tr><th>Name</th><th>Role</th><th>Number</th><th>Fun Fact</th></tr></thead><tbody>${formatted_text}</tbody></table>`
      }
      
      try{
        const resp = await sgMail.send(msg)
        return callback(null, resp);
      }
      catch(e) {
        console.error(e)
        return callback(e)
      }
      
  };