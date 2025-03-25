import { Btn } from "@/components/global"
import { EventHandler, MouseEventHandler } from "react";
import { PosBtn } from "../pos/components/buttons";
import { v4 } from "uuid";

type KeyPadProps = {
  CustumBtn: typeof Btn;
  className: string;
  onChange: MouseEventHandler<HTMLButtonElement>
  onSubmit: MouseEventHandler<HTMLButtonElement>
  onCancel: MouseEventHandler<HTMLButtonElement>
}

const KeyPad = ({ CustumBtn, className, onChange, onSubmit, onCancel }: KeyPadProps) => (
  <div className={`p-2 pb-4 grid grid-rows-6 gap-3 rounded-2xl ${className}`}>
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <CustumBtn key={v4()} className="aspect-video" text={i.toString()} action={onChange} />
      ))}
    </div>
    <div className="h-full grid grid-cols-10 gap-1">
      {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(letter => (
        <CustumBtn key={v4()} className="aspect-video" text={letter} action={onChange} />
      ))}
    </div>
    <div className="w-[90%] h-full grid grid-cols-9 gap-1 place-self-center">
      {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(letter => (
        <CustumBtn key={v4()} className="aspect-video" text={letter} action={onChange} />
      ))}
    </div>
    <div className="h-full grid grid-cols-10 gap-1">
      {["/", "Z", "X", "C", "V", "B", "N", "M", "*", "!"].map(letter => (
        <CustumBtn key={v4()} className="aspect-video" text={letter} action={onChange} />
      ))}
    </div>
    <div className="w-[90%] h-full grid grid-cols-9 gap-1 place-self-center">
      <CustumBtn className="col-span-2" text="Clear" action={onChange} />
      <CustumBtn className="col-span-5" text="Space" action={onChange} />
      <CustumBtn className="col-span-2" text="Backspace" action={onChange} />
    </div>
    <div className="w-1/2 h-full place-self-center flex justify-around">
      <CustumBtn className="w-1/3" text="Cancel" action={onCancel} />
      <CustumBtn className="w-1/3" text="Accept" action={onSubmit} />
    </div>
  </div>
)

export default KeyPad;
