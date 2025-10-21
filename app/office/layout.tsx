
import { ReactNode } from "react";
import OfficeProvider from "../../utils/OfficeContext";

import "@/styles/OfficeStyles.css"
import dbConnect from "@/lib/DBConnections/DBConnect";

const BackOfficeLayout = async ({ children }: { children: ReactNode | ReactNode[] }) => {
  await dbConnect();
  return (
    <OfficeProvider>
      <main className="w-screen h-screen border-4 border-green-800 bg-green-600 rounded-2xl">
        <div className="col-span-12 h-[7%]"></div>
        <div className="bg-white w-full h-[90%] border-4 border-green-800 rounded-xl grid grid-rows-12 grid-cols-12 relative">
          {children}
        </div>
        <div className="col-span-12 h-[3%]"></div>
      </main>
    </OfficeProvider>
  )
}

export default BackOfficeLayout;
