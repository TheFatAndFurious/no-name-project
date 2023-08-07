"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  //TODO: Sanitize user inputs
  //TODO: add Zod

  async function signInWithEmail() {
    if (!email || !password) {
      alert("Please enter your email and password");
    }
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log(data.session); //setIsLoggedIn(true)
      if (!data.session) {
        return setMessage("NOT LOGGED IN");
      } else {
        router.push("/homepage");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function signInWithGoogle() {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }
  return (
    <div className="col-6 auth-widget">
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn-primary" onClick={signInWithEmail}>
        Se connecter
      </button>
      <p>{message}</p>
      <button onClick={signInWithGoogle}>Se connecter avec Google</button>
    </div>
  );
}
