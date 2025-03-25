import { NumberPad } from "@/app/components";
import { PosBtn } from "@/app/pos/components/buttons";
import { ErrorMessage, Form, Field, FormikConfig, FormikProps } from "formik";
import { MouseEvent } from "react";

export type lockscreenFromValues = { password: string }

const CustomForm = ({
  touched,
  errors,
  values,
  handleReset,
  handleSubmit,
  setFieldValue,
  setFieldError,
}: FormikProps<lockscreenFromValues>) => (
  <Form className=" w-1/3 h-3/5 flex flex-wrap justify-center p-2">
    <Field
      className="bordered h-1/5 w-2/3 mx-auto mb-2 rounded-xl text-black text-center"
      type="password"
      id="password"
      name="password"
      value={values.password}
      readOnly
    />

    <NumberPad
      className="bordered w-full h-5/6"
      onChange={(e: MouseEvent<HTMLButtonElement>) => {
        const input = e.currentTarget.children[0].innerHTML;
        setFieldValue("password", `${values.password}${input}`);
      }}
      onCancel={handleReset}
      onSubmit={() => { handleSubmit() }}
      CustomBtn={PosBtn}
    />

    <div className={`${touched.password && errors.password ? "block" : "hidden"} absolute w-screen h-screen top-0 flex items-center justify-center z-10 before:content-[""] before:w-screen before:h-screen before:absolute before:-z-10 before:bg-slate-800 before:opacity-80`}>
      <div className="bg-white h-1/3 w-1/4 rounded-3xl px-2 py-6 flex flex-col items-center justify-around">
        <ErrorMessage name="password" render={() => (
          <p className={`text-red-500 text-center font-extrabold text-xl`}>
            {errors.password}
          </p>
        )} />
        <PosBtn className="w-1/3 h-12 bg-red-500" text="Close" action={() => setFieldError("password", "")} />
      </div>
    </div>
  </Form>
);

export default CustomForm;