// "use client"

import Login from "./components/login";
import MagicLinkSignUp from "./components/signup";

// import Login from "./components/login";
// import MagicLinkSignUp from "./components/signup";
// import { useState } from "react";

// export default function Home() {
//  const [hasAnAccount, setHasAnAccount] = useState(false)

//  const handleClick = () => {
//   setHasAnAccount(!hasAnAccount);
//  }

//   return (
//     <div className="row">

//    {hasAnAccount ? <MagicLinkSignUp /> : <Login /> }

//     <button className="ntn-primary" onClick={handleClick}>{hasAnAccount ? <p>Deja inscrit ?</p> : <p>Creer un compte</p>}</button>
//     </div>
//   );
// }


export default function Home() {
  return (
    <><MagicLinkSignUp /></>
  )
} 