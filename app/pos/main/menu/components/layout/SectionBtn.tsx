"use client"
import { PosBtn } from "@/app/pos/components/buttons";
import { PosContext } from "@/utils/PosContext";
import { useContext } from "react";

export default function SectionBtn({ _id, name }: DataBase.Menu.ISection) {
  const { dispatch } = useContext(PosContext);

  return (
    <PosBtn {...{ text: name, className: "size-btn", onClick: () => dispatch({ type: "SET_SECTION", data: _id }) }} />
  )
}