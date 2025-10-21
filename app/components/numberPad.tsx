import { MouseEventHandler } from "react";
import { Btn } from "@/app/components/";

type numberPadProps = {
  className: string;
  CustomBtn?: typeof Btn;
  onChange: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
};

const NumberPad = ({ className, CustomBtn, onChange, onCancel, onSubmit }: numberPadProps) => (
  <div className={`grid grid-cols-3 grid-rows-4 gap-x-2 gap-y-4 border-none ${className}`}>
    {Array.from({ length: 9 }, (_, i) => (CustomBtn
      ? <CustomBtn key={i} text={`${i + 1}`} onClick={onChange} />
      : <Btn key={i} text={`${i + 1}`} onClick={onChange} />
    ))}
    {CustomBtn
      ? <CustomBtn type="reset" text="Cancel" onClick={onCancel} />
      : < Btn type="reset" text="Cancel" onClick={onCancel} />
    }
    {CustomBtn
      ? <CustomBtn text="0" onClick={onChange} />
      : < Btn text="0" onClick={onChange} />
    }
    {CustomBtn
      ? <CustomBtn type="submit" text="OK" onClick={onSubmit} />
      : < Btn type="submit" text="OK" onClick={onSubmit} />
    }
  </div>
);

export default NumberPad;