import ComponentMapper from "@/app/components/componentMaper";
import { DoughController } from "@/lib/DBModels/controllers";
import DoughPage from "./components";

const getDough = async () => {
  const dough = await DoughController.getAll();
  if (!dough || dough.length === 0) throw new Error("was unable to get dough");
  return JSON.stringify(dough);
}
export default async function DoughInventory() {
  const dough = JSON.parse(await getDough());

  return <DoughPage {...{ dough }} />
}