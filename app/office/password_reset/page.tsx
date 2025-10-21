"use client"

// Dependencies
import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { object, string, ref } from "yup";
// Context
import { OfficeContext } from "@/utils/OfficeContext";
// Components
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Btn } from "@/app/components";
// Icons
import { EyeOff, Eye } from "lucide-react";

const valitationSchema = object().shape({
  currentPassword: string()
    .required("Must enter current Password"),
  newPassword: string()
    .required("Must enter a new Password")
    .min(8, "Passwords must be at least 8 characters long")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Pssowrd must include at least a uppercase letter, a lowercase letter, a number, and a special character"
    ),
  confirmPassword: string()
    .required("Must confirm new password")
    .oneOf([ref("newPassword"), ""], "Does not match new Password")
})

const CustomField = ({ name, id }: { name: string; id: string; }) => {
  const [visible, toggleVisible] = useState(false);
  return (
    <label htmlFor={id} className="inline-flex flex-col w-full border-2 border-b-0 border-black rounded-3xl h-[30%] justify-evenly bg-white">
      <span className="inline-flex w-full h-1/2 px-2 items-center">{name}:</span>
      <span className="relative inline-block w-full h-1/2 border-2 border-black rounded-full">
        <Field
          className="focus:outline-none w-full h-full rounded-full px-4"
          name={id}
          id={id}
          type={visible ? "text" : "password"}
        />
        <button className="absolute right-2 top-2" onMouseDown={() => toggleVisible(true)} onMouseUp={() => toggleVisible(false)}>
          {
            visible
              ? <EyeOff color="green" />
              : <Eye color="green" />
          }
        </button>
      </span>
    </label>
  )
}

const ResetOfficePasswordForm = () => {
  const router = useRouter();
  const { state: { user } } = useContext(OfficeContext);
  const [visible, toggleVisible] = useState(false);

  return (
    <Formik
      validationSchema={valitationSchema}
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={(values, actions) => {
        axios.post(`/office/api/employees/${user?._id}/password`, values)
          .then(res => {
            alert("Password has been reset");
            return;
          }).then(() => {
            router.push("/office/dashboard")
          });
      }}
    >
      {({ errors, handleReset, handleSubmit }) => {
        return (
          <div className="relative col-span-full row-span-full grid grid-rows-subgrid grid-cols-subgrid">
            <Form className="col-span-4 row-span-8 row-start-3 col-start-5 text-black border-2 border-black rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-br from-green-100 via-green-600 to-green-100">
              <h2 className="h-[10%] text-xl font-bold text-center">Reset Password</h2>
              <div className="h-[70%] flex flex-col justify-between">
                <CustomField id="currentPassword" name="Current Password" />
                <CustomField id="newPassword" name="New Password" />
                <CustomField id="confirmPassword" name="Confirm Password" />
              </div>
              <div className="h-[10%] flex justify-around">
                <Btn className="w-2/5 border-2 border-black rounded-full bg-white" text="Reset" onClick={() => handleReset()} />
                <Btn className="w-2/5 border-2 border-black rounded-full bg-white" text="Submit" onClick={() => {
                  if (Object.keys(errors).length > 0) {
                    toggleVisible(prev => !prev);
                  } else handleSubmit();
                }} />
              </div>
            </Form>
            {visible && (
              <div className="absolute w-full h-full z-0 flex items-center justify-center text-black before:absolute before:content-[' '] before:w-full before:h-full before:bg-black before:opacity-70">
                <div className="bg-white w-1/3 h-2/3 z-10 rounded-3xl p-2 flex flex-col items-center justify-between">
                  <h3 className="text-4xl font-extrabold text-center text-red-500">Errors</h3>
                  <div className="h-[80%] flex flex-col justify-evenly text-center">
                    <ErrorMessage name="currentPassword" component="div" />
                    <ErrorMessage name="newPassword" component="div" />
                    <ErrorMessage name="confirmPassword" component="div" />
                  </div>
                  <Btn className="border-2 border-black px-6 py-1 rounded-full" text="Close" onClick={() => toggleVisible(prev => !prev)} />
                </div>
              </div>
            )}
          </div>
        )
      }}
    </Formik>
  )
}

export default ResetOfficePasswordForm;
