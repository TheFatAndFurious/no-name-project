import { cookies } from "next/headers";
import { supabase } from "../../../supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Hero () {

 
    return (
        <div className="hero max-h-screen" style={{backgroundImage: 'https://picsum.photos/200/300'}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Salut les bozos   🥳</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Connection</button>
                </div>
            </div>
        </div>
    )
}