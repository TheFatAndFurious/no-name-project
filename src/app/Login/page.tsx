"use client";

// PAGE STRUCTURE: User is presented a signup form and a link to a signin form if he already has an account
// CHANGE THE BUTTON VALUE ONCLICK

import { useState } from "react";
import MagicLinkSignUp from "../components/Auth/signup";
import Login from "../components/Auth/login";
import Wrapper from "../components/Wrapper";
import clsx from "clsx";

export default function Authenticate() {
  const [alreadyMember, setAlreadyMember] = useState<boolean>(false);
  return (
    <>
    <div className="h-screen flex items-center">
      <Wrapper>
        {!alreadyMember ? <MagicLinkSignUp /> : <Login />}
        <button
          className="btn btn-primary"
          onClick={() => setAlreadyMember(!alreadyMember)}
        >
          {clsx({"Vous avez deja un compte ?": !alreadyMember, "Creer un compte": alreadyMember})}
        </button>
      </ Wrapper>
        </div>
    </>
  );
}
