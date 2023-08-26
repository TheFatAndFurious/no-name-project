'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../../../../supabase";
import Wrapper from "../Wrapper";
import { useState } from "react";

export default async function DisplayGaleries() {
  const supabase = createClientComponentClient()
  const [galeryToDelete, setGaleryToDelete] = useState<string | null>(null)
  const { data } = await supabase.from("galeries").select();

  async function handleDelete (id: string) {
    setGaleryToDelete(id)
    //TODO: Create a proper modal to replace that bummy looking alert
    alert("Toute suppression sera definitive")
    const response = await fetch("/api/deleteFromSupabase", {
      method: "POST",
      body: JSON.stringify(id)
    })
    console.log(response)
    if(response.ok){
      alert("all good u jerkoff")
    }
  }


  return (
    <Wrapper>
      <div className="flex flex-col">
        {data?.map((element) => (
          <div 
            className="flex justify-start items-center mb-1 border-gray-400 border-2 border-solid" 
            key={element.id}>
            <button 
              type="submit" 
              className="bg-red-400 mr-4" 
              onClick={() => handleDelete(element.id)}
              >Supprimer</button>
            <button 
              type="submit" 
              className="bg-green-400 mr-4" 
              id={element.id}
              >Modifier</button>
            <li 
              className="bg-blue-300"
              >{element.name}</li>
          </div>
        ))}
      </div>
    </Wrapper>
    );
}
