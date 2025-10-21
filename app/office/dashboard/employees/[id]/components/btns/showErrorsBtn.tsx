import { Dispatch, SetStateAction } from "react";
import { Btn } from "@/app/components";

const ShowErrorsBtn = ({ showErrorModal }: { showErrorModal: Dispatch<SetStateAction<boolean>> }) => (
  <Btn {...{
    className: "rounded-full col-span-2 h-5/6 w-5/6 justify-self-center self-center bottom-2 left-2 bg-red-500 text-white",
    text: "Show Errors",
    onClick: () => showErrorModal(true)
  }} />
);

export default ShowErrorsBtn;
