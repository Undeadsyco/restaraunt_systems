import { MouseEventHandler } from "react";
import { Btn } from "@/components/global";

type numberPadProps = {
  className: string;
  CustomBtn?: typeof Btn;
  onChange: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
};

const NumberPad = ({ className, CustomBtn, onChange, onCancel, onSubmit }: numberPadProps) => (
  <div className={`grid grid-cols-3 grid-rows-4 gap-x-2 gap-y-4 border-none ${className}`}>
    {Array.from({ length: 9 }, (_, i) => (
      CustomBtn ? <CustomBtn key={i} text={`${i + 1}`} action={onChange} /> :
        <Btn key={i} text={`${i + 1}`} action={onChange} />
    ))}
    {CustomBtn ? <CustomBtn type="reset" text="Cancel" action={onCancel} /> : < Btn type="reset" text="Cancel" action={onCancel} />}
    {CustomBtn ? <CustomBtn text="0" action={onChange} /> : < Btn text="0" action={onChange} />}
    {CustomBtn ? <CustomBtn type="submit" text="OK" action={onSubmit} /> : < Btn type="submit" text="OK" action={onSubmit} />}
  </div>
);

export default NumberPad;