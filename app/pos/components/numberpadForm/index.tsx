"use client"
// Components
import { Field, Form, Formik } from "formik";
import NumberPad from "./numberPad";
import { PosBtn } from "../buttons";
// Types
import type { FormikFunction } from "@/types";
import type { ChangeEvent } from "react";

type Props = {
  value?: number;
  category: ("whole" | "partcial");
  onSubmit: FormikFunction<{ value: string, initial: boolean }>;
  onClose: () => void;
}
const NumberpadForm = ({ value, category, onSubmit, onClose }: Props) => {

  return (
    <div className="w-1/3 h-3/4 bg-white p-2">
      <Formik initialValues={value ? { value: value.toString(), initial: true } : { value: "0", initial: false }} onSubmit={onSubmit}>
        {({ values, handleSubmit, handleReset, setFieldValue }) => {
          const updateValue = (newVal: number) => {
            switch (category) {
              case "partcial": {
                if (values.initial) {
                  console.log("partial initial", newVal)
                  setFieldValue("value", (newVal / 100).toFixed(2));
                  setFieldValue("initial", false);
                } else setFieldValue("value", ((Number(values.value) * 10) + (newVal / 100)).toFixed(2));
                break;
              }
              case "whole": {
                if (values.initial) {
                  setFieldValue("value", newVal);
                  setFieldValue("initial", false);
                } else setFieldValue("value", (Number(values.value) * 10) + newVal);
                break;
              }
            }
          }
          return (
            <Form className={`w-full h-[90%] bordered rounded-2xl p-2 pb-4 flex flex-col justify-between items-center text-black`}>
              <label htmlFor="value" className="inline-flex bordered rounded-full pl-2 w-full h-12 justify-between items-center">
                <span className="text-black text-xl font-bold">Value:</span>
                <Field
                  type="string"
                  name="value"
                  id="value"
                  value={values.value}
                  className="focus:outline-none bordered border-y-0 rounded-full h-full w-4/5 text-center"
                />
              </label>
              <NumberPad {...{
                className: "h-3/4 w-full",
                CustomBtn: PosBtn,
                onChange: (e) => updateValue(parseInt(e.currentTarget.children[0].innerHTML)),
                onSubmit: () => handleSubmit(),
                onCancel: () => handleReset(),
              }} />
            </Form>
          )
        }}
      </Formik>
      <PosBtn {...{ text: "Close", className: "close-btn px-4 py-2", onClick: onClose }} />
    </div>
  );
}

export default NumberpadForm;
