import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendNutrientEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"Nutrify App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    });
};
