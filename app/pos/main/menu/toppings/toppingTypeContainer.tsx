"use client"
// Dependencies
import { ReactNode, useContext } from "react";
import { PosContext } from "@/utils/PosContext";
// Controllers
import { ToppingController } from "@/lib/DBModels/controllers";
// Components
import { ToppingBtn } from "@/app/pos/components/buttons";

export default function ToppingTypeContainer({ type }: { type: string; }) {
  const { state } = useContext(PosContext);
  return (
    <>
      {state.toppings.filter(t => t.type === type).map(topping => (
        <ToppingBtn key={topping._id} {...{ topping }} />
      ))}
    </>
  )
}