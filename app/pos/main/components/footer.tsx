"use client"
// Dependencies
import { useContext } from "react";
// Components
import DateTime from "@/app/components/dateTime";
import { PosContext } from "@/utils/PosContext";

const Footer = () => {
  const { state: {user} } = useContext(PosContext)!;

  return (
    <div className="text-black flex px-4 justify-between bg-slate-300 rounded-b-[10px] h-[5%] items-center">
      <span className="inline-flex w-[25%] justify-around">
        <p>{user?.name}</p>
        <p>{user?.employment.position}</p>
      </span>
      <DateTime className="inline-flex w-[25%] justify-around" />
    </div>
  )
}

export default Footer;
