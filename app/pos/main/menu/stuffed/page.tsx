import { PizzaBtn, PosBtn } from "@/app/pos/components/buttons";
import { PizzaController, SectionController } from "@/lib/DBModels/controllers";

const getPizzas = async () => {
  const section = await SectionController.getOne({ name: "Stuffed" });
  if (!section) throw new Error("Unable to get section");

  const pizzas = await PizzaController.getAll({ section: section?._id });
  if (!pizzas) throw new Error(`Unable to get pizzas of given section ${section.name}`);

  return JSON.stringify(pizzas);
}

export default async function Stuffed() {
  const pizzas: DataBase.Menu.IPizza[] = JSON.parse(await getPizzas());

  return (
    <>
      {["L", "F"].map(size => (
        <div className="col-span-6 grid grid-cols-subgrid" key={size}>
          {pizzas.map(p => (
            <PizzaBtn className="" key={p._id} pizza={{ ...p, name: `${size} ${p.name}` }} />
          ))}
          <PosBtn />
          <PosBtn />
        </div>
      ))}
    </>
  );
}
