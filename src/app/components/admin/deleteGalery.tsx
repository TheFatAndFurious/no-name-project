import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

//TODO: creer message erreur/succes apres le click
//TODO: loading pendant le delete
//TODO: fonction pour recuperer la liste des galeries
//TODO: zod pour securiser l'input

export default function CreateGalery() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [galeryName, setGaleryName] = useState<string>("");
  async function createNew(galeryName: string) {
    const { data: galery } = await supabase
      .from("galeries")
      .insert({ name: galeryName })
      .single();
    setGaleryName("");
  }

  return (
    <>
      <button onClick={() => createNew(galeryName)}>
        Creer une nouvelle galerie
      </button>
      <input
        type="text"
        placeholder="Nom de la nouvelle galerie"
        value={galeryName}
        onChange={(e) => {
          setGaleryName(e.target.value);
        }}
      />
    </>
  );
}
