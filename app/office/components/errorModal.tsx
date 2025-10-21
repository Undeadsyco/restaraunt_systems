// Dependencies
import { Btn, Modal } from "@/app/components";
// Types
import type { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
  className: string;
  onClose: () => void;
}

const ErrorModal = ({ children, className, onClose }: Props) => (
  <Modal>
    <div className={`${className} bg-white bordered flex flex-col justify-between items-center p-6`}>
      <h3 className="text-3xl font-bold text-red-500 w-full text-center">Errors</h3>
      <div className="w-full h-[60%] flex flex-col items-center text-xl text-black">
        {children}
      </div>
      <div>
        <Btn {...{ className: "bordered p-1 px-4", text: "Close", onClick: onClose }} />
      </div>
    </div>
  </Modal>
);

export default ErrorModal;
