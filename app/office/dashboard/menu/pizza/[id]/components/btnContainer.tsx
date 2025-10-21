// Dependencies
import { Dispatch, FormEvent, SetStateAction, SyntheticEvent } from "react";
import { useParams, useRouter } from "next/navigation";
// Components
import { Btn } from "@/app/components";

type Props = {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleReset: (e?: SyntheticEvent<any, Event> | undefined) => void;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void
}

const BtnContainer = ({ editing, setEditing, handleReset, handleSubmit }: Props) => {
  const { id } = useParams();
  const router = useRouter();

  const onGoBack = () => {
    router.back();
    router.refresh();
  }

  return (
    <div className="flex-center items center pb-2">
      <div className="w-1/4 flex justify-between">
        <Btn {...{
          className: "bordered px-6 bg-white",
          text: editing ? "Cancel" : "Back",
          onClick: editing ? handleReset : onGoBack,
        }} />
        <Btn {...{
          className: "bordered px-6 bg-white",
          text: editing ? "Submit" : "Edit",
          onClick: editing ? handleSubmit : () => setEditing(true)
        }} />
      </div>
    </div>
  )
}

export default BtnContainer;
