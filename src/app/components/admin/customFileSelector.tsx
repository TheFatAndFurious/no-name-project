import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"input">

const CustomFileSelector = (props : Props) => {
    return (
        <input
            {...props}
            type="file"
            multiple
            />
              )}
        
export default CustomFileSelector