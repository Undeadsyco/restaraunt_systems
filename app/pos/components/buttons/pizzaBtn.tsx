"use client"
// Dependencies
import { useContext } from "react";
import { PosContext } from "@/utils/PosContext";
// Components
import PosBtn from "./posBtn";

const PizzaBtn = ({ className, pizza }: { className: string; pizza: DataBase.Menu.IPizza; }) => {
  const { dispatch } = useContext(PosContext)!;

  return <PosBtn
    className={className}
    text={pizza.name}
    onClick={() => dispatch({ type: "SET_PIZZA", data: pizza })}
  />
}

export default PizzaBtn;
