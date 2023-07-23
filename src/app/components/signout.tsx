"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    }
    router.push("/");
  }
  return <button onClick={signOut}>Se deconnecter</button>;
}
