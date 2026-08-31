// Dependencies
import { useContext } from "react";
// Components
import { PosContext } from "@/utils/PosContext";
import { Pizza } from "@/app/pos/classes";
import ModificationItem from "../modificationItem";
import DiscountItem from "../discountItem";
import { Clickable } from "@/app/pos/components";

const PizzaItem = ({ pizzaItem }: { pizzaItem: Pizza }) => {
  const { state, dispatch } = useContext(PosContext)!;
  const order = state.orders[state.index];

  const pizza = state.pizzas.find(p => p._id === pizzaItem.item);
  const size = state.dough.find(dough => dough._id === pizzaItem.size);

  return (
    <Clickable
      onClick={() => dispatch({ type: "SELECT_ITEM", data: pizzaItem })}
      className={`orderItem flex-col w-full cursor-pointer ${order.selected === pizzaItem ? 'orderItemActive' : ""} ${!pizzaItem.finalized ? "text-blue-500" : ""}`}
    >
      {/* Pizza Details */}
      <h3 className="text-center flex justify-around  text-lg font-extrabold">
        <span>{size?.abbreviation}</span>
        <span>{pizza?.name}</span>
        <span>${pizzaItem.price.toFixed(2)}</span>
      </h3>

      {/* Modification Details */}
      <div className={`${pizzaItem.hasModifications() ? "block" : "hidden"}`}>
        <h4 className="text-sm font-semibold text-black">Modifications:</h4>
        {pizzaItem.modifications.map(list => list.map(item => (
          <ModificationItem key={`${item.type}-${item.topping}`} {...{ item }} />
        )))}
      </div>

      {/* Commnets Container */}
      <div className={`${pizzaItem.comments.length ? "block" : "hidden"}`}>
        <h4 className="text-sm font-semibold">Comments:</h4>
        {pizzaItem.comments.map((comment, i) => (
          <Clickable
            key={`${comment.parent.id}-comment-${i}`}
            className={`orderItem ${order.selected === comment ? 'orderItemActive' : null}`}
            onClick={() => dispatch({ type: "SELECT_ITEM", data: comment })}
          >
            {comment.message}
          </Clickable>
        ))}
      </div>

      {/* Discount Container */}
      <DiscountItem {...{ discount: pizzaItem.discount }} />
    </Clickable>
  );
}

export default PizzaItem;
