"use client"

import { MouseEventHandler, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import { NumberPad } from "@/app/components";
import { PosBtn } from "../components/buttons";
import { object, ref, string } from "yup";
import axios from "axios";
import { PosContext } from "@/utils/PosContext";

type FormValues = {
  password: string;
  confirmPassword: string;
}

const validationSchema = object().shape({
  password: string().required().min(4, "Password must be at least 4 numbers long").max(6, "Passowrd cannot be more than 6 numbers long"),
  confirmPassword: string().required().oneOf([ref("password"), ""], "Password must match"),
})

type PageProps = {
  id: string;
  onChange: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

const Page = ({ id, onCancel, onChange, onSubmit }: PageProps) => (
  <label className="inline-flex flex-col justify-between w-full h-[90%]" htmlFor={id}>
    <Field className="bordered rounded-full w-full h-1/6 text-center" id={id} name={id} type="password" readOnly />

    <NumberPad {...{
      className: "bordered h-4/5",
      CustomBtn: PosBtn,
      onCancel,
      onChange,
      onSubmit
    }} />
  </label>
)

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const { dispatch } = useContext(PosContext);
  const [visible, toggleVisible] = useState(false);
  const [page, nextPage] = useState(0);

  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log(values);
    axios.post(`/pos/api/employees/${searchParams.get("id")}`, values).then(res => {
      dispatch({ type: "SET_USER", data: res.data });
      return;
    }).then(() => router.push("/pos/time_punch"));
  }

  return (
    <div className="span-full subgrid text-black">
      <PosBtn {...{
        className: "col-span-2 col-start-6 mt-3 w-3/5 close-btn text-white justify-self-center",
        text: "Back",
        onClick: () => router.back()
      }} />
      {/* */}
      <Formik {...{
        initialValues: { password: "", confirmPassword: "" },
        validationSchema,
        onSubmit
      }} >
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form className="bordered relative bg-white col-span-4 col-start-5 row-span-9 row-start-3 p-4 pt-0" >
            <h2 className="flex-center w-full h-[10%] text-2xl font-bold">
              Reset Password
            </h2>
            {page === 0 && (
              <Page {...{
                id: "password",
                onChange: (e) => setFieldValue("password", `${values.password}${e.currentTarget.children[0].innerHTML}`),
                onCancel: () => setFieldValue("password", ""),
                onSubmit: () => {
                  if (touched.password && errors.password) toggleVisible(true);
                  else nextPage(1);
                }
              }} />
            )}
            {page === 1 && (
              <Page {...{
                id: "confirmPassword",
                onChange: (e) => setFieldValue("confirmPassword", `${values.confirmPassword}${e.currentTarget.children[0].innerHTML}`),
                onCancel: () => setFieldValue("confirmPassword", ""),
                onSubmit: () => {
                  if (touched.confirmPassword && errors.confirmPassword) toggleVisible(true);
                  else handleSubmit();
                }
              }} />
            )}
            {visible && (
              <div className="absolute w-full h-full bg-white top-0 left-0 bordered flex-center flex-col justify-between py-4">
                <h4 className="w-full flex-center text-red-500 text-2xl font-bold">Errors</h4>
                <div className="h-[75%] w-full">
                  <ErrorMessage name="password" component="div" />
                  <ErrorMessage name="comfirmPassword" component="div" />
                </div>
                <PosBtn className="close-btn px-4 py-1 text-white" text="Close" onClick={() => toggleVisible(false)} />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}