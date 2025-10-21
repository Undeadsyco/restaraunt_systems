// Dependencies
import { useContext } from "react";
// Components
import { PosContext } from "@/utils/PosContext";

const OrderItem = ({ orderItem }: { orderItem: POS.Order.PizzaItem }) => {
  const { state, dispatch } = useContext(PosContext)!;
  const { selectedItem } = state.orders[state.orderIndex];

  const pizza = state.pizzas.find(p => p._id === orderItem.pizzas[0]);
  const size = state.dough.find(dough => dough._id === orderItem.size);
  const index = state.dough.indexOf(size!);

  return (
    <div
      tabIndex={1}
      onClick={() => dispatch({ type: "SELECT_ITEM", data: orderItem })}
      className={`orderItem ${selectedItem === orderItem ? 'orderItemActive' : null} flex-col w-full cursor-pointer`}
    >
      {/* Pizza Details */}
      <h3 className="text-center flex justify-around  text-lg font-extrabold">
        <span>{size?.name}</span>
        <span>{pizza?.name}</span>
        <span>${pizza?.prices![index].price}</span>
      </h3>

      {/* Modification Details */}
      <div className={`${orderItem.modifications.length > 0 ? "block" : "hidden"}`}>
        <h4 className="text-sm font-semibold">Modifications:</h4>
        {orderItem.modifications.map((m, i) => (
          <p
            key={`${m.modification}-${m.topping}`}
            tabIndex={1}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "SELECT_ITEM", data: m })
            }}
            className={`orderItem ${selectedItem === m ? 'orderItemActive' : null}`}
          >
            <span>{m.modification}</span>
            <span>{state.toppings.find(t => t._id === m.topping)?.name}</span>
            <span>${m.price.toFixed(2)}</span>
          </p>
        ))}
      </div>

      {/* Commnets Container */}
      <div className={`${orderItem.comments.length > 0 ? "block" : "hidden"}`}>
        <h4 className="text-sm font-semibold">Comments:</h4>
        {orderItem.comments.map((c, i) => (
          <p
            key={`${c.type}-${i}`}
            tabIndex={1}
            className={`orderItem ${selectedItem === c ? 'orderItemActive' : null}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "SELECT_ITEM", data: c })
            }}
          >
            {c.message}
          </p>
        ))}
      </div>

      {/* Discount Container */}
      <div className={`${orderItem.discount ? "block" : "hidden"}`}>
        <h4 className="text-sm font-semibold">Discount:</h4>
        {orderItem.discount && (
          <p
            tabIndex={1}
            className={`orderItem ${selectedItem === orderItem.discount && 'orderItemActive'}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "SELECT_ITEM", data: orderItem.discount });
            }}
          >
            <span>{orderItem.discount.name}</span>
            <span>$-{orderItem.discount.amount.toFixed(2)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderItem;
