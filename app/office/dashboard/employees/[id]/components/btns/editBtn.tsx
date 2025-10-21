import { Dispatch, SetStateAction } from "react";
import { Btn } from "@/app/components";

const EditBtn = ({ setEditing }: { setEditing: Dispatch<SetStateAction<boolean>> }) => (
  <Btn {...{
    className: "col-start-7 col-span-2 border-2 border-black rounded-full",
    text: "Edit",
    onClick: () => setEditing(true),
  }} />
);

export default EditBtn;
