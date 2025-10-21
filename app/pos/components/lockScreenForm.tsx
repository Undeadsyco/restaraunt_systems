"use client"

// Dependencies
import axios, { AxiosError } from "axios";
import { MouseEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import { object, string } from "yup";
// Components
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { NumberPad } from "@/app/components";
import { PosBtn } from "./buttons";
// Context
import { PosContext } from "@/utils/PosContext";

export type lockscreenFromValues = { id: string; password: string; }

const validationSchema = object({
  id: string().length(4).required("ID is required"),
  password: string().min(4).max(6),
});

export default function LockScreenForm() {
  const { dispatch } = useContext(PosContext);
  const router = useRouter();

  const onSubmit = async (values: lockscreenFromValues, actions: FormikHelpers<lockscreenFromValues>) => {
    try {
      const req = await axios.post("/pos/api/employees", values);
      const data = await req.data;
      if (data.reset_password) {
        router.push(`/pos/password_reset?id=${values.id}`);
      } else {
        dispatch({ type: "SET_USER", data });
        if (data.employment.clocked_in) router.push('/pos/main/menu');
        else router.push("/pos/time_punch");
      }
    } catch (err) {
      if (typeof err === "string") {
        console.log(err);
        return;
      }
      if (err instanceof AxiosError) {
        actions.setFieldError("password", err.response?.data.message);
        return;
      }
      if (err instanceof Error) {
        console.log(`${err.name}${err.message}`);
        return;
      }
      console.log("there was an error");
      return;
    }
  }

  return (
    <Formik initialValues={{ id: "", password: "" }} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ touched, errors, values, handleReset, handleSubmit, setFieldValue, setFieldError }) => (
        <Form className=" w-1/3 h-3/5 flex flex-wrap justify-center p-2">
          <Field
            className="bordered h-1/5 w-2/3 mx-auto mb-2 rounded-xl text-black text-center"
            type="password"
            value={`${values.id}${values.password}`}
            readOnly
          />

          <NumberPad
            className="bordered w-full h-5/6"
            onChange={(e: MouseEvent<HTMLButtonElement>) => {
              const input = e.currentTarget.children[0].innerHTML;
              if (values.id.length === 4) {
                setFieldValue("password", `${values.password}${input}`);
              } else setFieldValue("id", `${values.id}${input}`);
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
              <PosBtn className="w-1/3 h-12 bg-red-500" text="Close" onClick={() => setFieldError("password", "")} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
} 
