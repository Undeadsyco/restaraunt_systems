"use client"
import { ReactNode } from "react";
import { PosBtn } from "../../components/buttons";
import { useRouter } from "next/navigation";

const Group = ({ className, children }: { className: string, children: ReactNode[] }) => {

  return (
    <div className={className} >
      {children}
    </div>
  )
}

const ManagerFunctions = () => {
  const router = useRouter();
  return (
    <div className="row-span-11 col-span-8 grid grid-cols-6 grid-rows-6 grid-flow-col gap-x-2 gap-y-4 p-2">
      <Group className="row-span-5 grid grid-rows-subgrid gap-y-4">
        <PosBtn text="Delete Checkout" className="green-btn" />
        <PosBtn text="Edit Time" className="green-btn" />
        <PosBtn text="Change Password" className="green-btn" />
        <PosBtn text="Allow Clockin" className="green-btn" />
        <PosBtn text="Delete Clockout" className="green-btn" />
      </Group>
      <PosBtn className="dark-yellow-btn" text="Calibrate Screen" />
      <Group className="row-span-5 grid grid-rows-subgrid gap-y-4">
        <PosBtn text="Print Checkout" className="green-btn" />
        <PosBtn text="Edit Break" className="green-btn" />
        <PosBtn text="Clear Password" className="green-btn" />
        <PosBtn text="Disable Punctuality" className="green-btn" />
        <PosBtn text="" className="green-btn" />
      </Group>
      <PosBtn className="dark-yellow-btn" text="Reroute Printer" />
      <Group className="row-span-6 col-span-2 grid grid-rows-subgrid grid-cols-subgrid gap-y-4 gap-x-2">
        <PosBtn className="yellow-btn" text="Get Open Check" />
        <PosBtn className="yellow-btn" text="Recall Open" />
        <PosBtn className="yellow-btn" text="Tip Report" />
        <PosBtn className="yellow-btn" text="Checkout" />
        <PosBtn className="yellow-btn" text="Clock Out" onClick={() => router.push("/pos/time_punch")} />
        <PosBtn className="yellow-btn" text="Resend to Makeline" />
        <PosBtn className="yellow-btn" text="Close Check" />
        <PosBtn className="yellow-btn" text="Recall Closed" />
        <PosBtn className="yellow-btn" text="Print Check" />
        <PosBtn className="yellow-btn" text="Break" />
        <PosBtn className="yellow-btn" text="" />
      </Group>
      {/* <PosBtn className="row-start-6 col-start-4" text="" /> */}
      {/* 
      <>
        <PosBtn className="blue-btn" text="Manage Drawers" />
        <PosBtn className="blue-btn" text="Refund" />
      </>
      <>
        <PosBtn text="Daliy Summery Report" />
        <PosBtn text="PMIX Report" />
        <PosBtn text="Employee Break Report" />
        <PosBtn text="Flash Report" />
      </>
      <>
        <PosBtn className="blue-btn" text="Open Drawer" />
        <PosBtn className="blue-btn" text="Reassign Drawer" />
      </>
      <PosBtn text="Sales Report" />
      <PosBtn text="Labor Report" />
      <PosBtn text="Break Alert Report" />
      <PosBtn text="" /> */}
    </div>
  )
}

export default ManagerFunctions;
