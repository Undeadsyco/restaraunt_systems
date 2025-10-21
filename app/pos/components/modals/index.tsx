"use client"
import { useContext } from "react";
import { PosBtn } from "../buttons";
import { ErrorBox, PosKeyBoard, PosNumberPad } from "./views";
import { PosContext } from "@/utils/PosContext";

const Modal = () => {
  const { state, dispatch } = useContext(PosContext)!;
  const { modal: { open, err, numberpad, keyboard } } = state;

  return (
    <div className={`${open ? "block" : "hidden"} absolute w-screen h-screen top-0 left-0 flex justify-center items-center z-10 before:content-[""] before:absolute before:w-screen before:h-screen before:bg-black before:opacity-85 before:-z-10`}>
      {err.display && <ErrorBox />}

      {keyboard.display && <PosKeyBoard />}

      {numberpad.display && <PosNumberPad />}
    </div>
  )
}

export default Modal;
