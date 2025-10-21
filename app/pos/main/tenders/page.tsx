"use client"
// Dependencies
import { ReactNode, useContext, useEffect, useState } from "react"
// Components
import { PosBtn } from "@/app/pos/components/buttons"
import { PosContext } from "@/utils/PosContext";
// Types
import type { BtnProps } from "@/types";

const CashBtn = ({ text, className, value }: BtnProps & { value: number }) => {
  const { dispatch } = useContext(PosContext)!;
  return (
    <PosBtn {...{
      text,
      className: `green-btn text-white ${className}`,
      onClick: () => dispatch({
        type: "ADD_PAYMENT",
        data: {
          source: "Cash",
          value: value
        }
      })
    }} />
  );
}

const TendersColumn = ({ children, className }: { children?: ReactNode | ReactNode[], className?: string }) => {
  return (
    <div className={`${className} col-span-2 row-span-10 grid grid-rows-7 gap-4 p-1`}>
      {children}
    </div>
  );
}

const TendersView = () => {
  const { state, dispatch } = useContext(PosContext)!;

  const openNumberPad = () => dispatch({
    type: "OPEN_NUMBERPAD",
    data: { type: "partial", action: "ADD_PAYMENT", name: "Payment" }
  })

  return (
    <>
      <TendersColumn>
        <PosBtn {...{ className: `green-btn text-white`, text: "Cash $", onClick: openNumberPad }} />
        <CashBtn {...{ text: "Exact $", value: state.orders[state.orderIndex].total }} />
        <CashBtn {...{ text: "$1", className: "row-start-4", value: 1 }} />
        <CashBtn {...{ text: "$5", className: "row-start-5", value: 5 }} />
        <CashBtn {...{ text: "$10", className: "row-start-6", value: 10 }} />
        <CashBtn {...{ text: "$20", className: "row-start-7", value: 20 }} />
      </TendersColumn>
      <TendersColumn className="col-start-4">
        <PosBtn {...{ text: "Card Payment", className: "card-btn text-white" }} />
        <PosBtn {...{ text: "Manual Card Payment", className: "card-btn text-white" }} />
        <PosBtn {...{ text: "Gift Card Balance", className: "balance-btn text-white row-start-6" }} />
        <PosBtn {...{ text: "EBT Card Balance", className: "balance-btn text-white row-start-7" }} />
      </TendersColumn>
      <TendersColumn className="col-start-7">
        <PosBtn {...{ text: "Discount", className: "btn-default-secondary" }} />
        <PosBtn {...{ text: "Send Order", className: "btn-default-secondary row-start-6" }} />
        <PosBtn {...{ text: "Close Check", className: "close-check-btn row-start-7" }} />
      </TendersColumn>
    </>
  );
}

export default TendersView;
