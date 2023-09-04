// "use client";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import CreateGalery from "../components/admin/createGalery";
import DisplayGaleries from "../components/admin/displayGaleries";
import DisplayUsers from "../components/admin/displayUsers";
import SingleGalery from "../components/admin/singleGalery";
import { cookies } from "next/headers";
import Wrapper from "../components/Wrapper";

export default async function AdminDashboard() {

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
    <Wrapper>
      <h1 className="underline">Welcome Admin !</h1>
      <a href="/admin/upload">💾 Uploader des photos</a>
      <a href="/">👩‍🔧 Gerer les galeries</a>
      <a href="/">👮‍♀️ Gerer les utilisateurs</a>
    </Wrapper>
    </>
  );
}
