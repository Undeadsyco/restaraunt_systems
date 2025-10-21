// Dependencies
import { useState } from "react";
import axios, { AxiosError } from "axios";
// Components
import { Formik, Form, ErrorMessage } from "formik";
import { MeasurementField, NameField, PriceField, TypeField } from "./fields";
import { Btn, Modal } from "@/app/components";
import { IconBtn } from "@/app/office/components";
// Icons
import { Plus, Undo } from "lucide-react";
// Types
import type { Dispatch, SetStateAction, } from "react"
import type { FormikHelpers } from "formik";
import ErrorModal from "@/app/office/components/errorModal";

type Values = Omit<DataBase.Menu.ITopping, "_id">;
type Props = {
  setList: Dispatch<SetStateAction<DataBase.Menu.ITopping[]>>
}

const AddToppingForm = ({ setList }: Props) => {
  const [modal, toggleModal] = useState(false);

  const onCreate = async (values: Values, actions: FormikHelpers<Values>) => {
    try {
      actions.setSubmitting(true);
      const res = await (await axios.post("/office/api/topping", values)).data;
      setList(prev => [...prev, res]);
      actions.resetForm();
      alert("New topping created");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = await error.response?.data.errors;
        for (const err of errors) {
          actions.setFieldError(err.type, err.message);
        }
        toggleModal(true);
      }
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Formik initialValues={{ name: "", type: "", measurement: "", price: 0 }} onSubmit={onCreate}>
      {({ errors, handleReset, handleSubmit }) => (
        <Form className="bordered rounded-b-none col-span-full row-start-10 row-span-2 p-2">
          <div className="bg-green-400 w-full h-full flex flex-wrap items-center justify-between bordered px-4">
            <h3 className="w-full text-center">
              <span className="bordered bg-white px-6 py-1">Add New Topping</span>
            </h3>
            <NameField className="w-[200px] h-7" />
            <TypeField />
            <MeasurementField />
            <label htmlFor="price" className="bordered inline-flex justify-between pl-2 w-32 h-7 bg-white">
              <span>Price:</span>
              <PriceField className="w-1/2 text-center" />
            </label>
            <div className="w-24 flex justify-between bordered bg-white px-2">
              <IconBtn onClick={() => handleReset()} Icon={Undo} />
              <IconBtn onClick={() => handleSubmit()} Icon={Plus} />
            </div>
            {modal && (
              <ErrorModal className="w-1/3 h-1/2" onClose={() => toggleModal(false)}>
                {errors.name && (
                  <ErrorMessage name="name" component={"span"} className="h-[30px] mb-5" />
                )}
                {errors.type && (
                  <ErrorMessage name="type" component={"span"} className="h-[30px] mb-5" />
                )}
                {errors.measurement && (
                  <ErrorMessage name="measurement" component={"span"} className="h-[30px] mb-5" />
                )}
              </ErrorModal>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddToppingForm;
