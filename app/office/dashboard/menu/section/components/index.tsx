"use client"
// Dependencies
import { useState } from "react";
// Components
import SectionItem from "./item";
import SectionForm from "./form";
import { DeleteModal } from "@/app/office/components";
import { DeleteModalProps } from "@/app/office/components/deleteModal";
import axios from "axios";

const SectionContainer = ({ sections }: { sections: DataBase.Menu.ISection[] }) => {
  const [list, setList] = useState(sections);
  const [{ display, id }, setModalProps] = useState<DeleteModalProps>({ display: false, id: "" });

  const onDelete = async () => {
    try {
      const req = await axios.delete(`/office/api/section?id=${id}`);
      const res = await req.data;
      if (req.status !== 200) throw new Error("");
      setList(prev => {
        const index = prev.findIndex(s => s._id === res.id);
        if (index < 0) return prev;
        return prev.toSpliced(index, 1);
      });
      setModalProps({ display: false, id: "" });
      alert("Section deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {display && (
        <DeleteModal {...{
          onDelete,
          onClose: () => setModalProps({ display: false, id: "" })
        }} />
      )}
      <table className="col-span-6 col-start-4 row-start-2 border-separate border-spacing-0 bordered text-center content-center bg-green-400">
        <colgroup>
          <col className="w-1/2" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>
        <thead>
          <tr className="h-10">
            <th className=" border-b-2 border-r-2 border-black">
              <span className="inline-block w-2/3 bg-white rounded-full">Name</span>
            </th>
            <th className=" border-b-2 border-r-2 border-black">
              <span className="inline-block w-2/3 bg-white rounded-full">Pizza #</span>
            </th>
            <th className=" border-b-2 border-r-2 border-black">
              <span className="inline-block w-2/3 bg-white rounded-full">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map(section => (
            <SectionItem key={section._id} {...{ section, setModalProps }} />
          ))}
        </tbody>
      </table>
      <SectionForm {... { setList }} />
    </>
  )
}

export default SectionContainer;
