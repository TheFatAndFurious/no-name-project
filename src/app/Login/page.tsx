"use client";

// PAGE STRUCTURE: User is presented a signup form and a link to a signin form if he already has an account
// CHANGE THE BUTTON VALUE ONCLICK

import { useState } from "react";
import MagicLinkSignUp from "../components/Auth/signup";
import Login from "../components/Auth/login";
import Wrapper from "../components/Wrapper";
import clsx from "clsx";
import Message from "../components/Message";

export default function Authenticate() {
  const [alreadyMember, setAlreadyMember] = useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess] =useState<boolean>(false);
  const inscriptionSuccessMessage = "coucou les copains"

  const handleSignUpSuccess = () => {
    setSignUpSuccess(true)
  }

  return (
    <>
    <div className="container">

 {!signUpSuccess ?     <Wrapper>
        {!alreadyMember ? <MagicLinkSignUp onSignUpSuccess={handleSignUpSuccess}/> : <Login/>}
        <button
          className="btn btn-primary"
          onClick={() => setAlreadyMember(!alreadyMember)}
        >
          {clsx({"Vous avez deja un compte ?": !alreadyMember, "Creer un compte": alreadyMember})}
        </button>
      </ Wrapper>: <Message text={inscriptionSuccessMessage} result="success"/>}
        </div>
    </>
  );
}
