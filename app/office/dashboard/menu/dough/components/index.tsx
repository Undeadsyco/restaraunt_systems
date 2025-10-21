"use client"
// Dependencies
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
// Components
import { Btn, LinkBtn } from "@/app/components";
import DoughForm from "./form";
import DoughTable from "./table";
import { DeleteModal } from "@/app/office/components";
// Types
import type { FormikHelpers } from "formik"
import type { DeleteModalProps } from "@/app/office/components/deleteModal";
import { SubmitFunction } from "@/types";

export type DoughFormValues = {
  "name": string;
  "weight": number;
  "measurement": string;
  "abbreviation": string;
}

export default function DoughPage({ dough }: { dough: DataBase.Menu.IDough[] }) {
  const [list, setList] = useState(dough);
  const [{ display, id }, setModalProps] = useState<DeleteModalProps>({ display: false, id: "" });

  const onDelete = async () => {
    const req = await axios.delete(`/office/api/dough?id=${id}`);
    const data = await req.data;
    if (req.status === 200) {
      setList(prev => {
        const index = prev.findIndex(({ _id }) => _id === data.id);
        if (index > -1) return prev.toSpliced(index, 1);
        else return prev;
      });
      setModalProps({ display: false, id: "" });
      alert("Deletion Successful");
    }
    else alert("Unable to delete");
  }

  return (
    <>
      {display && <DeleteModal {...{ onClose: () => setModalProps({ display: false, id: "" }), onDelete }} />}
      <DoughTable {...{ dough: list, setList, setModalProps }} />
      <DoughForm {...{ setList }} />
      <div className="col-span-2 col-start-6 row-start-12 bg-green-400 bordered border-green-800 flex-center">
        <LinkBtn {...{
          className: "w-1/2 h-2/3 border-2 border-green-800 rounded-full text-green-800 bg-white",
          href: "/office/dashboard/menu",
          text: "Back",
        }} />
      </div>
    </>
  )
}