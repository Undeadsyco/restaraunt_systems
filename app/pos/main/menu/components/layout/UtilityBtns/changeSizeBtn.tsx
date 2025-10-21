// Dependencies
import { useContext } from "react";
// Components
import { PosBtn } from "@/app/pos/components/buttons";
import { PosContext } from "@/utils/PosContext";
// Types
import type { BtnProps } from "@/types";

const SizeChangeBtn = ({ text }: BtnProps) => {
  const { dispatch } = useContext(PosContext)!;
  return (
    <PosBtn
      className="change-size-btn"
      text={`${text} Size`}
      onClick={() => dispatch({ type: "CHANGE_SIZE", data: text?.toLowerCase() })}
    />
  )
}

export default SizeChangeBtn;
