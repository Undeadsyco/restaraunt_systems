import { PosBtn, ToppingBtn } from "@/app/pos/components/buttons";
// interfaces & types


const ToppingBtns = ({ state, dispatch }: POS.Props.PosComponent) => (
  (
    <>
      {["sauce", "cheese", "seasoning", "meat", "produce"].map((type) => (
        <div
          key={type}
          className={`col-span-6 grid grid-cols-6 gap-x-2 gap-y-4 ${type === "produce"
            ? "row-span-3 grid-rows-3"
            : (type === "cheese" || type === "seasoning")
              ? "row-span-1 grid-rows-1"
              : "row-span-2 grid-rows-2"
            }`}
        >
          <>
            {state.toppings.filter(t => t.type === type).map(t => (
              <ToppingBtn key={t._id} {...{ state, dispatch, toppingId: t._id as string }} />
            ))}
            {type != "produce" ? <br /> : null}
          </>
          {
            type === "produce"
              ? (
                <PosBtn
                  className="close-btn text-white" text="Back"
                  action={() => dispatch({ type: "SET_MENU_VIEW", data: "Traditional" })}
                />
              )
              : null
          }
        </div>
      ))}

    </>
  )
);

export default ToppingBtns;
