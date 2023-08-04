import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "No-name-project",
  description: "Thou shall succeed",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  return (
    <html lang="en" data-theme="cupcake">
      <body>
        <Navbar session={session}/>
        {children}
        
      </body>
    </html>
  );
}
