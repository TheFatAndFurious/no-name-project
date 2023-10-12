import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./components/Navigation/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Footer from "./components/Navigation/Footer";

export const dynamic = "force-dynamic";

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
    <html lang="en" data-theme="dark">
      <body>
        <Navbar session={session} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
