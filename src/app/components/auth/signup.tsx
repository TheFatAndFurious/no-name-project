"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Input from "../Input";
import Label from "../Label";
import router, { useRouter } from "next/navigation";

interface SignUpProps {
  onSignUpSuccess?: () => void
}

export default function EmailSignUp({onSignUpSuccess}: SignUpProps) {
  const supabaseClient = createClientComponentClient();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] =useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const router = useRouter()


  async function signUp() {
    setIsLoading(true);

    try {
      const { data } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
      });
    } catch (error) {
        setError("grosse erreur");
    } finally {
        router.push("./signupSuccess")
      }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center text-black">Creez un compte</h1>
      {isLoading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : (
        <form onSubmit={signUp}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: bernard.dupontt@free.fr"
          />
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
          <button 
          className="mx-auto m-2 bg-blue-500 font-semibold flex self-end hover:bg-blue-700 hover:text-white transition duration-300 disabled:bg-slate-500"
          type="submit" 
          disabled={isLoading}
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}
