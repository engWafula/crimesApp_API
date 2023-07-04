const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const users = require("../../models/user")

exports.sendEmails = async (message,email,subject) => {
  try {
    const user  = await users.findOne({email:email})
    const transporter = nodemailer.createTransport({
      pool:true,
      service: 'gmail',
      secure:false,
      auth: {
        user: 'wafulaallan5@gmail.com',
        pass: 'ubcxstccavwoklzd'
      },
      tls:{
        rejectUnauthorised:false
      },
      ignoreTLS: true
    });

    const templatePath = path.join(__dirname, '../../views/email/template.ejs');

    const templateData = {
      name:user?.name,
      message:message
    };

    const html = await ejs.renderFile(templatePath, templateData);
    const adminEmail =  "wafulaallan5@gmail.com"

    const mailOptions = {
      from: `${adminEmail} Tamperproof system `,
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

