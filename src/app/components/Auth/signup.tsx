"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Message from "../Message";
import Input from "../Input";

export default function MagicLinkSignUp() {
  const supabaseClient = createClientComponentClient();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [messageText, setMessagetext] = useState<string | null>(null);


  async function signUp() {
    setIsLoading(true);

    try {
      const { data } = await supabaseClient.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: "http://localhost:3000",
        },
      });
    } catch (error) {
      setError("grosse erreur");
      setMessagetext("une erreur est survenu");
    } finally {
      setIsLoading(false);
      setMessagetext("Compte cree avec succes");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Creez votre compte</h1>
      {isLoading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : (
        <form onSubmit={signUp}>
          <label>Email</label>
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Saisissez votre adresse mail ici"
          />
          <button 
          className="mx-auto m-2 bg-blue-500 font-semibold flex self-end"
          type="submit" 
          disabled={isLoading}
          >
            Envoyer
          </button>
        </form>
      )}
      <Message text={messageText} result="success" />
    </div>
  );
}
