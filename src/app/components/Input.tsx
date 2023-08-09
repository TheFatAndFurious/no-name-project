import { ChangeEvent } from "react"

interface InputProps {
    placeholder?: string
    type?: string
    name?: string
    value?: string
    id?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void 
}
export default function Input({placeholder, type, name,id,  onChange}: InputProps) {
    return (
        <input 
            className="bg-white text-black my-2 border-solid border-accent border-2 mx-auto focus:border-blue-800 outline-none"
            placeholder={placeholder}
            type={type}
            name={name}
            onChange={onChange}
            id={id}
            />
    )
}