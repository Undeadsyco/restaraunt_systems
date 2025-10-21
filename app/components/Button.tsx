"use client"

import type { BtnProps } from "@/types";

const Btn = ({ type, text, disabled, className, children, onClick, onMouseDown, onMouseUp }: BtnProps) => (
  <button
    className={`disabled:opacity-10 ${className}`}
    type={type ?? "button"}
    disabled={disabled}
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  >
    {children ?? <span className="text-inherit">{text}</span>}
  </button>
);

export default Btn;