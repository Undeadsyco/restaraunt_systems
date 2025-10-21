// Dependencies
import { Dispatch, SetStateAction, useState } from "react";
// Components
import { Form, Formik, FormikHelpers } from "formik";
import { MeasurementField, NameField, PriceField, TypeField } from "./fields";
import { IconBtn } from "@/app/office/components";
// Icons
import { Check, Pen, Trash, X } from "lucide-react";
// Types
import type { ModalProps } from ".";
import axios from "axios";

type Props = {
  topping: DataBase.Menu.ITopping;
  setList: Dispatch<SetStateAction<DataBase.Menu.ITopping[]>>;
  setModalProps: Dispatch<SetStateAction<ModalProps>>;
}

const EditToppingForm = ({ topping, setList, setModalProps }: Props) => {
  const [disabled, setDisabled] = useState(true);

  const onEdit = async (values: DataBase.Menu.ITopping, actions: FormikHelpers<DataBase.Menu.ITopping>) => {
    actions.setSubmitting(true);
    try {
      const req = await axios.put("/office/api/topping", values);
      const res = await req.data;
      setList(prev => {
        const i = prev.findIndex(t => t._id === res._id);
        if (i < 0) return prev;
        return prev.toSpliced(i, 1, res);
      });
      alert("topping updated successfully")
      actions.resetForm({ values: res });
    } catch (error) {
      alert("Something went wrong");
    } finally {
      actions.setSubmitting(false);
      setDisabled(true);
    }
  }

  return (
    <Formik initialValues={topping} onSubmit={onEdit} onReset={() => setDisabled(true)}>
      {({ values, handleSubmit, handleReset, isSubmitting }) => (
        <tr className="h-8 border-t-2 border-black bg-green-400">
          <td className="hidden"><Form id={`form-${values._id}`}></Form></td>
          <td><NameField disabled={disabled} /></td>
          <td><TypeField form={`form-${values._id}`} disabled={disabled} /></td>
          <td><MeasurementField form={`form-${values._id}`} disabled={disabled} /></td>
          <td>
            <span className="inline-block bordered pl-2 bg-white">
              $<PriceField form={`form-${values._id}`} disabled={disabled} />
            </span>
          </td>
          <td>
            <span className="inline-flex justify-around w-2/3 h-2/3 bordered bg-white">
              <IconBtn {...{
                disabled: isSubmitting,
                onClick: disabled ? () => setDisabled(false) : handleReset,
                Icon: disabled ? Pen : X,
              }} />
              <IconBtn {...{
                disabled: isSubmitting,
                onClick: disabled ? () => setModalProps({ display: true, id: topping._id }) : handleSubmit,
                Icon: disabled ? Trash : Check
              }} />
            </span>
          </td>
        </tr>
      )}
    </Formik>
  )
}

export default EditToppingForm;
