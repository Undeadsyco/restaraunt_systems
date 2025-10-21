"use client"
// Components
import { Btn } from "@/app/components";
// Types
import type { BtnProps } from "@/types";

const PosBtn = ({ className, type, text = "", onClick, children }: BtnProps) => {
  const textSize = text?.split(" ").length > 2
    ? "text-xs"
    : text?.split(" ").length > 1
      ? "text-sm"
      : "text-base";

  
  return (
    <Btn
      {...{ type, onClick, text, children }}
      className={`pos-btn btn-default ${className} ${textSize}`}
    />
  );
}

export default PosBtn;
