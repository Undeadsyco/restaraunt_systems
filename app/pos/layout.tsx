// Dependencies
import { ReactNode } from "react";
import dbConnect from "@/lib/DBConnections/DBConnect";
import { DoughController, PizzaController, SectionController, ToppingController } from "@/lib/DBModels/controllers";
// Components
import PosProvider from "@/utils/PosContext";
import Modal from "./components/modals";
// Styles
import "@/styles/PosStyles.css";

export type PosProps = {
  sections: DataBase.Menu.ISection[];
  dough: DataBase.Menu.IDough[];
  pizzas: DataBase.Menu.IPizza[];
  toppings: DataBase.Menu.ITopping[];
}

const getProps = async () => {
  await dbConnect();
  const sections = await SectionController.getAll();
  const dough = await DoughController.getAll();
  const pizzas = await PizzaController.getAll();
  const toppings = await ToppingController.getAll();

  return JSON.stringify({ sections, dough, pizzas, toppings });
}

export default async function PosLayout({ children }: { children: ReactNode }) {
  const props: PosProps = JSON.parse(await getProps());

  return (
    <PosProvider {...{ props, className: "overflow-hidden grid grid-cols-12 grid-rows-12 w-full h-full bg-slate-600" }}>
      {children}
    </PosProvider>
  );
} 