import { ToppingBtn } from "@/app/pos/components/buttons";
import { PosContext } from "@/utils/PosContext";
import { useContext } from "react";

const ToppingItem = ({ item }: DataBase.Menu.IToppingItem) => {
  const { state } = useContext(PosContext);
  const topping = state.toppings.find(t => t._id === item);
  if (!topping) return null;

  return (
    <ToppingBtn key={topping._id} {...{ topping: topping }} />
  )
}

export default ToppingItem;
