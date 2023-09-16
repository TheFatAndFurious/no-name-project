export default function Container({children}: { children : React.ReactNode }) {

    return (
        <div className="w-4/5 bg-slate-500 mx-auto">
            {children}
        </div>
    )
}