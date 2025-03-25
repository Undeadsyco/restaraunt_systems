"use client"

// dependecies
import { useRouter } from "next/navigation";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
// components
import Form, { lockscreenFromValues } from "./form";

const validationSchema = yup.object({
  password: yup.string().min(8).max(10).matches(/^[0-9]+$/).required("Password is required"),
});

export default function LockScreen() {
  const router = useRouter()

  const onSubmit = async (values: lockscreenFromValues, actions: FormikHelpers<lockscreenFromValues>) => {
    try {
      const req = await axios.post("/api/pos", values);
      router.push('/pos/main');
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

  return <Formik initialValues={{ password: "" }} validationSchema={validationSchema} onSubmit={onSubmit} component={Form} />
}
