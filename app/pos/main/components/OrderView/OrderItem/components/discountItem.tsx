import { Discount } from "@/app/pos/classes";
import { Clickable } from "@/app/pos/components";
import { PosContext } from "@/utils/PosContext";
import { useContext } from "react";

const DiscountItem = ({ discount }: { discount?: Discount }) => {
  const { state: { orders, index }, dispatch } = useContext(PosContext);

  return discount && (
    <div>
      <h4 className="text-sm font-semibold">Discount:</h4>
      <Clickable
        as="p"
        className={`orderItem ${orders[index].selected === discount && 'orderItemActive'}`}
        onClick={() => {
          dispatch({ type: "SELECT_ITEM", data: discount });
        }}
      >
        <span>{discount.text}</span>
        <span>$-{discount.amount.toFixed(2)}</span>
      </Clickable>
    </div>
  )
}

export default DiscountItem;
