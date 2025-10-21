// Controllers
import { DoughController } from "@/lib/DBModels/controllers";
// Components
import Link from "next/link";
import { PosBtn } from "@/app/pos/components/buttons";
import SizeBtn from "./SizeBtn";

const getDough = async () => {
  const dough = await DoughController.getAll();
  if (!dough) throw new Error("Unable to find dough")

  return JSON.stringify(dough);
}

export default async function SizeCategoryBtns() {
  const dough = JSON.parse(await getDough());

  return (
    <div className={`col-span-8 grid grid-cols-10 gap-1`}>
      {dough.map((dough: DataBase.Menu.IDough) => (
        <SizeBtn key={dough._id as string} size={dough} />
      ))}
      <PosBtn className="size-btn" text="Specials" />
      <PosBtn
        className="size-btn"
      >
        <Link className="link-btn" href="/pos/main/menu/stuffed">Stuffed</Link>
      </PosBtn>
      <PosBtn text="AOS" />
    </div>
  );

}
