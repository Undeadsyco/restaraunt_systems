import { use, useEffect, useState } from "react";
import { OrderItem } from "./components";
import { PosBtn } from "@/app/pos/components/buttons";

const OrderView = (props: POS.Props.PosComponent) => {
  const { state, dispatch } = props;

  const [order, setOrder] = useState(state.orders[state.orderIndex]);
  const [tax, setTax] = useState((order.price * 0.087).toFixed(2));
  const [total, setTotal] = useState((order.price + parseFloat(tax)).toFixed(2));

  useEffect(() => {
    setTax(() => {
      const tax = (order.price * 0.087);
      setTotal((order.price * tax).toFixed(2));
      return tax.toFixed(2);
    });
  }, [order]);

  useEffect(() => {
    setOrder(state.orders[state.orderIndex])
  }, [state.orders, state.orderIndex])

  return (
    <div className="grid grid-rows-12 gap-2 row-span-9 bg-white text-black p-1 rounded-2xl">
      <div className="bordered row-span-2 grid grid-cols-4 gap-2 p-1 pb-4">
        {/* Order Select Btns */}
        {state.orders.map((_, i) => (
          <PosBtn
            key={i}
            text={`order ${i + 1}`}
            className={`bordered ${state.orderIndex === i ? "btn-default-active" : ""}`}
            action={() => dispatch({ type: "SELECT_ORDER", data: i })}
          />
        ))}

        {/* Add Order Btn */}
        {state.orders.length < 4 && <PosBtn
          className="bordered text-3xl"
          text="+"
          action={() => dispatch({ type: "CREATE_ORDER" })}
        />}
      </div>

      {/* Order Items Container */}
      <div className="bordered row-span-8 flex flex-col p-2 overflow-auto">
        <button type="button" onClick={() => dispatch({ type: "OPEN_KEYBOARD", data: "SET_ORDER_NAME"})}>
          <h2 className="text-center">
            {order.name ? order.name : "Order"}
          </h2>
        </button>
        {state.orders[state.orderIndex].items.map((orderItem: POS.Reducer.OrderItem<"pizza">, i) => (
          <OrderItem {...{ state, dispatch }} key={i} orderItem={orderItem} />
        ))}
      </div>

      {/* Price Container */}
      <div className="bordered row-span-2 text-sm p-2 flex flex-col justify-between">
        <p className="flex justify-between px-5" >
          <span>SubTotal: </span>
          <span>${state.orders[state.orderIndex].price.toFixed(2)}</span>
        </p>
        <p className="flex justify-between px-5" >
          <span>Tax: </span>
          <span>${tax}</span>
        </p>
        <p className="flex justify-between px-5" >
          <span>Total: </span>
          <span>${total}</span>
        </p>
      </div>
    </div>
  );
}

export default OrderView;
