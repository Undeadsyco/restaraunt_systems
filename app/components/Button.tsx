"use client"

import { MouseEventHandler, ReactNode } from "react";

export type BtnProps = {
  type?: "submit" | "reset" | "button" | undefined;
  text?: string;
  action?: (...args: any[]) => any;
  className?: string;
}

const Btn = ({ type, text, action, className }: BtnProps) => (
  <button className={className} type={type ?? "button"} onClick={action}>
    <span>{text}</span>
  </button>
);

export default Btn;