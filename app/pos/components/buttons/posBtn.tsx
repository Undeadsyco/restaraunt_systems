"use client"

import { Btn } from "@/app/components";
import { BtnProps } from "@/app/components/Button";

export type PosBtnProps = BtnProps & {
};

const PosBtn = ({ className, type, text = "", action }: PosBtnProps) => {
  const textSize = text?.split(" ").length > 2
    ? "text-xs"
    : text?.split(" ").length > 1
      ? "text-sm"
      : "text-base";

  
  return (
    <Btn
      {...{ type, action, text }}
      className={`pos-btn btn-default ${className} ${textSize}`}
    />
  );
}

export default PosBtn;
