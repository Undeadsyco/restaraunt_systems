import { Modification } from "@/app/pos/classes";
import { Clickable } from "@/app/pos/components";
import { PosContext } from "@/utils/PosContext";
import { useContext } from "react";

const ModificationItem = ({ item }: { item: Modification }) => {
  const { state, dispatch } = useContext(PosContext);

  return (
    <Clickable
      as="p"
      onClick={() => dispatch({ type: "SELECT_ITEM", data: item })}
      className={`orderItem ${state.orders[state.index].selected === item ? 'orderItemActive' : null} w-4/5`}
    >
      <span className="font-bold">{item.type}</span>
      <span className="font-bold">{state.toppings.find(t => t._id === item.topping._id)?.name}</span>
      <span className="font-bold">${item.price.toFixed(2)}</span>
    </Clickable>
  )
}

export default ModificationItem;
