"use client"
// Dependencies
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// Components
import { PizzaItem, PizzaPortionBtn } from "./components";
import { PizzaBtn, PosBtn, ToppingBtn } from "@/app/pos/components/buttons";
// Types
import { PosContext } from "@/utils/PosContext";
import { LinkBtn } from "@/app/components";

export default function Menu() {
  const { state } = useContext(PosContext);

  return (
    <>
      <div className="col-span-6 col-start-3 grid grid-cols-3 gap-x-1">
        <PizzaPortionBtn text="Half" />
        <PizzaPortionBtn text="Thirds" />
        <PizzaPortionBtn text="Quarters" />
      </div>

      <div className="col-span-6 col-start-3 row-span-2 grid grid-cols-5 grid-rows-2 gap-1 gap-y-3">
        {state.sections.find(section => section._id === state.section)?.pizzas.map(pizzaId => {
          const pizza = state.pizzas.find(p => p._id === pizzaId)!;
          return <PizzaBtn key={pizza._id} {...{ pizza, }} />
        })}
        <LinkBtn className="pos-btn to-toppings-btn col-start-5 row-start-2" href="menu/toppings">Toppings</LinkBtn>
      </div>
    </>
  )
}
