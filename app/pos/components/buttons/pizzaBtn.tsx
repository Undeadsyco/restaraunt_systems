"use client"
// Dependencies
import { useContext } from "react";
import { PosContext } from "@/utils/PosContext";
// Components
import PosBtn from "./posBtn";

const PizzaBtn = ({ pizza }: { pizza: DataBase.Menu.IPizza; }) => {
  const { state, dispatch } = useContext(PosContext)!;
  const setClassName = (section?: string) => {
    switch (section) {
      case "signature": return "signature-btn";
      case "other": return "other-btn";
      case "special": return "special-btn";
      case "delight": return "delight-btn";
      case "stuffed": return "stuffed-btn";
      case "deals": return "deals-btn";
    }
  }
  return <PosBtn
    className={setClassName(state.sections.find(s => s._id === pizza.section)?.name.toLowerCase())}
    text={pizza.name}
    onClick={() => dispatch({ type: "SET_PIZZA", data: pizza._id })}
  />
}

export default PizzaBtn;
