// import React from "react"
import Menu from "./Menu";
import CommentBtns from "./CommentBtns";
import DiscountBtns from "./DiscountBtns";

const POSViews = (props: POS.Props.PosComponent) => {
  return (
    <div className="col-span-3 row-span-11 grid grid-rows-11 grid-cols-8 gap-x-1 gap-y-3 pb-2">
      {props.state.views.main === "Menu" ? <Menu {...props} /> : null}
      {props.state.views.main === "Comments" ? <CommentBtns {...props} /> : null}
      {props.state.views.main === "Discounts" ? <DiscountBtns {...props} /> : null}
    </div>
  )
}

export default POSViews;
