import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useState } from "react";

const supabase = createClientComponentClient();

interface CreateGaleryProps {
  tableName: string;
}

export async function insertInto(tableName: string, newInsert: string) {
  const { data: galery } = await supabase
    .from(tableName)
    .insert({ name: newInsert })
    .single();
  return galery;
}

export default function CreateGalery({ tableName }: CreateGaleryProps) {
  const [newInsert, setNewInsert] = useState<string>("");

  const handleInsert = useCallback(async () => {
    await insertInto(tableName, newInsert);
  }, [tableName, newInsert]);
  console.log(tableName, newInsert);

  return (
    <>
      <button onClick={() => handleInsert()}>Creer une nouvelle galerie</button>
      <input
        type="text"
        placeholder="Nom de la nouvelle galerie"
        value={newInsert}
        onChange={(e) => {
          setNewInsert(e.target.value);
        }}
      />
    </>
  );
}
