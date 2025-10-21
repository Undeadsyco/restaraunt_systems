// Components
import { PizzaPortionBtn, PizzaSection } from "./components";
import { PosBtn } from "@/app/pos/components/buttons";
import dbConnect from "@/lib/DBConnections/DBConnect";
import { SectionController } from "@/lib/DBModels/controllers";
// Types
import Link from "next/link";

const getSections = async () => {
  const sections = await SectionController.getAll();
  if (!sections) throw new Error("Unable to find sections");
  
  return JSON.stringify(sections.filter(s => s.name !== "Stuffed"));
}

export default async function Menu() {
  const sections: DataBase.Menu.ISection[] = JSON.parse(await getSections());

  return (

    <>
      <PizzaPortionBtn text="Half" />
      <PizzaPortionBtn text="Thirds" />
      <PizzaPortionBtn text="Quarters" />

      <PosBtn
        className="CYO-pizza-btn"
        text="CYO"
      />

      {sections.map(section => (
        <PizzaSection
          key={section._id}
          section={section}
        />
      ))}

      <PosBtn
        className="to-toppings-btn"
      >
        <Link className="link-btn" href="/pos/main/menu/toppings">Toppings</Link>
      </PosBtn>

    </>
  )
}
