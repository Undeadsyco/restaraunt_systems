import { PosBtn, ToppingBtn } from "@/app/pos/components/buttons";
import { PosContext } from "@/utils/PosContext";
import { useContext } from "react";
import PriceItem from "./priceItem";
import ToppingItem from "./toppingItem";

const PizzaItem = () => {
  const { state } = useContext(PosContext);
  const pizza = state.pizzas.find(p => p._id === state.pizza)
  if (!pizza) return null;

  return (
    <div className="bg-white row-start-5 rounded-2xl col-span-full row-span-7 p-2 flex justify-between text-black">
      <div className="w-1/2 flex flex-col justify-between pb-2">
        <h3 className="text-3xl font-extrabold">{pizza.name}</h3>
       
        <div className="grid grid-cols-4 grid-rows-2 gap-1 gap-y-3">
          {pizza.prices.map(priceItem => (
            <PriceItem key={priceItem.size.toString()} {...priceItem} />
          ))}
        </div>
      </div>

      <div className="h-full w-2/5 grid grid-cols-2 grid-rows-5 gap-1 gap-y-3 pb-2">
        {pizza.toppings.map(toppingItem => (
          <ToppingItem key={toppingItem.item.toString()} {...toppingItem} />
        ))}

        {Array.from({length: 10 - pizza.toppings.length}).map((_, i) => (
          <PosBtn key={`empty-topping-${i}`} className="topping-preview-btn opacity-50" />
        ))}
      </div>
    </div>
  )
}

export default PizzaItem;