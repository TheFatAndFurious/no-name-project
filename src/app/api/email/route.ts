 import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
// // import { sendEmail } from "../../../lib/mail";
// import { supabase } from "../../../supabase";
// import nodemailer from "nodemailer"

// const transporter =nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure:false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD
//   }
// })

// export default async function handler(req: { method: string; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): any; new(): any; }; json: { (arg0: { message: string; }): any; new(): any; }; }; }) {
// if(req.method !== "POST") {
//   return res.status(405).end() //METHODE NON AUTHORISEE
// }

// const mailOptions = {
//   from: 'babakar@me.com',
//   to: 'mrguerrilla@gmail.com',
//   subject: 'we did it',
//   text: 'congrats my guy'
// }
//   console.log("coucou")
//   //await transporter.sendMail(mailOptions);

//   return res.status(200).json({ message: "Email sent successfully" });
// }


export async function GET(request:NextRequest) {
let json_response = { status: "success"}

return NextResponse.json(json_response)
}