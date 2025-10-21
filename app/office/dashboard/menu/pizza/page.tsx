
// Controllers
import { DoughController, PizzaController, SectionController } from "@/lib/DBModels/controllers";
// Components
import PizzaTable from "./components";
import { Btn, LinkBtn } from "@/app/components";

export type PizzaTableProps = {
  sections: DataBase.Menu.ISection[];
  dough: DataBase.Menu.IDough[];
  pizzas: DataBase.Menu.IPizza[];
}

const getPizzas = async () => {
  try {
    const sections = await SectionController.getAll();
    const dough = await DoughController.getAll();
    const pizzas = await PizzaController.getAll();
    return JSON.stringify({ sections, dough, pizzas });
  } catch (error) {
    return ""
  }
}

export default async function PizzaListPage() {
  const { sections, dough, pizzas }: PizzaTableProps = JSON.parse(await getPizzas());

  return <PizzaTable {...{ sections, dough, pizzas }} />
}