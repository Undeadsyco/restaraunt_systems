"use client"
// Dependecies
import { ReactNode, useContext } from "react";
// Components
import { PosBtn } from "../../components/buttons";
import { PizzaItem, SectionBtn, UtilityBtns } from "./components";
// Context
import { PosContext } from "@/utils/PosContext";
import { usePathname } from "next/navigation";

const MenuLayout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const pathname = usePathname();
  const { state, dispatch } = useContext(PosContext);

  return (
    <>
      <div className="col-span-full grid grid-cols-7 gap-1">
        {!pathname.includes("toppings")
          ? state.sections.map(section => (
            <SectionBtn key={section._id} {...section} />
          ))
          : ["Sauce", "Cheese", "Meat", "Produce", "Seasoning"].map(type => (
            <PosBtn
              key={type}
              {...{
                text: type,
                className: `${type.toLowerCase()}-btn`,
                onClick: () => dispatch({ type: "SET_TOPPING_TYPE", data: type })
              }}
            />
          ))}
        <PosBtn className="col-start-7" text="AOS" />
      </div>

      <UtilityBtns />

      {children}

      {state.pizza && <PizzaItem />}
    </>
  )
}

export default MenuLayout;
