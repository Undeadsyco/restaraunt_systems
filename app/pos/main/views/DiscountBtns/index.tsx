import { NumberPad } from "@/app/components";
import { PosBtn } from "@/app/pos/components/buttons";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

type DiscountType = (
  "SPB Print" | "TV/In store" | "Local" | "Online/E-Club" | "Text Message" | "Special Tracking" | "Institutional"
  | "Manager %" | "Employee %"
)

const DiscountBtn = ({ category, text, dispatch }: { category: ("whole" | "fractional"); text: string; } & POS.Props.PosComponent) => (
  <PosBtn
    text={`${text} ${category === "whole" ? "$" : "%"}`}
    action={(e) => {
      const name = e.currentTarget.children[0].textContent || e.currentTarget.textContent;

      dispatch({
        type: "OPEN_NUMBERPAD",
        data: { type: category, action: "ADD_DISCOUNT", name }
      })
    }}
  />
)

const Column = ({ title, children }: { title: string; children?: React.ReactNode | React.ReactNode[] }) => (
  <div className="row-span-full last:row-span-10 grid grid-rows-subgrid">
    <h3 className="">{title}</h3>
    <div className="row-start-2 row-span-10 grid grid-rows-7 gap-y-3">
      {children}
    </div>
  </div>
)

const DiscountBtns = ({ state, dispatch }: POS.Props.PosComponent) => {
  const [discountType, setDiscountType] = useState<string | undefined>(undefined);

  const discountTypes = ["SPB Print", "TV/In-store", "Local", "Online/E-Club", "Text Message", "Special Tracking", "Institutional"];

  return (
    <>
      <div className="col-span-5 row-span-full grid grid-cols-3 grid-rows-subgrid bg-white text-black group:discounts p-1 pb-3 gap-1 rounded-2xl">
        <Column title="Dollar Amount">
          {discountTypes.map(d => (
            <PosBtn
              key={`${d}-${v4()}`} text={`${d} $`}
              action={(e: MouseEvent) => {
                setDiscountType(e.currentTarget.children[0].innerHTML || e.currentTarget.innerHTML);
              }}
            />
          ))}
        </Column>

        <Column title="Custom Amount">
          {discountTypes.map(d => (
            <DiscountBtn
              key={`${d}-%`}
              {...{ state, dispatch, category: "whole", text: d }}
            />
          ))}
        </Column>

        <Column title="Percentage">
          <DiscountBtn
            key="Manager %"
            {...{ state, dispatch, category: "fractional", text: "Manager" }}
          />
          <DiscountBtn
            key="Employee %"
            {...{ state, dispatch, category: "fractional", text: "Employee" }}
          />
          <DiscountBtn
            key="Busisness %"
            {...{ state, dispatch, category: "fractional", text: "Busisness" }}
          />
          <DiscountBtn
            key={`${discountTypes[3]} %`}
            {...{ state, dispatch, category: "fractional", text: discountTypes[3] }}
          />
          <DiscountBtn
            key={`${discountTypes[4]} %`}
            {...{ state, dispatch, category: "fractional", text: discountTypes[4] }}
          />

          <PosBtn />
        </Column>

        <PosBtn
          text="Back"
          className="col-start-3 w-1/2 justify-self-end relative close-btn text-white"
          action={() => dispatch({ type: "SET_MAIN_VIEW", data: "Menu" })}
        />
      </div>
      <div className="bg-white"></div>
    </>
  );
}

export default DiscountBtns;
