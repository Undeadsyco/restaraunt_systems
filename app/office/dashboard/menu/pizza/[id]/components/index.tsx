"use client"
// Dependencies
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useParams } from "next/navigation";
// Components
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { ErrorModal } from "@/app/office/components";
import BtnContainer from "./btnContainer";
import GeneralFields from "./generalFields";
import PricesField from "./pricesField";
import ToppingField from "./toppingFeild";
// Types
import type { Data } from "../page";

type FormikFunction = (values: DataBase.Menu.IPizza, actions: FormikHelpers<DataBase.Menu.IPizza>) => void;

export default function PizzaForm({ pizza, sections, dough, toppings }: Data) {
  const { id } = useParams();
  const [editing, setEditing] = useState(id === "new" ? true : false);
  const [modalDisplay, setModalDisplay] = useState(false);

  const updatePizza: FormikFunction = async (values, actions) => {
    actions.setSubmitting(true);
    const req = await axios.put("/office/api/pizza", values);
    const res = await req.data;

    if (req.status === 200) {
      actions.resetForm(res);
      alert("Update was successful");
    }
    actions.setSubmitting(false);
    setEditing(false);
  }

  const createPizza: FormikFunction = async (values, actions) => {
    try {
      actions.setSubmitting(true);
      const req = await axios.post("/office/api/pizza", values);
      const res = await req.data;

      alert("Pizza was created successfully");
      actions.resetForm({ values: res });
      setEditing(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = await error.response?.data;
        for (const err of data.errors) {
          actions.setFieldError(err.path, err.message);
        }
        setModalDisplay(true);
      }
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <>
      <Formik initialValues={pizza} onSubmit={id !== "new" ? updatePizza : createPizza} onReset={() => setEditing(false)}>
        {({ values, errors, handleReset, handleSubmit }) => (
          <Form id="pizza" className="bordered rounded-lg col-span-full row-span-full flex flex-col justify-between bg-green-400" autoComplete="off">
            <GeneralFields {...{ sections, editing }} />
            <ToppingField {...{ values, dough, toppings, editing }} />
            <PricesField {...{ values, dough, editing }} />
            <BtnContainer {...{ editing, setEditing, handleReset, handleSubmit }} />
            {modalDisplay && (
              <ErrorModal className="w-1/3 h-3/5" onClose={() => setModalDisplay(false)}>
                {errors.name && (
                  <ErrorMessage name="name" component="div" className="text-center mb-2" />
                )}
                {errors.section && (
                  <ErrorMessage name="section" component="div" className="text-center mb-2" />
                )}
                {errors.toppings && (
                  <ErrorMessage name="toppings" component="div" className="text-center mb-2" />
                )}
                {errors.prices && (
                  <ErrorMessage name="prices" component="div" className="text-center mb-2" />
                )}
              </ErrorModal>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}