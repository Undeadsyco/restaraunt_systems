export const getPizza = (state: POS.Reducer.PosState, id: POS.Types.IDType) => ({
  ...state.pizzas.find(pizza => pizza._id === id)!
})

export const getOrder = (state: POS.Reducer.PosState): POS.Reducer.order => ({
  ...state.orders[state.orderIndex]
});

export const replaceOrder = (state: POS.Reducer.PosState, newOrder: POS.Reducer.order) => {
  const orders = [...state.orders];
  orders.splice(state.orderIndex, 1, newOrder);
  return [...orders];
}

export const calculatePrice = (order: POS.Reducer.order) => {
  let price = 0;
  order.items.forEach((i: POS.Reducer.OrderItem<"pizza">) => {
    price += i.price;
    const added = i.modifications.filter(m => m.modification === "add" || m.modification === "extra");
    const removed = i.modifications.filter(m => m.modification === "no");
    
    added.forEach(m => { price += m.price; });
    removed.forEach((_, i) => { price -= added[i] ? added[i].price : 0 });

    if (i.discount) price -= i.discount.amount;
  });

  order.price = price;
}

export const getOrderItem = (state: POS.Reducer.PosState): POS.Reducer.OrderItem<"pizza"> => ({
  ...state.orders[state.orderIndex].items[state.orders[state.orderIndex].itemIndex]
});

export const setError = (state: POS.Reducer.PosState, message: string): POS.Reducer.PosState => ({
  ...state,
  modal: {
    ...state.modal,
    open: true,
    err: {
      display: true,
      message,
    }
  }
});

export const setOperationNotValidError = (state: POS.Reducer.PosState): POS.Reducer.PosState => (
  setError(state, "Operation Is Not Valid For This Item")
);