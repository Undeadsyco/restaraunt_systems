// Dependencies
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Field, Form, Formik, FormikConfig, FormikProps } from "formik";
// Components
import { Btn } from "@/app/components";
// Icons
import { CircleCheck, CircleX } from "lucide-react";
// type
import type { DoughFormValues } from "..";
import { SubmitFunction } from "@/types";
import axios from "axios";

type InputProps = { id: keyof Omit<DataBase.Menu.IDough, "_id">; className: string; }

const CustomInput = ({ id, className }: InputProps) => (
  <label className={`inline-flex h-full items-center justify-between ${className}`} htmlFor={id}>
    <span className="inline-block w-1/3 text-center font-bold text-2xl">
      {id.split("").map((l, i) => i === 0 ? l.toUpperCase() : l).join("")}:
    </span>
    <Field
      className="w-1/2 h-2/3 rounded-full px-2 text-center"
      type={id === "weight" ? "number" : "text"}
      name={id}
      id={id}
    />
  </label>
)

type Props = {
  setList: Dispatch<SetStateAction<DataBase.Menu.IDough[]>>
}

export default function DoughForm({ setList }: Props) {
  const onCreate: SubmitFunction<DoughFormValues> = async (values, actions) => {
    const res = await axios.post("/office/api/dough", values);
    const data = await res.data;
    if (res.status === 201) {
      setList(prev => [...prev, data]);
      actions.resetForm();
      alert("new dough item created");
    } else alert("Unable to create new dough item");
  }

  return (
    <div className="text-black bordered border-green-800 bg-green-400 col-span-10 col-start-2 row-start-10">
      <Formik initialValues={{ name: "", weight: 0, measurement: "OZ", abbreviation: "" }} onSubmit={onCreate}>
        {({ handleSubmit, handleReset }) => (
          <Form className="h-full flex justify-around items-center" autoComplete="off">
            <CustomInput {...{ id: "name", className: "w-1/5" }} />
            <CustomInput {...{ id: "weight", className: "w-1/5" }} />
            <CustomInput {...{ id: "abbreviation", className: "w-1/3" }} />
            <div className="w-[10%] h-2/3 bg-white rounded-full flex justify-evenly">
              <Btn type="reset" onClick={handleReset}>
                <CircleX size={32} color={"#166534"} />
              </Btn>
              <Btn type="submit" onClick={handleSubmit}>
                <CircleCheck size={32} color={"#166534"} />
              </Btn>
            </div>
          </Form >
        )}
      </Formik>
    </div >
  )
}