import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LogOut from "../components/signout";

export default async function Homepage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("../unauthenticated");
  }

  return (
    <div>
      <h1>Homepage</h1>
      <LogOut />
    </div>
  );
}
