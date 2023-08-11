import { ReactNode } from "react"

interface LabelProps {
    htmlFor: string
    children: ReactNode
}

export default function Label({htmlFor, children}: LabelProps) {
    return (
        <label htmlFor={htmlFor}
                className="text-base font-semibold text-gray-600">{children}</label>
    )
}