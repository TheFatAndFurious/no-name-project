import { ChangeEvent } from "react"

interface InputProps {
    placeholder?: string
    type?: string
    name?: string
    value?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void 
}
export default function Input({placeholder, type, name, onChange}: InputProps) {
    return (
        <input 
            className="bg-white text-black m-2"
            placeholder={placeholder}
            type={type}
            name={name}
            onChange={onChange}
            />
    )
}