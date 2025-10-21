"use client"
// Dependencies
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
// Components
import { PosBtn, ToppingBtn } from "@/app/pos/components/buttons";
import { PosContext } from "@/utils/PosContext";
import ModificationBtn from "./modificationBtn";
import SizeChangeBtn from "./changeSizeBtn";
import axios from "axios";

const UtilityBtns = () => {
  const { state: { currentPizza }, dispatch } = useContext(PosContext)!;
  const [toppings, setToppings] = useState<(DataBase.Menu.ITopping | undefined)[]>([]);

  useEffect(() => {
    if (currentPizza)
      setToppings(currentPizza.toppings);
  }, [currentPizza]);

  return (
    <div className="row-span-10 col-span-2 grid grid-cols-2 grid-rows-8 gap-x-1 gap-y-3">
      {/* Less/Extra Modification Btns */}
      <>
        <ModificationBtn text="Less" />
        <ModificationBtn text="Extra" />
      </>

      {/* Topping Preview Btns */}
      <>
        {toppings.length > 0 ? (
          toppings.concat(Array.from({ length: 10 - toppings.length }, () => undefined)).map((topping) => (
            <ToppingBtn key={topping?._id ?? v4()} {...{ topping }} />
          ))
        ) : (
          Array.from({ length: 10 }, () => <ToppingBtn key={v4()} />)
        )}
      </>

      {/* Pizza Size Adjust Btns */}
      <>
        <SizeChangeBtn text="Down" />
        <SizeChangeBtn text="Up" />
      </>

      {/* Order Action Btns */}
      <>
        <PosBtn
          className="order-action-btn"
          text="Add To Order"
          onClick={() => dispatch({ type: "CREATE_ITEM" })}
        />
        <PosBtn
          className="order-action-btn"
          text="Send Order"
        // onClick={() => { }}
        />
      </>
    </div>
  );
}

export default UtilityBtns;
