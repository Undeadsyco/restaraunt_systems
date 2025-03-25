// components
import { v4 } from "uuid";

import { Suspense } from "react";

import { PizzaBtn, PosBtn, SizeBtn, ToppingBtn } from "@/app/pos/components/buttons";
import { PizzaBtns, StuffedPizzaBtns, ToppingBtns } from "./views";

const Menu = (props: POS.Props.PosComponent) => {
  const { state: { dough, toppingPreview, views: { menu } }, dispatch } = props;
  return (
    <>
      {/* Size/Category Select Btns */}
      <div className={`col-span-8 grid grid-cols-10 gap-1`}>
        {dough.map((dough: POS.Data.IDough) => (
          <SizeBtn
            key={dough._id as string}
            size={dough}
            {...props}
          />
        ))}
        <PosBtn className="size-btn active:pizza-size-btn-active" text="Specials" />
        <PosBtn
          className="size-btn active:pizza-size-btn-active"
          text="Stuffed"
          action={() => dispatch({ type: "SET_MENU_VIEW", data: "Stuffed" })}
        />
        <PosBtn text="AOS" />
      </div>

      {/* Utility Btns */}
      <div className="row-span-10 col-span-2 grid grid-cols-2 grid-rows-8 gap-x-1 gap-y-3">
        {/* Less/Extra Modification Btns */}
        <>
          <PosBtn
            className="topping-modify-btn"
            text="Less"
            action={() => dispatch({ type: "SET_MODIFICATION", data: "less" })}
          />
          <PosBtn
            className="topping-modify-btn"
            text="Extra"
            action={() => dispatch({ type: "SET_MODIFICATION", data: "extra" })}
          />
        </>

        {/* Topping Preview Btns */}
        <>
          <Suspense>
            {toppingPreview.concat(Array.from({ length: 10 - toppingPreview.length }, () => v4())).map((topping) => (
              <ToppingBtn
                {...props}
                key={topping as string}
                toppingId={topping}
              />
            ))}
          </Suspense>
        </>

        {/* Pizza Size Adjust Btns */}
        <>
          <PosBtn
            className="change-size-btn"
            text="Down Size"
            action={() => dispatch({ type: "CHANGE_SIZE", data: "down" })}
          />
          <PosBtn
            className="change-size-btn"
            text="Up Size"
            action={() => dispatch({ type: "CHANGE_SIZE", data: "up" })}
          />
        </>

        {/* Order Action Btns */}
        <>
          <PosBtn
            className="order-action-btn"
            text="Add To Order"
            action={() => dispatch({ type: "CREATE_ITEM" })}
          />
          <PosBtn
            className="order-action-btn"
            text="Send Order"
          // action={() => { }}
          />
        </>
      </div>

      {/* Views */}
      <div className={`row-span-10 col-span-6 grid grid-cols-6 grid-rows-9 gap-x-1 gap-y-3`}>
        {menu === "Traditional" ? <PizzaBtns {...props} /> : null}
        {menu === "Toppings" ? <ToppingBtns {...props} /> : null}
        {menu === "Specials" ? <></> : null}
        {menu === "Stuffed" ? <StuffedPizzaBtns {...props} /> : null}
        {menu === "AOS" ? <></> : null}
      </div>
    </>
  );
}

export default Menu;