"use client"

import PosBtn from "./posBtn";
import { BtnProps } from "@/app/components/Button";

const PizzaPortionBtn = (props: BtnProps) => <PosBtn
  {...props}
  className="col-span-2 text-black font-bold"
  action={() => {}}
/>

export default PizzaPortionBtn;
