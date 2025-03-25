"use client"
import { PosBtn } from "../buttons";
import { ErrorBox, PosKeyBoard, PosNumberPad } from "./views";

const Modal = (props: POS.Props.PosComponent) => {
  const { state: { modal: { open, err, numberpad, keyboard } } } = props;
  return (
    <div className={`${open ? "block" : "hidden"} absolute w-screen h-screen top-0 left-0 flex justify-center items-center z-10 before:content-[""] before:absolute before:w-screen before:h-screen before:bg-black before:opacity-85 before:-z-10`}>
      {err.display && <ErrorBox {...props} />}

      {keyboard.display && <PosKeyBoard {...props} />}

      {numberpad.display && <PosNumberPad {...props} />}
    </div>
  )
}

export default Modal;
