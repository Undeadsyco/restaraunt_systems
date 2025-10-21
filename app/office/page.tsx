"use client"

// dependencies
import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
// Context
import { OfficeContext } from "../../utils/OfficeContext";
// components
import { Form, Formik } from "formik";
import { CustomField, FormBtn } from "./components";
import { Btn } from "../components";
// Icons
import { Eye, EyeOff } from "lucide-react";
// Types
import type { FormikHelpers, FormikValues } from "formik";

type FormValues = { username: string; password: string; }

const BackOfficeSystem = () => {
  const router = useRouter();
  const { dispatch } = useContext(OfficeContext);
  const [visible, toggleVisible] = useState(false);


  const handleSubmit = (values: FormikValues, actions: FormikHelpers<FormValues>) => {
    actions.setSubmitting(true);
    axios.post("/office/api", values).then(res => {
      if (res.status !== 200) return;
      dispatch({ type: "SET_USER", data: res.data });
      actions.setSubmitting(false);
      return res.data;
    }).then((employee) => {
      if (new Date(employee.reset_date) < new Date()) router.push("/office/password_reset");
      else router.push("/office/dashboard");
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="bg-green-600 border-4 border-green-800 row-start-3 row-span-8 col-start-4 col-span-6 rounded-2xl grid grid-cols-subgrid grid-rows-subgrid gap-4 p-4">
      <h1 className="col-span-full row-span-2 font-extrabold text-2xl text-center">Office System Login</h1>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={handleSubmit}>
        {({ handleReset, handleSubmit }) => (
          <Form className="col-span-full row-span-6 border-2 border-black rounded-xl text-black flex flex-col justify-around items-center py-4 bg-gradient-to-br from-green-100 via-green-600 to-green-100 " autoComplete="off">
            <CustomField id="username" name="Username" placeholder="Username" />
            <CustomField id="password" name="Password" type={visible ? "text" : "password"} placeholder="Password">
              <Btn className="absolute right-2" onMouseDown={() => toggleVisible(true)} onMouseUp={() => toggleVisible(false)}>
                {visible
                  ? <EyeOff color="green" />
                  : <Eye color="green" />
                }
              </Btn>
            </CustomField>
            <div className="flex justify-around w-3/5">
              <FormBtn type="reset" onClick={() => handleReset()} />
              <FormBtn type="submit" onClick={(e) => handleSubmit()} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default BackOfficeSystem;
