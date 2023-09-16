import { ReactNode } from "react"

export default function DisplayGallery({children}: { children : React.ReactNode }) {
    
    return (
        <div className="grid grid-cols-4">
            {children}
        </div>
        
    )
}