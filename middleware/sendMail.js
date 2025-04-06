import { createTransport } from "nodemailer";

const sendMail = async (email, subject, text) => {
    try {
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Required for port 465
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD,
            }
        });

        await transport.sendMail({
            from: process.env.GMAIL,
            to: email,
            subject,
            text,
        });

        console.log(`✅ Email sent to ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};

export default sendMail;
