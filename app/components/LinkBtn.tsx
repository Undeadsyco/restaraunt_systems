import Link from "next/link";
import Btn from "./Button";
import { BtnProps } from "@/types";

type LinkBtnProps = Omit<BtnProps, "type" | "onClick" | "onMouseDown" | "onMouseUp"> & { href: string }

const LinkBtn = ({ className, href, text, children }: LinkBtnProps) => (
  <Btn className={className} >
    <Link className="inline-flex w-full h-full justify-center items-center text-inherit" href={href}>{children ?? text}</Link>
  </Btn>
);

export default LinkBtn;
