import { useState } from "react";
import PosBtn from "./posBtn";

type ToppingProps = POS.Props.PosComponent & {
  toppingId: POS.Types.IDType;
}

const isITopping = (topping: any): topping is POS.Data.ITopping => topping ? (
  "name" in topping
) : false;

const ToppingBtn = ({ toppingId, state, dispatch }: ToppingProps) => {
  const [topping] = useState(state.toppings.find(t=> t._id === toppingId));
  if (isITopping(topping)) {
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
      key={topping._id as string}
      text={topping.name}
      action={() => dispatch({ type: "MODIFY_ITEM", data: topping._id })}
    />
  } else return <PosBtn className="topping-preview-btn" />

}

export default ToppingBtn;
