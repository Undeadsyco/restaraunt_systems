import { Btn } from "@/app/components";
import { Dispatch, SetStateAction } from "react";

type SubmitBtnProps = {
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
}

const SubmitBtn = ({ setEditing, handleSubmit }: SubmitBtnProps) => (
  <Btn {...{
    className: "col-start-7 col-span-2 border-2 border-black rounded-full",
    text: "Submit",
    onclick: () => {
      handleSubmit();
      setEditing(false)
    },
  }} />
);

export default SubmitBtn;
