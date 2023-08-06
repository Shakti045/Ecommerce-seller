import { transporter } from "@/config/email";

export const sendMail = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        })
    } catch (error) {
        console.log("Error while sending email","=>",error);
    }
}