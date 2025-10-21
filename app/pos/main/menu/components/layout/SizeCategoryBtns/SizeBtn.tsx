"use client"
// Dependencies
import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
// Components
import { PosBtn } from "@/app/pos/components/buttons";
// Context
import { PosContext } from "@/utils/PosContext";

const SizeBtn = ({ size }: { size: DataBase.Menu.IDough; }) => {
  const { state, dispatch } = useContext(PosContext)!;
  const router = useRouter();
  const path = usePathname();

  return (
    <PosBtn
      className={`size-btn ${size._id === state.currentSize ? "pizza-size-btn-active" : ""}`}
      text={size.name}
      onClick={() => {
        dispatch({ type: "SET_SIZE", data: size._id });
        if (path !== "/pos/main/menu") router.push("/pos/main/menu");
      }}
    />
  )
}

export default SizeBtn;
