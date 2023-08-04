import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function testLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("../unauthenticated");
  }
    return (
      <>
      <h2>je teste y cule</h2>
        {children}
        {/* Carousel of featured products */}
      </>
    );
  }