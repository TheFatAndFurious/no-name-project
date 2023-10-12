import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Wrapper from "../components/Wrapper";
import { cookies } from "next/headers";

export default async function Contact() {

    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        const userEmail = session.user.email;
        return userEmail
    } else {
        userEmail = ''
    }
    return (
        <div>
            <Wrapper>
                <form>
                        
                </form>    
            </Wrapper>
        </div>
    )
}