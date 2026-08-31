"use client"
import { useContext } from "react";
import PosBtn from "./posBtn";
import { PosContext } from "@/utils/PosContext";

const ToppingBtn = ({ topping }: { topping: DataBase.Menu.ITopping; }) => {
  const { dispatch } = useContext(PosContext)

  // const className = `;
  // console.log('topping btn', className);

  const setClassName = (type: string) => {
    switch (type) {
      case "sauce": return "sauce-btn"
      case "cheese": return "cheese-btn"
      case "meat": return "meat-btn"
      case "produce": return "produce-btn"
      case "seasoning": return "seasoning-btn"
    }
  }

  return <PosBtn
    className={setClassName(topping.type.toLowerCase())}
    key={topping._id}
    text={topping.name}
    onClick={() => dispatch({ type: "MODIFY_ITEM", data: topping._id })}
  />
}

export default ToppingBtn;
