import { NumberPad } from "@/app/components";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { PosBtn } from "../../buttons";
import { PosContext } from "@/utils/PosContext";

const PosNumberPad = () => {
  const { state: { modal: { numberpad } }, dispatch } = useContext(PosContext)!;
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTitle(() => {
      switch (numberpad.action) {
        case "ADD_DISCOUNT": return "Discount"
        default: return ""
      }
    });
  }, [numberpad]);

  const handleValueChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    const digit = parseInt(e.currentTarget.children[0].textContent || e.currentTarget.textContent!);
    if (numberpad.type === "partcial") setValue((prev) => (prev * 10) + (digit / 100));
    else setValue((prev) => (prev * 10) + digit);
  }

  const handleSubmit = () => {
    let amount;
    if (numberpad.type === "percentage") amount = numberpad.amount * parseFloat((value/100).toFixed(2));
    else amount = value;
    dispatch({ type: numberpad.action, data: { name: numberpad.name, amount } })
  }

  const handleCancel = () => {
    setTitle("");
    setValue(0);
    dispatch({ type: "CLOSE_NUMBERPAD" })
  }

  return (
    <form className="bg-white w-[30%] h-[60%] p-2 pb-3 rounded-3xl">
      <h2 className="h-[10%] text-black">{title}: - {numberpad.name}</h2>

      <input
        className="inline-block h-[15%] w-full mb-2 border border-black rounded-full text-black text-center"
        type="number"
        id="value"
        name="value"
        value={value === 0 ? numberpad.amount : numberpad.type === "partcial" ? value.toFixed(2) : value}
        // ref={inputRef}
        readOnly
      />

      <NumberPad
        className="h-[70%]"
        CustomBtn={PosBtn}
        onSubmit={handleSubmit}
        onChange={handleValueChange}
        onCancel={handleCancel}
      />
    </form>
  )
}

export default PosNumberPad;
