// Dependencies
import axios, { AxiosError } from "axios";
import { useState } from "react";
// Components
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IconBtn } from "@/app/office/components";
import { Btn, Modal } from "@/app/components";
// Icons
import { Plus, Undo } from "lucide-react";
// Types
import type { Dispatch, SetStateAction } from "react";
import type { FormikHelpers } from "formik";
import ErrorModal from "@/app/office/components/errorModal";

type FormValues = { name: string }

type Props = {
  setList: Dispatch<SetStateAction<DataBase.Menu.ISection[]>>
}

const SectionForm = ({ setList }: Props) => {
  const [modalDisplay, setModalDisplay] = useState(false);

  const onAdd = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      actions.setSubmitting(true);
      const res = await (await axios.post("/office/api/section", { name: values.name })).data;
      setList(prev => [...prev, res]);
      alert("Section created successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.errors;
        for (const err of errors) {
          actions.setFieldError(err.type, err.message);
          setModalDisplay(true);
        }
        return;
      }
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Formik initialValues={{ name: "" }} onSubmit={onAdd}>
      {({ errors, isSubmitting, handleSubmit, handleReset }) => (
        <Form autoComplete="off" className="col-span-4 col-start-5 row-start-9 row-span-2 bordered flex flex-wrap justify-between items-center bg-green-400 px-2">
          <h3 className="w-full text-center ">
            <span className="inline-block w-1/2 p-1 bg-white bordered">Add A New Section</span>
          </h3>
          <label className="inline-flex justify-between items-center w-3/4" htmlFor="name">
            <Field className="bordered p-1 px-2 text-center" name="name" id="name" placeHolder="name" />
          </label>
          <span className="w-1/4 flex justify-around items-center bg-white p-1 bordered">
            <IconBtn {...{ disabled: isSubmitting, onClick: handleReset, Icon: Undo }} />
            <IconBtn {...{ disabled: isSubmitting, onClick: handleSubmit, Icon: Plus }} />
          </span>
          {modalDisplay && (
            <ErrorModal className="w-1/3 h-1/3" onClose={() => setModalDisplay(false)} >
              {errors.name && (
                <ErrorMessage name="name" component="span" className="" />
              )}
            </ErrorModal>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default SectionForm;
