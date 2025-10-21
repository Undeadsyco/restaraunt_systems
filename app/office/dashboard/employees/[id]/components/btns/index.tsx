import { FormikErrors } from "formik"
import { Dispatch, SetStateAction } from "react";
import ShowErrorsBtn from "./showErrorsBtn";
import BackBtn from "./backBtn";
import CancelBtn from "./cancelBtn";
import SubmitBtn from "./submitBtn";
import EditBtn from "./editBtn";

type BtnContainerProps = {
  errors: FormikErrors<DataBase.People.IEmployee>;
  editing: boolean;
  showErrorModal: Dispatch<SetStateAction<boolean>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleReset: () => void;
  handleSubmit: () => void;
}

const BtnContainer = ({ errors, editing, showErrorModal, setEditing, handleReset, handleSubmit }: BtnContainerProps) => (
  <div className="row-start-12 col-span-full grid grid-cols-subgrid gap-x-8">
    {/* Error Btn */}
    {Object.keys(errors).length > 0 && <ShowErrorsBtn {...{ showErrorModal }} />}
    {
      editing
        ? <BackBtn {...{ editing, setEditing, handleReset }} />
        : <CancelBtn />
    }
    {
      editing
        ? <SubmitBtn {...{ setEditing, handleSubmit }} />
        : <EditBtn {...{ setEditing }} />
    }
  </div>
);

export default BtnContainer;
