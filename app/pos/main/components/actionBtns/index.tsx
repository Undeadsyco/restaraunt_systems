"use client"
// Dependencies
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { PosContext } from "@/utils/PosContext";
// Components
import { PosBtn } from "@/app/pos/components/buttons";

const MenuActions = () => {
  const { dispatch } = useContext(PosContext)!;
  const router = useRouter();

  return (
    <>
      {/* Group 1 */}
      <div className="row-span-3 grid grid-rows-3 grid-cols-3 gap-x-1 gap-y-3 text-sm text-white">
        <PosBtn text="Delete" onClick={() => dispatch({ type: "DELETE_SELECTED" })} />
        <PosBtn text="Delete All" onClick={() => dispatch({ type: "DELETE_ORDER" })} />
        <PosBtn text="Quantity" />
        <PosBtn text="Order Lookup" />
        <PosBtn text="Customer Lookup" />
        <PosBtn text="repeat" />
        <PosBtn text="Crew Functions" onClick={() => router.push("/pos/main/crew")} />
        <PosBtn text="MGR Functions" onClick={() => router.push("/pos/main/manager")} />
        <PosBtn text="Open Orders" />
      </div>

      {/* Group 2 */}
      <div className="col-span-3 grid grid-cols-7 gap-1 text-sm text-white">
        <PosBtn text="Menu" onClick={() => router.push("/pos/main/menu")} />
        <PosBtn text="Comments" onClick={() => router.push("/pos/main/comments")} />
        <PosBtn text="Discount" onClick={() => router.push("/pos/main/discounts")} />
        <PosBtn text="CallIn" />
        <PosBtn text="WalkIn" onClick={() => dispatch({ type: "OPEN_KEYBOARD", data: "SET_ORDER_NAME" })} />
        <PosBtn text="Tenders" onClick={() => router.push("/pos/main/tenders")} />
        <PosBtn text="Close" className="close-btn text-white" onClick={() => router.push("/pos")} />
      </div>
    </>
  );
}

export default MenuActions;