"use client"
// Components
import Link from "next/link";
import ToppingTypeContainer from "./toppingTypeContainer";
import { PosBtn } from "@/app/pos/components/buttons";
import { useContext } from "react";
import { PosContext } from "@/utils/PosContext";



const ToppingBtns = () => {
  const { state } = useContext(PosContext);

  return (
    <div className="col-span-6 grid grid-cols-6 row-span-3 grid-rows-3 gap-x-1 gap-y-3">
      {state.toppingType === "Sauce" && <ToppingTypeContainer type="sauce" />}
      {state.toppingType === "Cheese" && <ToppingTypeContainer type="cheese" />}
      {state.toppingType === "Seasoning" && <ToppingTypeContainer type="seasoning" />}
      {state.toppingType === "Meat" && <ToppingTypeContainer type="meat" />}
      {state.toppingType === "Produce" && <ToppingTypeContainer type="produce" />}

      <PosBtn
        className="close-btn text-white col-start-6 row-start-3"
      >
        <Link className="link-btn" href="/pos/main/menu">Back</Link>
      </PosBtn>
    </div>
  )
}

export default ToppingBtns;
