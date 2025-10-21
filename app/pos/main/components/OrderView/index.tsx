"use client"
// Dependencies
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
// Components
import OrderItem from "./OrderItem";
import { PosBtn } from "@/app/pos/components/buttons";
// Context
import { PosContext } from "@/utils/PosContext";

const OrderView = () => {
  const { state, dispatch } = useContext(PosContext)!;

  const { selectedItem } = state.orders[state.orderIndex];

  const [order, setOrder] = useState(state.orders[state.orderIndex]);
  const [payment, setPayment] = useState<number>(order.payments.reduce((acc, current) => acc + current.value, 0));

  useEffect(() => {
    setOrder(state.orders[state.orderIndex]);
  }, [state.orders, state.orderIndex])

  useEffect(() => {
    setPayment(order.payments.reduce((acc, current) => acc + current.value, 0));
  }, [order]);

  return (
    <div className="grid grid-rows-12 gap-2 row-span-9 bg-white text-black p-1 rounded-2xl">
      <div className="bordered row-span-2 grid grid-cols-4 gap-2 p-1 pb-4">
        {/* Order Select Btns */}
        {state.orders.map((_, i) => (
          <PosBtn
            key={i}
            text={`order ${i + 1}`}
            className={`bordered ${state.orderIndex === i ? "btn-default-secondary" : ""}`}
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
        <button type="button" onClick={() => dispatch({ type: "OPEN_KEYBOARD", data: "SET_ORDER_NAME" })}>
          <h2 className="text-center">
            {order.name ? order.name : "Order"}
          </h2>
        </button>

        {/* Order Items */}
        {order.items.map((orderItem: POS.Order.PizzaItem, i) => (
          <OrderItem {...{ orderItem }} key={i} />
        ))}

        {/* payments */}
        {order.payments.length > 0 && (
          <div className="mt-10">
            <h3>Payments:</h3>
            {order.payments.map((p) => (
              <p
                key={v4()}
                tabIndex={1}
                className={`orderItem text-red-500 text-xl font-semibold ${selectedItem === p && "orderItemActive"} cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch({ type: "SELECT_ITEM", data: p })
                }}
              >
                <span>{p.source}: </span>
                <span>${p.value}</span>
              </p>
            ))}
          </div>
        )}
      </div>


      {/* Price Container */}
      <div className="bordered row-span-2 text-sm p-2 grid grid-cols-2 grid-rows-3">
        <p className="flex justify-between px-2" >
          <span>SubTotal: </span>
          <span>${order.subTotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between px-2" >
          <span>Tax: </span>
          <span>${order.tax.toFixed(2)}</span>
        </p>
        <p className="flex justify-between px-2" >
          <span>Total: </span>
          <span>${order.total.toFixed(2)}</span>
        </p>
        {order.payments.length > 0 && (
          <p className="flex justify-between px-2">
            <span>Payment: </span>
            <span>${order.payments.reduce((acc, current) => acc + current.value, 0).toFixed(2)}</span>
          </p>
        )}
        {order.change > 0 && (
          <p className="flex justify-between px-2">
            <span>Change: </span>
            <span>${order.change}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderView;
