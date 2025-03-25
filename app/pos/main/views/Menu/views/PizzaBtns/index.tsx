// Components
import { PizzaPortionBtn, PosBtn } from "@/app/pos/components/buttons";
import Section from "./section";
// Types

const PizzaBtns = (props: POS.Props.PosComponent) => {
  const { state: { sections } } = props;

  return (
    <>
      <PizzaPortionBtn {...props} text="Half" />
      <PizzaPortionBtn {...props} text="Thirds" />
      <PizzaPortionBtn {...props} text="Quarters" />

      {sections.length === 0 ? null : (
        <>
          <Section
            {...props}
            key={sections.filter(s => s.name.match(/Signature/))[0]?._id}
            section={sections.filter(s => s.name.match(/Signature/))[0]}
          />

          <Section
            {...props}
            key={sections.filter(s => s.name.match(/Seasonal/))[0]?._id}
            section={sections.filter(s => s.name.match(/Seasonal/))[0]}
          />

          <Section
            {...props}
            key={sections.filter(s => s.name.match(/Other/))[0]?._id}
            section={sections.filter(s => s.name.match(/Other/))[0]}
          />

          <Section
            {...props}
            key={sections.filter(s => s.name.match(/Delight/))[0]?._id}
            section={sections.filter(s => s.name.match(/Delight/))[0]}
          />

          <PosBtn
            className="to-toppings-btn"
            text="toppings"
            action={() => props.dispatch({ type: "SET_MENU_VIEW", data: "Toppings" })}
          />
        </>
      )}
    </>
  );
}

export default PizzaBtns;
