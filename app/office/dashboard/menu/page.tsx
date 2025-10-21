import { LinkBtn } from "@/app/components";
import { BtnContainer } from "./components";

export default function Inventory() {
  return (
    <>
      <div className="col-span-full row-span-11 grid grid-cols-3 grid-rows-2 p-20 gap-20">
        <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", href: "/office/dashboard/menu/dough", text: "Dough" }} />
        <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", href: "/office/dashboard/menu/section", text: "Sections" }} />
        <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", href: "/office/dashboard/menu/pizza", text: "Pizzas" }} />
        <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", href: "menu/topping", text: "Toppings" }} />
      </div>
      <BtnContainer />
    </>
  )
}