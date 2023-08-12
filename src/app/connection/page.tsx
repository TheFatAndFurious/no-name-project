import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Wrapper from "../components/Wrapper";

//TODO

const supabase = createServerComponentClient({ cookies });

export default async function Connection() {

  return (
    <div className="flex">
      <Wrapper>
        <Link href="/login">Vous faites deja parti de la team Pompi ?</Link>
      </Wrapper>
      <Wrapper>
        <Link href="/signup">Vous voulez creer un compte ?</Link>
      </Wrapper>
    </div>
  )

}
