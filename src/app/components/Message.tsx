import clsx from "clsx";

interface MessageProps {
    text: string | null
    result: 'success' | 'failure' | 'warning'
}

export default function Message({text, result}: MessageProps) {
    const common = 'font-bold';
    const successClass = 'bg-green-400';   
    const failure = 'bg-red-400';
    const warning = 'bg-orange-400'

    const dynamicClasses = clsx(common, {
        [successClass]: result === 'success',
        [failure]: result === 'failure'
    })

    return (
        <p className={dynamicClasses}>{text}</p>
    )
}
