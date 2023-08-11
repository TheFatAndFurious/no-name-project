"use client";

import Link from "next/link";
// PAGE STRUCTURE: User is presented a signup form and a link to a signin form if he already has an account
// CHANGE THE BUTTON VALUE ONCLICK

import Login from "../components/Auth/login";
import Wrapper from "../components/Wrapper";

export default function Authenticate() {

  return (
    <Wrapper>
      <Login />
      <Link href="/signup">Vous n'avez pas encore de compte ?</Link>
    </Wrapper>
  );
}
