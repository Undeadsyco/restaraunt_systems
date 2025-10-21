"use server"

import { LinkBtn } from "@/app/components";
import { BtnContainer } from "./components";
import ProtectedRoute from "../components/protectedRoute";

const MainOfficePage = () => (
  <>
    <div className="col-span-full row-span-11 grid grid-cols-3 grid-rows-2 p-20 gap-20">
      <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", text: "Employees", href: "/office/dashboard/employees" }} />
      <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", text: "Labor", href: "/office/dashboard/labor" }} />
      <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", text: "Orders", href: "/office/dashboard/orders" }} />
      <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", text: "Menu", href: "/office/dashboard/menu" }} />
      <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", text: "Inventory", href: "/office/dashboard/Inventory" }} />
      <LinkBtn {...{ className: "bg-green-600 rounded-2xl text-2xl font-bold", text: "Reports", href: "/office/dashboard/reports" }} />
    </div>
    <BtnContainer />
  </>
)

export default MainOfficePage;
