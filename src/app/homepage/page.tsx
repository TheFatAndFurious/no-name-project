import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DisplayGaleries from "../components/admin/displayGaleries";

export default async function Homepage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session)

  if (!session) {
    redirect("../unauthenticated");
  }

  const userName = session.user.email;
  console.log(userName)

  return (
    <div>
      <h1>Bienvenue {userName}</h1>
      <DisplayGaleries />
    </div>
  );
}
