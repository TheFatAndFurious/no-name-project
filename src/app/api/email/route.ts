import { NextRequest, NextResponse } from "next/server";
// import { supabase } from "../../../supabase";
import nodemailer from "nodemailer"

 const transporter =nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure:false,
   auth: {
     user: process.env.SMTP_USER,
     pass: process.env.SMTP_PASSWORD
   }
 })

 export async function POST(request: NextRequest) {
 
 const mailOptions = {
   from: 'babakar@me.com',
   to: 'mrguerrilla@gmail.com',
   subject: 'we did it',
   text: 'congrats my guy'
 }
   console.log("coucou")
    await transporter.sendMail(mailOptions);

  //  return request.status(200).json({ message: "Email sent successfully" });
 }


// export async function GET(request:NextRequest) {
// let json_response = { status: "success"}

// return NextResponse.json(json_response)
// }