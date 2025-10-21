"use client"
// Components
import { PosBtn } from "@/app/pos/components/buttons";
// Types
import type { BtnProps } from "@/types";


const PizzaPortionBtn = (props: BtnProps) => (
  <PosBtn
    {...props}
    className="col-span-2 text-black font-bold"
    onClick={() => { }}
  />
);

export default PizzaPortionBtn;
