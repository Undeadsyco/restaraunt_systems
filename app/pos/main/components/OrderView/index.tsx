"use client"
// Dependencies
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
// Components
import OrderItem from "./OrderItem";
import { PosBtn } from "@/app/pos/components/buttons";
// Context
import { PosContext } from "@/utils/PosContext";
import { KeypadForm } from "@/app/pos/components";
import axios from "axios";

const OrderView = () => {
  const { state, dispatch } = useContext(PosContext)!;

  return (
    <div className="grid grid-rows-12 gap-2 row-span-9 bg-white text-black p-1 rounded-2xl">
      <div className="bordered row-span-2 grid grid-cols-4 gap-2 p-1 pb-4">
        {/* Order Select Btns */}
        {state.orders.map((_, i) => (
          <PosBtn
            key={i}
            text={`order ${i + 1}`}
            className={`bordered ${state.index === i ? "btn-default-secondary" : ""}`}
            onClick={() => dispatch({ type: "SELECT_ORDER", data: i })}
          />
        ))}

        {/* Add Order Btn */}
        {state.orders.length < 4 && <PosBtn
          className="bordered text-3xl"
          text="+"
          onClick={() => dispatch({ type: "CREATE_ORDER" })}
        />}
      </div>

      {/* Order Container */}
      <div className="bordered row-span-8 flex flex-col p-2 overflow-auto">
        <button
          type="button"
          onClick={() => dispatch({
            type: "OPEN_MODAL",
            data: <KeypadForm {...{
              onSubmit: (values) => dispatch({ type: "SET_NAME", data: values.value }),
              onReset: () => dispatch({ type: "CLOSE_MODAL" })
            }} />
          })}
        >
          <h2 className="text-center">
            {state.orders[state.index].name ?? "Order"}
          </h2>
        </button>

        {/* Order Items */}
        {state.orders[state.index].items.map((orderItem: any, i) => (
          <OrderItem {...{ orderItem }} key={i} />
        ))}

        {/* payments */}
        {state.orders[state.index].hasPayments() && (
          <div className="mt-10">
            <h3>Payments:</h3>
            {state.orders[state.index].payments.map((p) => (
              <p
                key={v4()}
                tabIndex={1}
                className={`orderItem text-red-500 text-xl font-semibold ${state.orders[state.index].selected === p && "orderItemActive"} cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch({ type: "SELECT_ITEM", data: p })
                }}
              >
                <span>{p.source}: </span>
                <span>${p.amount}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Price Container */}
      <div className="bordered row-span-2 text-sm p-2 grid grid-cols-2 grid-rows-3">
        <p className="flex justify-between px-2" >
          <span>SubTotal: </span>
          <span>${state.orders[state.index].subtotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between px-2" >
          <span>Tax: </span>
          <span>${state.orders[state.index].tax.toFixed(2)}</span>
        </p>
        <p className="flex justify-between px-2" >
          <span>Total: </span>
          <span>${state.orders[state.index].total.toFixed(2)}</span>
        </p>
        {state.orders[state.index].hasPayments() && (
          <p className="flex justify-between px-2">
            <span>Payment: </span>
            <span>${state.orders[state.index].paid.toFixed(2)}</span>
          </p>
        )}
        {state.orders[state.index].change > 0 && (
          <p className="flex justify-between px-2">
            <span>Change: </span>
            <span>${state.orders[state.index].change.toFixed(2)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderView;
