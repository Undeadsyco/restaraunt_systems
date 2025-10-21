// Dependencies
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
// Components
import { IconBtn } from "@/app/office/components";
// Icons
import { ArrowRight, Check, Pen, Trash, X } from "lucide-react";
import { SetDeleteModalProps } from "@/app/office/components/deleteModal";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";



type Props = {
  section: DataBase.Menu.ISection;
  setModalProps: SetDeleteModalProps;
};

const SectionItem = ({ section: { _id, name, pizzas }, setModalProps }: Props) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  return (
    <Formik initialValues={{ _id, name, pizzas }} onSubmit={() => { }} onReset={() => setEditing(false)}>
      {({ handleReset }) => (
        <tr className="h-10">
          <td className="hidden"><Form id={`section_form_${_id}`}></Form></td>
          <td className=" border-t-2 border-r-2 border-black">
            <label htmlFor="name">
              <Field className="inline-block text-center rounded-full bg-white py-1" name="name" id="name" disabled={!editing} />
            </label>
          </td>
          <td className=" border-t-2 border-r-2 border-black">
            <span className="inline-block w-2/3 rounded-full bg-white py-1">{pizzas.length}</span>
          </td>
          <td className=" border-t-2 border-black">
            <span className="flex justify-around w-2/3 mx-auto bg-white rounded-full py-1">
              {!editing && <IconBtn {...{ Icon: Pen, onClick: () => setEditing(true) }} />}
              {!editing && <IconBtn {...{ Icon: Trash, onClick: () => setModalProps({ display: true, id: _id }) }} />}
              {!editing && <IconBtn {...{ Icon: ArrowRight, onClick: () => router.push(`pizza?section=${name}`) }} />}
              {editing && <IconBtn {...{ Icon: X, onClick: handleReset }} />}
              {editing && <IconBtn {...{ Icon: Check, onClick: () => { } }} />}
            </span>
          </td>
        </tr>
      )}
    </Formik>
  )
}

export default SectionItem;
