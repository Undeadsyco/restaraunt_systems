import { ReactNode } from "react";

const modalStyles = "absolute w-full h-full z-10 flex-center top-0 left-0";
const modalBeforeStyles = "before:absolute before:w-full before:h-full before:-z-10 before:content-[' '] before:bg-black before:opacity-60 before:rounded-lg"

const Modal = ({ children }: { children: ReactNode | ReactNode[]}) => (
  <div className={`${modalStyles} ${modalBeforeStyles}`}>
    {children}
  </div>
);

export default Modal;
