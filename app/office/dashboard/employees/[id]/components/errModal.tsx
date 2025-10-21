import { Btn } from "@/app/components";
import { ErrorMessage } from "formik";
import { Dispatch, SetStateAction } from "react";

type ErrorItemProps = { id: string, value: string }

const baseStyles = "absolute w-full h-full flex justify-center items-center z-10";
const beforeStyles = "before:content-[' '] before:absolute before:w-full before:h-full before:bg-black before:opacity-70 before:-z-10";

const ErrorItem = ({ id, value }: ErrorItemProps) => (
  <div className="bg-blue-400 flex justify-evenly ">
    <span className="font-semibold">{id}:</span>
    <span>{value}</span>
  </div>
)

const ErrorModal = ({ errors, showErrorModal }: { errors: any, showErrorModal: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className={`${baseStyles} ${beforeStyles}`}>
      <div className="w-1/2 h-2/3 bg-white rounded-3xl flex flex-col p-4 justify-between">
        <h2 className="block font-bold text-2xl text-red-500 text-center w-full">Errors:</h2>
        <div className="h-2/3 self-center w-3/5 text-lg">
          <ErrorMessage name="name" render={msg => <ErrorItem {...{ id: "Name", value: msg }} />} />
          <ErrorMessage name="age" render={msg => <ErrorItem {...{ id: "Age", value: msg }} />} />
          <ErrorMessage name="number" render={msg => <ErrorItem {...{ id: "Number", value: msg }} />} />
          <ErrorMessage name="birthdate" render={msg => <ErrorItem {...{ id: "Birth Date", value: msg }} />} />
          <ErrorMessage name="address.street" render={msg => <ErrorItem {...{ id: "Street", value: msg }} />} />
          <ErrorMessage name="address.city" render={msg => <ErrorItem {...{ id: "City", value: msg }} />} />
          <ErrorMessage name="address.state" render={msg => <ErrorItem {...{ id: "State", value: msg }} />} />
          <ErrorMessage name="address.zip" render={msg => <ErrorItem {...{ id: "Zip", value: msg }} />} />
          <ErrorMessage name="employment.position" render={msg => <ErrorItem {...{ id: "position", value: msg }} />} />
          <ErrorMessage name="employment.pay_rate" render={msg => <ErrorItem {...{ id: "Pay Rate", value: msg }} />} />
        </div>
        <Btn className="py-2 px-4 w-1/4 rounded-full bg-red-500 text-white self-center" text="Close" onClick={() => showErrorModal(false)} />
      </div>
    </div>
  );
}

export default ErrorModal;
