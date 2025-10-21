// Dependencies
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
// Components
import { Field } from "formik";
import { IconBtn } from "@/app/office/components";
// Icons
import { Check, Pen, Trash, X } from "lucide-react";
// Types
import { SetDeleteModalProps } from "@/app/office/components/deleteModal";
import { StateAction, SubmitFunction } from "@/types";

export const TH = ({ text }: { text: string }) => (
  <th className="border-b-2 border-green-800 h-full">
    <span className="inline-block w-[75%] bg-white rounded-full">{text}</span>
  </th>
);

export const TD = ({ className, id, form, editing }: { className?: string, id: string, form: string, editing: boolean }) => (
  <td>
    <label htmlFor={id}>
      <Field {...{
        form,
        className: `inline-block mx-auto w-2/3 rounded-full bg-white text-center ${className}`,
        id,
        name: id,
        disabled: !editing
      }} />
    </label>
  </td>
);

type DoughItemProps = {
  dough: DataBase.Menu.IDough;
  setList: StateAction<DataBase.Menu.IDough[]>;
  setModalProps: SetDeleteModalProps;
}

export const DoughItem = ({ dough, setList, setModalProps }: DoughItemProps) => {
  const [editing, setEditing] = useState(false);

  const onEdit: SubmitFunction<DataBase.Menu.IDough> = async (values, actions) => {
    try {
      const res = await axios.put(`/office/api/dough`, values)
      const data = await res.data;
      console.log("response", data);
      actions.resetForm({ values: data });
      setList(prev => {
        const match = prev.find(({ _id }) => _id === data._id);
        if (!match) return prev;
        return prev.toSpliced(prev.indexOf(match), 1, data)
      });
      setEditing(false);
      alert("Update was successful");
    } catch (error) {
      alert("Unable to update");
    }
  }

  return (
    <Formik initialValues={dough} onSubmit={onEdit} onReset={() => setEditing(false)}>
      {({ handleSubmit, handleReset }) => (
        <tr className="border-b-2 last:border-0 border-green-800">
          <td className="hidden"><Form id={`dough_form_${dough._id}`}></Form></td>
          <TD {...{ id: "name", form: `dough_form_${dough._id}`, editing }} />
          <TD {...{ id: "weight", form: `dough_form_${dough._id}`, editing }} />
          <TD {...{ id: "abbreviation", form: `dough_form_${dough._id}`, editing }} />
          <td>
            <span className="flex justify-evenly items-center bg-white w-1/2 mx-auto rounded-full">
              <IconBtn {...{
                className: "bordered p-1 aspect-square",
                onClick: editing ? handleReset : () => setEditing(true),
                Icon: editing ? X : Pen
              }} />
              <IconBtn {...{
                className: "bordered p-1 aspect-square",
                onClick: editing ? handleSubmit : () => setModalProps({ display: true, id: dough._id }),
                Icon: editing ? Check : Trash
              }} />
            </span>
          </td>
        </tr>
      )}
    </Formik>
  );
}