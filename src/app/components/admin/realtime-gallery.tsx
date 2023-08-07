"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";

type Galerie = {
  id: string;
  created_at: string;
  name: string;
};

export default function RealtimeGaleries({
  serverGaleries,
}: {
  serverGaleries: Galerie[];
}) {
  const [galeries, setGaleries] = useState(serverGaleries);
  useEffect(() => {
    const channel = supabase
      .channel("realtime galeries")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "galeries",
        },
        (payload) => {
          setGaleries([...galeries, payload.new as Galerie]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, galeries, setGaleries]);
  return <pre>{JSON.stringify(galeries, null, 2)}</pre>;
}
