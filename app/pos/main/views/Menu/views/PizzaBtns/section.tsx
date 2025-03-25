import { PizzaBtn, PosBtn } from "@/app/pos/components/buttons";

type SectionProps = POS.Props.PosComponent & {
  section: POS.Data.ISection
}

const SectionBtns = (props: SectionProps) => {
  const { section, state } = props;
  const pizzas: (POS.Data.IPizza | { section: POS.Types.IDType })[] = state.pizzas.filter(pizza => pizza.section === section._id)

  for (let i = pizzas.length; i < 12; i += 1) {
    if (section.name === "Delight") break;
    pizzas.push({ section: section._id as string });
  }

  return (
    <>
      {pizzas.map((pizza, i: number) => (
        <PizzaBtn
          key={(pizza as POS.Data.IPizza)._id as string || i}
          {...props}
          pizza={pizza}
        />
      ))}
      
    </>
  );
}

export default SectionBtns;
