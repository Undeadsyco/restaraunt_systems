// Controllers
import { PizzaController } from "@/lib/DBModels/controllers";
// Components
import { PizzaBtn, PosBtn } from "@/app/pos/components/buttons";

const getPizzas = async (section: string) => {
  const pizzas = await PizzaController.getAll({ section }, { toppings: true });
  if (!pizzas) throw new Error("Unable to find pizzas with given section ID");

  return JSON.stringify(pizzas);
}

export default async function PizzaSection({ section }: { section: DataBase.Menu.ISection; }) {
  const pizzas: DataBase.Menu.IPizza[] = JSON.parse(await getPizzas(section._id));

  const className = section.name.match(/Delight/)
    ? "delight-btn"
    : section.name.match(/Seasonal/)
      ? "seasonal-btn"
      : section.name.match(/Other/)
        ? "other-btn"
        : "signature-btn";

  const length = section.name.match(/Signature/) || section.name.match(/Delight/)
    ? 11
    : 12;

  return (
    <>
      {pizzas.map((pizza) => (
        <PizzaBtn
          className={className}
          key={pizza._id}
          pizza={pizza}
        />
      ))}
      {Array.from({ length: length - pizzas.length }, (_, i) => (<PosBtn className={className} key={`${section}_${i + 1}`} />))}
    </>
  );
}