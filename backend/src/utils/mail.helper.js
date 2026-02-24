import nodemailer from 'nodemailer'
export const sendEmail=async({email,subject,message})=>{
    try {
        const tranporter= nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAILTRAP_USER,
                pass:process.env.MAILTRAP_PASS,
            },
        });
        const mailOptions={
            from:`"Support Team"<${process.env.EMAIL_USER}`,
            to :email,
            subject:subject,
            text:message,
        };
        const info= await tranporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Email sending failed:",error);
        return null;
    }
}