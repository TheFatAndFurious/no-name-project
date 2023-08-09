import { ReactNode } from "react"

interface WrapperProps {
    children: ReactNode
}

export default function Wrapper ({children}: WrapperProps) {
    return (
        <div className="bg-white m-8 rounded-md border-white border-solid border-2 p-2 shadow flex flex-col">{children}</div>
    )
}