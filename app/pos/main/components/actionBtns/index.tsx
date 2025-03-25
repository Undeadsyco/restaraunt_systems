"use client"
// Dependencies
import { useRouter } from "next/navigation";
// Components
import { PosBtn } from "@/app/pos/components/buttons";
// Types

const MenuActions = (props: POS.Props.PosComponent) => {
  const router = useRouter();
  
  return (
    <>
      {/* Group 1 */}
      <div className="row-span-3 grid grid-rows-3 grid-cols-3 gap-x-1 gap-y-3 text-sm text-white">
        <PosBtn text="Delete" action={() => props.dispatch({ type: "DELETE_SELECTED" })} />
        <PosBtn text="Delete All" action={() => props.dispatch({ type: "DELETE_ORDER" })} />
        <PosBtn text="Quantity" />
        <PosBtn text="Order Lookup" />
        <PosBtn text="Customer Lookup" />
        <PosBtn text="repeat" />
        <PosBtn text="Crew Functions" />
        <PosBtn text="MGR Functions" />
        <PosBtn text="Open Orders" />
      </div>

      {/* Group 2 */}
      <div className="col-span-3 grid grid-cols-6 gap-1 text-sm text-white">
        <PosBtn text="Comment" action={() => props.dispatch({ type: "SET_MAIN_VIEW", data: "Comments" })} />
        <PosBtn text="Discount" action={() => props.dispatch({ type: "SET_MAIN_VIEW", data: "Discounts" })} />
        <PosBtn text="CallIn" />
        <PosBtn text="WalkIn" action={() => props.dispatch({ type: "OPEN_KEYBOARD", data: "SET_ORDER_NAME" })} />
        <PosBtn text="Tender" />
        <PosBtn className="close-btn text-white" text="Close" action={() => { router.push("/pos") }} />
      </div>
    </>
  );
}

export default MenuActions;