// "use client";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import CreateGalery from "../components/admin/createGalery";
import DisplayGaleries from "../components/admin/displayGaleries";
import DisplayUsers from "../components/admin/displayUsers";
import SingleGalery from "../components/admin/singleGalery";
import { cookies } from "next/headers";

export default async function AdminDashboard() {

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <h1>Welcome Admin !</h1>
      {/* <CreateGalery tableName="galeries" /> */}
      {/* <DisplayUsers /> */}
      {/* <SingleGalery /> */}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
