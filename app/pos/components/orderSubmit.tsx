"use client"
import { PosContext } from "@/utils/PosContext"
import { useContext, useEffect, useState } from "react"
import { PosBtn } from "./buttons";
import axios, { AxiosError } from "axios";

const OrderSubmit = () => {
  const { state: { orders, index }, dispatch } = useContext(PosContext);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    const submitOrder = async () => {
      try {
        const req = await axios.post("/pos/api/orders", orders[index]);
        const res = await req.data;
        alert("success");
      } catch (error) {
        // if (error instanceof AxiosError) {

        // }
        dispatch({ type: "SET_ERROR", data: "Order was unable to be submitted" });
      }
    }

    submitOrder();
  }, []);

  return (
    <div className="bg-white w-1/4 h-1/3 text-black bordered p-2 pb-4 flex flex-col items-center justify-between">
      <h2 className="font-bold text-2xl">Order Completed</h2>
      <div className="w-2/3 h-1/4 flex flex-col justify-between px-2">
        <p className="flex justify-between">
          <span>Paid Amount:</span>
          <span>${orders[index].paid.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Change:</span>
          <span>${orders[index].change.toFixed(2)}</span>
        </p>
      </div>
      {isSubmited && (
        <PosBtn {...{ text: "Close", className: "close-btn text-white px-4 py-1", onClick: () => dispatch({ type: "CLOSE_MODAL" }) }} />
      )}
    </div>
  )
}

export default OrderSubmit;
