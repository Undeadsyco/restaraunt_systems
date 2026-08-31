// Dependencies
import { useContext, useState } from "react";
// Components
import { OrderItem, Pizza } from "@/app/pos/classes";
import PizzaItem from "./components/pizzaItem";

const Item = ({ orderItem }: { orderItem: OrderItem }) => {
  if (orderItem instanceof Pizza) return <PizzaItem pizzaItem={orderItem} />

  return null;
}

export default Item;
