"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Input from "../Input";
import Label from "../Label";
import{ FcGoogle } from "react-icons/fc"

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
    <div>
      <h1 className="text-xl font-bold text-center text-black">Me connecter</h1>
      
      <Label htmlFor="email">Email</Label>
      <Input
        type="text"
        placeholder="Email"
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Label htmlFor="email">Mot de passe</Label>
      <Input
        type="password"
        placeholder="Password"
        value={password}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button id="send"className="mx-auto m-2 bg-blue-500 font-semibold flex self-end hover:bg-blue-700 hover:text-white transition duration-300 disabled:bg-slate-500" onClick={signInWithEmail}>
        Se connecter
      </button>
      <p>{message}</p>
      <button onClick={signInWithGoogle} className="flex mx-auto items-center">Se connecter avec Google <FcGoogle  className="pl-1"/></button>
    </div>
  );
}
