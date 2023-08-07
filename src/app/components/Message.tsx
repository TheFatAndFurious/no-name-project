import clsx from "clsx";

interface MessageProps {
  text: string | null;
  result: "success" | "error" | "warning" | "info";
}

export default function Message({ text, result }: MessageProps) {
  const common = "font-bold";
  const successClass = "bg-green-400";
  const error = "bg-red-400";
  const warning = "bg-orange-400";
  const info = "bg-blue-300";

  const dynamicClasses = clsx(common, {
    [successClass]: result === "success",
    [error]: result === "error",
    [warning]: result === "warning",
    [info]: result === "info",
  });

  return <p className={dynamicClasses}>{text}</p>;
}
