import { PizzaBtn } from "@/app/pos/components/buttons";

const StuffedPizzaBtns = (props: POS.Props.PosComponent) => {
  const { pizzas, sections } = props.state;
  const stuffedId = (sections.find(s => s.name === "Stuffed")!)._id
  const stuffedPizzas: (POS.Data.IPizza | { section: POS.Types.IDType })[] = pizzas.filter(p => p.section === stuffedId)

  for (let i = stuffedPizzas.length; i < 12; i += 1) {
    stuffedPizzas.push({ section: stuffedId })
  }

  return (
    <>
      {stuffedPizzas.map(p => (
        <PizzaBtn key={(p as POS.Data.IPizza)._id} {...props} pizza={p} />
      ))}
    </>
  );
}

export default StuffedPizzaBtns;
