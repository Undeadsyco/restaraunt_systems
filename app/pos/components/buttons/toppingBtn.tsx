"use client"
import { useContext } from "react";
import PosBtn from "./posBtn";
import { PosContext } from "@/utils/PosContext";

const ToppingBtn = ({ topping }: { topping?: DataBase.Menu.ITopping; }) => {
  const { dispatch } = useContext(PosContext)!;

  if (!topping) return <PosBtn className="topping-preview-btn" />

  const className = topping.type === "sauce"
    ? "sauce-btn"
    : topping.type === "cheese"
      ? "cheese-btn"
      : topping.type === "meat"
        ? "meat-btn"
        : topping.type === "produce"
          ? "produce-btn"
          : "seasoning-btn";

  return <PosBtn
    className={className}
    key={topping._id}
    text={topping.name}
    onClick={() => dispatch({ type: "MODIFY_ITEM", data: topping._id })}
  />
}

export default ToppingBtn;
