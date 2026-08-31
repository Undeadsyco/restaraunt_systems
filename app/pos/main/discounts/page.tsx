"use client"
// Dependencies
import { MouseEvent, useContext, useState } from "react";
import { PosContext } from "@/utils/PosContext";

// Components
import { PosBtn } from "@/app/pos/components/buttons";
import { NumberpadForm } from "../../components";



const DiscountBtn = ({ category, text }: { category: POS.Types.discountCategory; text: string; }) => {
  const { state: { orders, index }, dispatch } = useContext(PosContext)!;
  return (
    <PosBtn
      text={text}
      className="btn-default-secondary"
      onClick={() => dispatch({
        type: "OPEN_MODAL",
        data: <NumberpadForm {...{
          value: orders[index].total,
          category: category === "partcial" ? "partcial" : "whole",
          onSubmit: (values) => {
            dispatch({ type: "ADD_DISCOUNT", data: { category, text, amount: values.value } });
            dispatch({ type: "CLOSE_MODAL" });
          },
          onClose: () => dispatch({ type: "CLOSE_MODAL" }),
        }} />
      })}
    />
  )
}

const Column = ({ title, children }: { title: string; children?: React.ReactNode | React.ReactNode[] }) => (
  <div className="row-span-11 col-span-2 first:col-start-2 rounded-xl px-2 py-2 grid grid-rows-subgrid">
    <h3 className="text-center text-xl mb-4 text-white">{title}</h3>
    <div className="row-start-2 row-span-10 grid grid-rows-7 gap-y-3">
      {children}
    </div>
  </div>
)

const DiscountBtns = () => {
  const discountTypes = ["TV/In-store", "Online/E-Club", "Text Message", "Special Tracking"];

  return (
    <>
      <Column title="Dollar Amount">
        {discountTypes.map(d => (
          <DiscountBtn
            key={`${d}-$`}
            {...{ category: "whole", text: `${d} $` }}
          />
        ))}
      </Column>

      <Column title="Custom Amount">
        {discountTypes.map(d => (
          <DiscountBtn
            key={`${d}`}
            {...{ category: "partcial", text: d }}
          />
        ))}
      </Column>

      <Column title="Percentage">
        {[...discountTypes, "Manager", "Employee", "Busisness"].map(d => (
          <DiscountBtn
            key={`${d} %`}
            {...{ category: "percentage", text: `${d} %` }}
          />
        ))}
      </Column>
    </>
  );
}

export default DiscountBtns;
