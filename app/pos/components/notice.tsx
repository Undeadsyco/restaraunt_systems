import { useContext } from "react";
import { PosContext } from "@/utils/PosContext"
import { PosBtn } from "./buttons";

const Notice = ({ message, onSubmit }: { message: string; onSubmit?: () => void; }) => {
  const { dispatch } = useContext(PosContext);

  return (
    <div className="w-1/3 h-1/3 bg-white bordered flex flex-col justify-around items-center text-black">
      <div className="text-3xl font-bold">Notice</div>
      <div className="text-xl w-2/3 text-center">{message}</div>
      <PosBtn {...{
        className: "px-6 py-2 close-btn text-white",
        text: "Close",
        onClick: () => onSubmit ? onSubmit() : dispatch({ type: "CLOSE_MODAL" })
      }} />
    </div>
  )
}

export default Notice;
