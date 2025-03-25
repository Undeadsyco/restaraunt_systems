import PosBtn from "./posBtn";

type pizzaBtnProps = POS.Props.PosComponent & {
  pizza: POS.Data.IPizza | { section: POS.Types.IDType };
}

const isIPizza = (pizza: any): pizza is POS.Data.IPizza => (
  "name" in pizza
)

const PizzaBtn = ({ pizza, state, dispatch }: pizzaBtnProps) => {
  const section = state.sections.filter(section => section._id === pizza.section)[0].name;

  const className = section.match(/Delight/)
    ? "delight-btn"
    : section.match(/Seasonal/)
      ? "seasonal-btn"
      : section.match(/Other/)
        ? "other-btn"
        : "signature-btn"

  return <PosBtn
    className={className}
    text={isIPizza(pizza) ? pizza.name : ""}
    action={() => { if (isIPizza(pizza)) dispatch({ type: "SET_PIZZA", data: pizza }) }}
  />
}

export default PizzaBtn;