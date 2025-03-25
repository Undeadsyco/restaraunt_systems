import { v4 } from "uuid";
import { CommentItem, DiscountItem, ModificationItem, PizzaItem } from "./components";

type OrderItemProps = POS.Props.PosComponent & {
  orderItem: POS.Reducer.OrderItem<"pizza">
}

const OrderItem = ({ orderItem, state, dispatch }: OrderItemProps) => (
  <div
    tabIndex={1}
    onClick={() => dispatch({ type: "SELECT_ITEM", data: orderItem })}
    className={`orderItem ${state.orders[state.orderIndex].selectedItem === orderItem ? 'orderItemActive' : null} rounded-2xl`}
  >
    {orderItem.type === "pizza" ? <PizzaItem {...{ state, dispatch }} orderItem={orderItem} /> : null}

    <div className={`${orderItem.comments.length > 0 ? "block" : "hidden"} mt-2`}>
      <h3 className="text-xl">Comments:</h3>
      {orderItem.comments.map(c => (
        <CommentItem key={`${c.type}-${v4()}`} {...{ state, dispatch }} item={c} />
      ))}
    </div>

    <div className={`${orderItem.discount ? "block" : "hidden"} mt-2`}>
      <h3 className="text-xl">Discounts:</h3>
      {orderItem.discount && (
        <DiscountItem key={`${orderItem.discount.type}-${v4()}`} {...{ state, dispatch }} item={orderItem.discount} />
      )}
    </div>
  </div>
);

export default OrderItem;
