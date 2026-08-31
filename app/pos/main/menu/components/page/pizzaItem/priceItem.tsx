import { PosBtn } from "@/app/pos/components/buttons";
import { PosContext } from "@/utils/PosContext";
import { useContext } from "react";

const PriceItem = ({ size, cost }: DataBase.Menu.IPrice) => {
  const { state, dispatch } = useContext(PosContext);
  const dough = state.dough.find(d => d._id === size);
  if (!dough) return null;

  return (
    <PosBtn {...{ className: "flex flex-col justify-center", onClick: () => dispatch({ type: "ADD_PIZZA", data: { pizza: state.pizza, size } }) }}>
      <span>{dough.name}</span>
      <span>${cost.toFixed(2)}</span>
    </PosBtn>
  )
}

export default PriceItem;
