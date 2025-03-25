import { useEffect, useState } from "react";
import { v4 } from "uuid";

const DiscountItem = ({ item, state, dispatch }: { item: POS.Reducer.DiscountItem } & POS.Props.PosComponent) => {
  const [isSelected, setIsSelected] = useState(state.orders[state.orderIndex].selectedItem === item);

  useEffect(() => {
    setIsSelected(state.orders[state.orderIndex].selectedItem === item);
  }, [state.orders[state.orderIndex].selectedItem]);

  return (
    <p
      tabIndex={1}
      className={`orderItem ${isSelected ? 'orderItemActive' : null} rounded-2xl w-2/3 px-2 flex justify-around`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: "SELECT_ITEM", data: item });
      }}
    >
      <span>{item.name}</span>
      <span>$-{item.amount.toFixed(2)}</span>
    </p>
  );
}

export default DiscountItem;
