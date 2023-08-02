import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";


export default function MagicLinkSignUp() {
  const supabaseClient = createClientComponentClient();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function signUp() {
    setIsLoading(true)

  try {
    const { data } = await supabaseClient.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
  } catch(error) {
    setError(error.message)
  } finally {
    setIsLoading(false)
  }
  }

  return (
    <div>
      <h1>Creation de compte</h1>
      <p>Pensez a confirmer la creation de compte depuis l'email que vous aurez recu a l'adresse renseignee, l'administrateur du site devra ensuite valider votre inscription pour vous permettre l'acces</p>
      {isLoading ? <span className="loading loading-infinity loading-lg"></span> :
      <form onSubmit={signUp}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>Submit</button>
      </form>}
      {error ?? <p>{error}</p> }
    </div>
  );
}
