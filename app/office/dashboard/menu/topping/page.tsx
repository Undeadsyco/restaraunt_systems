import { ToppingController } from "@/lib/DBModels/controllers"
import ToppingPage from "./components";
import { sortByTypeAsc } from "@/utils";

const getToppings = async () => {
  const toppings = await ToppingController.getAll();

  return JSON.stringify({ toppings: sortByTypeAsc(toppings) });
}

export default async function Toppings() {
  const { toppings }: {
    toppings: DataBase.Menu.ITopping[];
  } = JSON.parse(await getToppings());

  return <ToppingPage {...{ toppings }} />
}
