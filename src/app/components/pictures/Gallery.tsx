
export default function DisplayGallery({children}: { children : React.ReactNode }) {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {children}
        </div>
        
    )
}