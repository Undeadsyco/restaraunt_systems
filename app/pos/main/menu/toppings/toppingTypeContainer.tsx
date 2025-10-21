// Dependencies
import { ReactNode } from "react";
// Controllers
import { ToppingController } from "@/lib/DBModels/controllers";
// Components
import { ToppingBtn } from "@/app/pos/components/buttons";

const getToppings = async (type: string) => {
  const toppings = await ToppingController.getByToppingType(type);
  if (!toppings) throw new Error(`Unable to find toppings with given type ${type}`);

  return JSON.stringify(toppings);
}

export default async function ToppingTypeContainer({ className, type, children }: { className: string; type: string; children?: ReactNode }) {
  const toppings: DataBase.Menu.ITopping[] = JSON.parse(await getToppings(type));

  return (
    <div className={`col-span-6 grid grid-cols-6 gap-x-2 gap-y-4 ${className}`}>
      {toppings.map(topping => (
        <ToppingBtn key={topping._id} {...{ topping }} />
      ))}
      {children}
    </div>
  )
}