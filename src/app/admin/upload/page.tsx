import FileUploadForm from "@/app/components/admin/FileUploadForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function(){

    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    return (
        <FileUploadForm />
    )
}