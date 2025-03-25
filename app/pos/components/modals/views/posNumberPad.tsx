import { NumberPad } from "@/app/components";
import { Formik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { PosBtn } from "../../buttons";

type FormValues = { type: ("whole" | "fractional"); value: number, title: string, name: string }

const PosNumberPadForm = ({ values, setFieldValue, handleSubmit, handleReset }: FormikProps<FormValues>) => {

  const calculateValue = (oldValue: number, newValue: number) => {
    switch (values.type) {
      case "whole": return (oldValue * 10) + newValue;
      case "fractional": return (oldValue * 10) + (newValue / 100);
    }
  }

  useEffect(() => {
    console.log(values);
  }, [values])

  return (
    <form className="bg-white w-[30%] h-[60%] p-2 pb-3 rounded-3xl">
      <h2 className="h-[10%] text-black">{values.title} {values.name}</h2>

      <input
        className="inline-block h-[15%] w-full mb-2 border border-black rounded-full text-black text-center"
        type="number"
        id="value"
        name="value"
        value={values.value}
        // ref={inputRef}
        readOnly
      />

      <NumberPad
        className="h-[70%]"
        CustomBtn={PosBtn}
        onSubmit={() => { }}
        onChange={(e) => {
          const value = e.currentTarget.children[0].textContent || e.currentTarget.textContent;

          setFieldValue("value", calculateValue(values.value, parseInt(value!)));
        }}
        onCancel={() => handleReset()}
      />
    </form>
  );
}

const PosNumberPad = ({ state, dispatch }: POS.Props.PosComponent) => {

  const setInitialValues = (): FormValues => {
    switch (state.modal.numberpad.action) {
      case "ADD_DISCOUNT":
        console.log("discount")
        return {
          type: state.modal.numberpad.type,
          value: 0,
          title: "Discount",
          name: state.modal.numberpad.data.name,
        }
      default: return {
        type: "whole",
        value: 0,
        title: "",
        name: "",
      }
    }
  }

  return (
    <Formik
      initialValues={setInitialValues()}
      onSubmit={() => { }}
      onReset={() => { dispatch({ type: "CLOSE_NUMBERPAD" }) }}
    >
      {(props) => <PosNumberPadForm {...props} />}
    </Formik>
  )
}

export default PosNumberPad;
