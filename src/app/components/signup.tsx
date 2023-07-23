import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function MagicLinkSignUp() {
  const supabaseClient = createClientComponentClient();
  const [email, setEmail] = useState("");

  async function signUp() {
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
  }

  return (
    <div>
      <h1>Magic Link Sign Up</h1>
      <form onSubmit={signUp}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
