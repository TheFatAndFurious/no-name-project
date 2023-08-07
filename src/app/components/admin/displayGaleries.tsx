import { supabase } from "../../../../supabase";
import RealtimeGaleries from "./realtime-gallery";

export default async function DisplayGaleries() {
  const { data } = await supabase.from("galeries").select();

  return <RealtimeGaleries serverGaleries={data ?? []} />;
}
