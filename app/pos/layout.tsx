// Dependencies
import { ReactNode } from "react";
import dbConnect from "@/lib/DBConnections/DBConnect";
// Components
import PosProvider from "@/utils/PosContext";
import Modal from "./components/modals";
// Styles
import "@/styles/PosStyles.css";

export default async function PosLayout({ children }: { children: ReactNode }) {
  await dbConnect();

  return (
    <PosProvider>
      <main className='overflow-hidden grid grid-cols-12 grid-rows-12 w-full h-full bg-slate-600'>
        <Modal />

        {children}
      </main>
    </PosProvider>
  );
} 