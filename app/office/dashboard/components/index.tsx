"use client"

// Dependecies
import axios from "axios";
import { useRouter } from "next/navigation";
// Components
import { Btn } from "@/app/components"
// Types
import { BtnProps } from "@/types"

const OfficeBtn = ({ className, text, onClick }: BtnProps) => (
  <Btn {...{ className: `bg-green-600 rounded-2xl ${className}`, text, onClick }} />
)

export const BtnContainer = () => {
  const router = useRouter();
  return (
    <div className="col-span-full grid grid-cols-subgrid p-1">
      <OfficeBtn {...{
        text: "Exit", onClick: () => window.close(),
      }} />
      <OfficeBtn {...{
        text: "Logout",
        className: "col-start-12",
        onClick: () => axios.get("/office/api").then(res => {
          if (res.status === 200) router.push("/office");
        })
      }} />
    </div>
  )
}