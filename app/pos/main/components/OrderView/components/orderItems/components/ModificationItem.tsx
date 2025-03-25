type ModificationItemProps = POS.Props.PosComponent & {
  item: POS.Reducer.ModificationItem;
}

const ModificationItem = ({ item, state, dispatch }: ModificationItemProps) => {

  return (
    <p
      tabIndex={1}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: "SELECT_ITEM", data: item })
      }}
      className={`w-4/5 h-6 px-2 flex justify-between items-center text-base hover:cursor-pointer ${state.orders[state.orderIndex].selectedItem === item ? 'orderItemActive' : null}`}
    >
      <span>{item.modification}</span>
      <span>{state.toppings.find(t => t._id === item.topping)?.name}</span>
      <span>${item.price.toFixed(2)}</span>
    </p>
  )
}

export default ModificationItem;