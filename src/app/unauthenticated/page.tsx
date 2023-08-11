import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Wrapper from "../components/Wrapper";

export default async function Unauthenticated() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Wrapper>
      <p>Hop hop hop, t'as carrement pas le droit...de visiter cette page</p>
    </Wrapper>
  );
}
