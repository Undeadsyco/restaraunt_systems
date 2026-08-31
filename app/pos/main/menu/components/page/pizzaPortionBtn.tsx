"use client"
// Dependencies
import { PosContext } from "@/utils/PosContext";
// Components
import { PosBtn } from "@/app/pos/components/buttons";
// Context
import { useContext } from "react";
// Types
import type { BtnProps } from "@/types";


const PizzaPortionBtn = (props: BtnProps & { text: ("Half" | "Thirds" | "Quarters") }) => {
  const { dispatch } = useContext(PosContext);
  return (
    <PosBtn
      {...props}
      className="text-black font-bold"
      onClick={() => dispatch({ type: "SET_PORTION", data: props.text })}
    />
  );
}

export default PizzaPortionBtn;
