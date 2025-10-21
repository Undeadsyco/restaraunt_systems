"use client"
// Dependencies
import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/navigation";
// Components
import { PosBtn } from "../components/buttons"
import { PosContext } from "@/utils/PosContext";
import { DateTime } from "@/app/components";
// Types
import type { BtnProps } from "@/types";

const PunchBtn = ({ text, className }: BtnProps) => {
  const router = useRouter();
  const { state: { user }, dispatch } = useContext(PosContext)!;

  return (
    <PosBtn
      className={`col-span-2 m-2 col-start-11 row-start-2 ${className}`}
      text={text}
      onClick={() => {
        axios.put("/pos/api/time_punch", { user: user?._id, punchType: text!.split(" ").join("_").toLowerCase() }).then((res) => {
          if (res.status === 201) {
            dispatch({ type: text!.split(" ").join("_").toUpperCase(), data: res.data })
            if (text === "Clock Out") router.push("/pos");
            if (text === "Clock In") router.push("/pos/main/menu")
          }
        }).catch((err) => {
          if (err instanceof Error) dispatch({ type: "SET_ERROR", data: err.message });
          else dispatch({ type: "SET_ERROR", data: "Something went wrong" });
        });
      }}
    />
  )
}

const TimePunch = () => {
  const router = useRouter();
  const { state: { user }, dispatch } = useContext(PosContext)!;

  return (
    <>
      <div className="text-white col-start-6 col-span-2 row-start-2 row-span-2 grid grid-cols-1 grid-rows-subgrid text-lg font-bold text-center">
        <h2>{user?.name}</h2>
        <DateTime className="inline-flex justify-around" />
      </div>

      <PunchBtn text={user?.employment.clocked_in ? "Clock Out" : "Clock In"} />

      <PosBtn
        className="col-span-2 m-2 col-start-11 row-start-11"
        text="Close"
        onClick={() => router.back()}
      />
    </>
  )
}

export default TimePunch;
