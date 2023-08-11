'use client'

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";


interface User {
    uuid: string
    email: string
}

export default function DisplayUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);

useEffect(()=> {
  async function listUsers(){
    try {
      const { data } = await supabase.from("profiles").select();
       if(data) setAllUsers(data)
       console.log(data, allUsers)
    }
    catch (error) {
      console.error(error);
    }
    
  }
  listUsers()
}, [])

console.log(allUsers)

  return (
<h1>coucou</h1>  );
}
