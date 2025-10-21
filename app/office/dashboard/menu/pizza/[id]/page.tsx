import { DoughController, PizzaController, SectionController, ToppingController } from "@/lib/DBModels/controllers"
import PizzaForm from "./components";
import { sortByTypeAsc } from "@/utils";

export type Data = {
  pizza: DataBase.Menu.IPizza;
  sections: DataBase.Menu.ISection[];
  dough: DataBase.Menu.IDough[];
  toppings: DataBase.Menu.ITopping[];
}

const getData = async (id: string) => {
  const pizza = id !== "new" ? await PizzaController.getOne({ _id: id }) : undefined;
  const sections = await SectionController.getAll();
  const dough = await DoughController.getAll();
  const toppings = await ToppingController.getAll({ type: { $in: ["sauce", "cheese", "seasoning", "meat", "produce"] } });

  return JSON.stringify({
    pizza,
    sections: sections,
    dough,
    toppings: sortByTypeAsc(toppings)
  });
}

export default async function PizzaPage({ params: { id } }: { params: { id: string } }) {
  const { pizza, sections, dough, toppings }: Data = JSON.parse(await getData(id));
  let initialValues = {
    name: "",
    section: "",
    toppings: [],
    prices: [],
  };

  return <PizzaForm {...{ pizza: pizza ?? initialValues, sections, dough, toppings }} />
}