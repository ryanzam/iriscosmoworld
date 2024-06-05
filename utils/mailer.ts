import { PROD_URL } from "./constants";

let nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

export async function emailVerification(user: any, uniqueStr: string) {
    try {
        let emailMsg = {
            from: '"IrisCosmoWorld" <iriscosmoworld@gmail.com>',
            to: user,
            subject: `Hello Customer ✔ Verify your email.`,
            text: "Please verify your email by clicking the link below.",
            html: `<h1>Confirm your email address<h1>
            <br />
            <p>Hello,</p>
            <br />
            <p>Click <a href="${PROD_URL}/api/emailVerify?us=${uniqueStr}">the link </a> to verify your email.</p>
            <br />
            <br />
            <p>Cheers,</p>
            <p>IrisCosmoWorld</p>
            `,
        }

        let info = await transporter.sendMail(emailMsg);
        console.log("Message sent: %s", info.messageId);
    }

    catch (error) {
        console.log(error)
    }
}

export async function emailOrder(user: any, address: any, total: number) {
    try {
        let emailMsg = {
            from: '"IrisCosmoWorld" <iriscosmoworld@gmail.com>',
            to: user?.email,
            subject: `Your order is confirmed.`,
            html: `<p>Dear ${user?.name}, </p>
            <p>Thanks for shopping with us! Your order of Rs.${total} is confirmed.</p>
            <br />
            <a href="${PROD_URL}/user/orders">View Order Details</a>
            <br />
            <div>
                <b>Ordered item(s) will be delivered to:</b>
                <div>
                    <p className="font-medium">${address?.phone}</p>
                    <p className="font-medium">${address?.street}</p>
                    <p className="font-medium">${address?.city}, ${address?.wardNumber}</p>
                </div>
            </div>
            
            <br />
            <br />
            <p>Cheers,</p>
            <p>IrisCosmoWorld</p>
            `,
        }

        let info = await transporter.sendMail(emailMsg);
        console.log("Message sent: %s", info.messageId);
    }

    catch (error) {
        console.log(error)
    }
}

export async function emailStatusOrder(user: any, status: string) {
    
    try {
        let emailMsg = {
            from: '"IrisCosmoWorld" <iriscosmoworld@gmail.com>',
            to: user?.email,
            subject: `Your order has been ${status}`,
            html: `<p>Dear ${user?.name}, </p>
            <p>Thanks for shopping with us! Your order has been 
            ${status === "Sent" ? "dispatched and is on the way." : "Delivered. Wish to see you again!"} 
            </p>
            <br />
            <br />
            <p>Cheers,</p>
            <p>IrisCosmoWorld</p>
            `,
        }

        let info = await transporter.sendMail(emailMsg);
        console.log("Message sent: %s", info.messageId);
    }

    catch (error) {
        console.log(error)
    }
}

export async function emailResetPassword(email: any, resetPasswordString: string) {
    try {
        let emailMsg = {
            from: '"IrisCosmoWorld" <iriscosmoworld@gmail.com>',
            to: email,
            subject: `Reset Password.`,
            text: "Reset your password by clicking the link below.",
            html: `<h1>Reset your password<h1>
            <br />
            <p>Hello there!</p>
            <br />
            <p>We received a request to reset your password for our app. 
                Please click on the link below to reset your password: 
                <a href="${PROD_URL}/api/reset?us=${resetPasswordString}"">Reset Password</a>. 
                If you did not request a password reset, ignore this email.</p>
            <br />
            <br />
            <p>Cheers,</p>
            <p>IrisCosmoWorld</p>
            `,
        }

        let info = await transporter.sendMail(emailMsg);
        console.log("Message sent: %s", info.messageId);
    }

    catch (error) {
        console.log(error)
    }
}

export async function emailNewPasswordChanged(email: any) {
    try {
        let emailMsg = {
            from: '"IrisCosmoWorld" <iriscosmoworld@gmail.com>',
            to: email,
            subject: `New Password Updated`,
            text: "Your password has been updated",
            html: `<h1>New password updated<h1>
            <br />
            <p>Hello there!</p>
            <br />
            <p>Your password has been reset.</p>
            <br />
            <br />
            <p>Cheers,</p>
            <p>IrisCosmoWorld</p>
            `,
        }

        let info = await transporter.sendMail(emailMsg);
        console.log("Message sent: %s", info.messageId);
    }

    catch (error) {
        console.log(error)
    }
}