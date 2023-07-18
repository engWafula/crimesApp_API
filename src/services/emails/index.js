const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const users = require("../../models/user")

exports.sendEmails = async (message,email,subject) => {
  try {
    const transporter = nodemailer.createTransport({
      pool:true,
      service: 'gmail',
      secure:false,
      auth: {
        user: 'wafulaallan5@gmail.com',
        pass: 'mwlsdcchddbtrfth'
      },
      tls:{
        rejectUnauthorized: false,
      },
      ignoreTLS: true
    });

    const templatePath = path.join(__dirname, '../../views/email/template.ejs');

    const templateData = {
      message:message
    };

    const html = await ejs.renderFile(templatePath, templateData);
    const adminEmail =  "wafulaallan5@gmail.com"

    const mailOptions = {
      from: `${adminEmail} Real Estate  `,
      to: email,
      subject: subject,
      html: html
    };

    // send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);

    return true;
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    return false;
  }
};

