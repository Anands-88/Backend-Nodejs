
const transporter = require("./config/mail")

const sendMail = async ({from,to,subject,text,html}) =>
{ 
    await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html
    });
}

const confirmMail = async({from,to,user}) =>
{
    await sendMail({
    from,
    to,
    subject :`Welcome to ABC system ${user}`,
    text :`Hi ${user}, Please confirm your email address`,
    html:`<h1>Welcome to ABC system, ${user}. Please confirm your email address</h1>`
    });
}

const toAdmins = async({from,to,user}) =>
{
    await sendMail({
    from,
    to,
    subject : `${user} has registered with us`,
    text:  `Please welcome ${user}`,
    html:`<h1>${user} has registered with us. Please welcome ${user}</h1>`
    });
}


module.exports = {confirmMail,toAdmins}