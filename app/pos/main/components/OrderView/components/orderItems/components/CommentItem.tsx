const CommentItem = ({ item, state, dispatch }: { item: POS.Reducer.CommentItem } & POS.Props.PosComponent) => (
  <p
    tabIndex={1}
    className={`orderItem ${state.orders[state.orderIndex].selectedItem === item ? 'orderItemActive' : null} rounded-2xl text-base`}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({ type: "SELECT_ITEM", data: item })
    }}
  >
    {item.message}
  </p>
);

export default CommentItem;
