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
 export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json(); // Récupérer les données envoyées depuis le frontend
    //const email = data.email;

    // Vérifier que l'adresse e-mail est présente et non vide
    // if (!email || typeof email !== "string" || email.trim() === "") {
    //   return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    // }

    const mailOptions = {
      from: "unDingue",
      to: "mrguerrilla@gmail.com",
      subject: "we did it",
      text: `${data.records.email} souhaite rejoindre votre communaute !`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}


