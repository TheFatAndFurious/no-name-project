import { ReactNode } from "react"

export default function DisplayGallery({children}: { children : React.ReactNode }) {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {children}
        </div>
        
    )
}