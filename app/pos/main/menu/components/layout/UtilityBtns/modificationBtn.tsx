// Dependencies
import { useContext } from "react";
// Components
import { PosBtn } from "@/app/pos/components/buttons";
import { PosContext } from "@/utils/PosContext";
// Types
import type { BtnProps } from "@/types";

const ModificationBtn = ({ text }: BtnProps) => {
  const { dispatch } = useContext(PosContext)!;
  return (
    <PosBtn
      className="topping-modify-btn"
      text={text}
      onClick={() => dispatch({ type: "SET_MODIFICATION", data: text?.toLowerCase() })}
    />
  )
}

export default ModificationBtn;
