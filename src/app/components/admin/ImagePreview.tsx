import  Image  from "next/image"
interface ImagePreviewProps {
    images: File[]
}

export default function ImagePreview({images}: ImagePreviewProps) {
    return (
        <div>
            <div className="grid grid-cols-12 gap-2 my-2">
                {images.map((image)=> {
                    const src = URL.createObjectURL(image);
                    return (
                        <div className="relative aspect-video col-span-4" key={image.name}>
                            <Image src={src} 
                                    alt={image.name}
                                    className="object-cover"
                                    fill />
                        </div>
                    )
                    })}
            </div>
        </div>
    )
}