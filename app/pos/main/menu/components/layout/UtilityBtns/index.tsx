"use client"
// Dependencies
import { useContext } from "react";
import { v4 } from "uuid";
// Components
import { PosBtn } from "@/app/pos/components/buttons";
import { PosContext } from "@/utils/PosContext";
import ModificationBtn from "./modificationBtn";
import SizeChangeBtn from "./changeSizeBtn";

const UtilityBtns = () => {
  const { dispatch } = useContext(PosContext)!;

  return (
    <div className="row-span-3 col-span-2 grid grid-cols-2 grid-rows-3 gap-x-1 gap-y-3">
      {/* Less/Extra Modification Btns */}
      <>
        <ModificationBtn text="Less" />
        <ModificationBtn text="Extra" />
      </>

      {/* Pizza Size Adjust Btns */}
      <>
        <SizeChangeBtn text="Down" />
        <SizeChangeBtn text="Up" />
      </>

      {/* Order Action Btns */}
      <>
        <PosBtn
          className="order-action-btn"
          text="Add To Order"
          onClick={() => dispatch({ type: "CREATE_ITEM" })}
        />
        <PosBtn
          className="order-action-btn"
          text="Send Order"
        // onClick={() => { }}
        />
      </>
    </div>
  );
}

export default UtilityBtns;
