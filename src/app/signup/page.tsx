import Link from "next/link";
import EmailSignUp from "../components/Auth/signup";
import Wrapper from "../components/Wrapper";

export default function SignUp() {
    return (
        <Wrapper>
            <EmailSignUp />
            <Link href="/login">Vous avez deja un compte ?</Link>
        </Wrapper>
    )
}