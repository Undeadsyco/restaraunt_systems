import { Btn } from "@/app/components";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type BackBtnProps = {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleReset: () => void;
}

const BackBtn = ({ editing, handleReset, setEditing }: BackBtnProps) => {
  const router = useRouter();
  const { id } = useParams()

  return (
    <Btn {...{
      className: "col-start-5 col-span-2 border-2 border-black rounded-full",
      text: "Cancel",
      onClick: () => {
        if (editing) handleReset();
        if (id === "new") router.back();
        else setEditing(false);
      }
    }} />
  );
}

export default BackBtn;
