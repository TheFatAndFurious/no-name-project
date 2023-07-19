"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../schema";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={["google"]}
      redirectTo="http://localhost:3000/auth/account"
    />
  );
}

//TODO: Change the redirect url after magic link validation
//TODO: LOGIN PAGE
//TODO: Admin validation
