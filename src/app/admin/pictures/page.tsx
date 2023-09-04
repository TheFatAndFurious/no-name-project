'use client'


import { useEffect, useState } from "react"

export default function GetPictures() {

    const [pictures, setPictures] = useState(null)

    useEffect(() => {
        const fetchPictures = async () => {
            try {
                const response = await fetch('/api/fetchSelectedPictures', {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPictures(data)
                console.log(pictures);
            } catch (error) {
                console.error("u fucked", error);
            }
        };
        fetchPictures();
    }, [])
    return (
        <div>
            <h1>coucou</h1>
            <pre>{JSON.stringify(pictures, null, 2)}</pre>
            <img src="https://images-laura.s3.eu-west-3.amazonaws.com/antoine.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5OUVNJOHROOL4MMT%2F20230902%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230902T213117Z&X-Amz-Expires=3600&X-Amz-Signature=eb0844028d20dca8d297da1c4f4a08338f3f70860b1e8859ccc894310bbf38d1&X-Amz-SignedHeaders=host&response-content-type=inline&x-id=GetObject" alt="" />
        </div>
    )
}