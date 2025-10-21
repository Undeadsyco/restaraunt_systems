// Components
import { Btn } from "@/app/components";
// Types
import type { BtnProps } from "@/types";

const FormBtn = ({ type, onClick }: BtnProps) => (
  <Btn
    className="rounded-full p-2 w-2/5 bg-white border-4 border-green-800 text-green-800 text-lg font-bold"
    type={type}
    text={type?.split("").map((l, i) => i === 0 ? l.toUpperCase() : l).join("")}
    onClick={onClick}
  />
);

export default FormBtn;
