import { useState } from "react";
import ModificationItem from "./ModificationItem";
import { v4 } from "uuid";

type PizzaItemsProps = POS.Props.PosComponent & {
  orderItem: POS.Reducer.OrderItem<"pizza">
}

type WholePizzaDetailsProps = POS.Props.PosComponent & {
  pizzaId: POS.Types.IDType;
  sizeId: POS.Types.IDType;
}

type PortionPizzaDetailsProps = POS.Props.PosComponent & {
  pizzaIds: POS.Types.IDType[];
  sizeId: POS.Types.IDType;
}

type ModificationListProps = POS.Props.PosComponent & {
  list: POS.Reducer.ModificationItem[]
}

const WholePizzaDetails = ({ pizzaId, sizeId, state }: WholePizzaDetailsProps) => {
  const pizza = state.pizzas.find(p => p._id === pizzaId);
  const size = state.dough.find(dough => dough._id === sizeId);
  const index = state.dough.indexOf(size!)
  return (
    <h3 className="text-center flex justify-around mb-2 text-lg font-semibold">
      <span>{size?.name}</span>
      <span>{pizza?.name}</span>
      <span>${pizza?.prices![index].price}</span>
    </h3>
  )
}

const ModificationList = ({ list, state, dispatch }: ModificationListProps) => {
  return (<div className={`${list.length > 0 ? "block" : "hidden"} `}>
    <p className="text-xl">Modifications</p>
    {list.filter(m => m.modification === "no").map((modification, i) => (
      <ModificationItem
        {...{ state, dispatch }}
        key={`${modification.topping}-${i}`}
        item={modification}
      />
    ))}
    {list.filter(m => m.modification !== "no").map((modification, i) => (
      <ModificationItem
        {...{ state, dispatch }}
        key={`${modification.topping}-${i}`}
        item={modification}
      />
    ))}
  </div>)
}

const PizzaItem = ({ orderItem, state, dispatch }: PizzaItemsProps) => (
  <>
    <WholePizzaDetails {...{ state, dispatch, pizzaId: orderItem.pizzas[0], sizeId: orderItem.size }} />
    <ModificationList {...{ state, dispatch, list: orderItem.modifications }} />
  </>
);

export default PizzaItem;