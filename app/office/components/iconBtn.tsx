// Components
import { Btn } from "@/app/components";
// Types
import { BtnProps } from "@/types";
import { ReactNode } from "react";

const IconBtn = (props: BtnProps & { Icon: React.ElementType, size?: number }) => {
  const { Icon } = props;
  return (
    <Btn {...{ ...props, className: `bordered p-1 h-fit ${props.className}` }}>
      <Icon size={props.size ?? 14} />
    </Btn>
  );
}

export default IconBtn;
