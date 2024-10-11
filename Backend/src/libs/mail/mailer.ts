import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: 'anuragsharda131@gmail.com',
        pass: "ousbpkkzrkospnso"
    }
});

export function sendMailToUser(email:string, password:string){

    const mailOptions = {
        from: 'anuragsharda131@gmail.com', // sender address
        to: email,   // list of receivers
        subject: 'Hello from Nodemailer', // Subject line
        html: `<h2><b>Your System Generated password is ${password} </b></h2> `, // plain text body
        // html: '<b>This is a test email sent using Nodemailer!</b>' // html body (optional)
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return console.log('Error occurred: ' + error.message);
    }
    console.log('Message sent: %s', info.messageId);
});
}