"use client"
// Dependencies
import { MouseEvent, useContext, useState } from "react";
import { PosContext } from "@/utils/PosContext";

// Components
import { PosBtn } from "@/app/pos/components/buttons";

type discountCategory = ("whole" | "partcial" | "percentage")

const DiscountBtn = ({ category, text }: { category: discountCategory; text: string; }) => {
  const { dispatch } = useContext(PosContext)!;
  return (
    <PosBtn
      text={text}
      className="btn-default-secondary"
      onClick={(e) => {
        const name = e.currentTarget.children[0].textContent || e.currentTarget.textContent;

        dispatch({
          type: "OPEN_NUMBERPAD",
          data: { type: category, action: "ADD_DISCOUNT", name }
        });
      }}
    />
  )
}

const Column = ({ title, children }: { title: string; children?: React.ReactNode | React.ReactNode[] }) => (
  <div className="row-span-11 col-span-2 first:col-start-2 rounded-xl px-2 py-2 grid grid-rows-subgrid">
    <h3 className="text-center text-xl mb-4">{title}</h3>
    <div className="row-start-2 row-span-10 grid grid-rows-7 gap-y-3">
      {children}
    </div>
  </div>
)

const DiscountBtns = () => {
  const { state, dispatch } = useContext(PosContext)!;
  
  const discountTypes = ["TV/In-store", "Online/E-Club", "Text Message", "Special Tracking"];

  return (
    <>
      <Column title="Dollar Amount">
        {discountTypes.map(d => (
          <DiscountBtn
            key={`${d}-$`}
            {...{ state, dispatch, category: "whole", text: `${d} $` }}
          />
        ))}
      </Column>

      <Column title="Custom Amount">
        {discountTypes.map(d => (
          <DiscountBtn
            key={`${d}`}
            {...{ state, dispatch, category: "partcial", text: d }}
          />
        ))}
      </Column>

      <Column title="Percentage">
        {[...discountTypes, "Manager", "Employee", "Busisness"].map(d => (
          <DiscountBtn
            key={`${d} %`}
            {...{ state, dispatch, category: "partcial", text: `${d} %` }}
          />
        ))}
      </Column>
    </>
  );
}

export default DiscountBtns;
