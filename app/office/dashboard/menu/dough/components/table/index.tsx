// Components
import { DoughItem, TH } from "./components";
// Types
import { SetDeleteModalProps } from "@/app/office/components/deleteModal";
import { StateAction, } from "@/types";

type TableProps = {
  dough: DataBase.Menu.IDough[];
  setModalProps: SetDeleteModalProps;
  setList: StateAction<DataBase.Menu.IDough[]>
}

export default function DoughTable({ dough, setList, setModalProps }: TableProps) {
  return (
    <table className="text-green-800 bg-green-400 border-green-800 col-span-10 col-start-2 row-span-7 row-start-2 text-center content-center">
      <colgroup span={1}>
        <col className="w-1/4 bordered border-green-800 text-center" />
        <col className="w-1/4 bordered border-green-800 text-center" />
        <col className="w-1/4 bordered border-green-800 text-center" />
        <col className="w-1/4 bordered border-green-800 text-center" />
      </colgroup>
      <thead className="h-[15%] text-2xl">
        <tr className="h-full">
          <TH text="Name" />
          <TH text="Weight" />
          <TH text="Abbreviation" />
          <TH text="Actions" />
        </tr>
      </thead>
      <tbody className="">
        {dough.map(dough => (
          <DoughItem key={dough._id} {...{ dough, setList, setModalProps }} />
        ))}
      </tbody>
    </table>
  )
}