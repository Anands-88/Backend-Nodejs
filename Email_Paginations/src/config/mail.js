const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
    user: "49495faa948f28", // generated ethereal user
    pass: "1f685aadac92f1", // generated ethereal password
    },
});

module.exports = transporter;