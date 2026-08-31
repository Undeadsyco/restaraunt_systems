"use client"

import { useContext } from "react";
import { PosBtn } from "./buttons";
import { PosContext } from "@/utils/PosContext";

const ErrorScreen = ({ message, onSubmit }: { message: string; onSubmit?: () => void; }) => {
  const { dispatch } = useContext(PosContext);

  return (
    <div className="w-1/3 h-1/3 bg-white bordered flex flex-col justify-around items-center text-black">
      <div className="text-3xl font-bold text-red-500">An Error Has Occured</div>
      <div className="text-xl w-2/3 text-center">{message}</div>
      <PosBtn {...{
        className: "px-6 py-2 close-btn text-white",
        text: "Close",
        onClick: () => onSubmit ? onSubmit() : dispatch({ type: "CLOSE_MODAL" })
      }} />
    </div>
  );
}

export default ErrorScreen;
