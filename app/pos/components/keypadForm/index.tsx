"use client"
import { FormikFunction } from "@/types"
import { Field, Form, Formik } from "formik"
import KeyPad from "./KeyPad"
import { PosBtn } from "../buttons"

type Props = {
  onSubmit: FormikFunction<{ value: string }>
  onReset: FormikFunction<{ value: string }>
}

const KeypadForm = ({ onSubmit, onReset }: Props) => (
  <Formik initialValues={{ value: "" }} onSubmit={onSubmit} onReset={onReset}>
    {({ values: { value }, handleSubmit, handleReset, setFieldValue }) => (
      <Form className={`w-3/4 h-3/5 bg-white rounded-2xl p-2 pb-4 flex flex-col justify-between items-center text-black`}>
        <label htmlFor="value" className="inline-flex bordered rounded-full pl-6 w-3/4 h-12 justify-between items-center">
          <span className="text-black text-xl font-bold">Value:</span>
          <Field
            type="string"
            name="value"
            id="value"
            value={value}
            className="focus:outline-none bordered border-y-0 rounded-full h-full text-center w-4/5"
          />
        </label>
        <KeyPad {...{
          className: "w-full",
          CustumBtn: PosBtn,
          onSubmit: () => handleSubmit(),
          onChange: (e) => setFieldValue("value", `${value}${e.currentTarget.children[0].innerHTML}`),
          onCancel: () => handleReset(),
        }} />
      </Form>
    )}
  </Formik>
);

export default KeypadForm;
