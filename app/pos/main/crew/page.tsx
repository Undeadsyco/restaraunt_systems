"use client"
import { ReactNode } from "react";
import { PosBtn } from "../../components/buttons";
import { useRouter } from "next/navigation";

const CrewFunctions = () => {
  const router = useRouter();
  
  return (
    <div className="col-span-8 row-span-11 grid grid-rows-4 grid-cols-3 gap-x-2 gap-y-4 p-4">
      <PosBtn text="Break" />
      <PosBtn text="Reassign Drawer" />
      <PosBtn text="Recall Closed" />
      <PosBtn text="Clock Out" onClick={() => router.push("/pos/time_punch")} />
      <PosBtn text="Tip Report" />
      <PosBtn text="Print Check" />
      <PosBtn text="Print Schedule" />
      <PosBtn text="Manage Drawers" />
      <PosBtn text="New Order" />
      <PosBtn className="col-start-2" text="Check Out" />
    </div>
  )
}

export default CrewFunctions;
