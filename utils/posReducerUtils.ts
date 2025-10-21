export const calculatePrice = (order: POS.Reducer.Order) => {
  let price = 0;
  order.items.forEach((i: POS.Reducer.OrderItem<"pizza">) => {
    price += i.price;
    const added = i.modifications.filter(m => m.modification === "add" || m.modification === "extra");
    const removed = i.modifications.filter(m => m.modification === "no");
    
    added.forEach(m => { price += m.price; });
    removed.forEach((_, i) => { price -= added[i] ? added[i].price : 0 });

    if (i.discount) price -= i.discount.amount;
  });

  order.subTotal = price;
  order.tax = price * 0.02;
  order.total = price + (price * 0.02);
}
//   ...state.orders[state.orderIndex].items[state.orders[state.orderIndex].itemIndex]
// });

export const setError = (state: POS.Reducer.PosState, message: string): POS.Reducer.PosState => ({
  ...state,
  modal: {
    ...state.modal,
    open: true,
    err: {
      display: true,
      message,
    },
    numberpad: {
      ...state.modal.numberpad,
      display: false,
    },
    keyboard: {
      ...state.modal.keyboard,
      display: false,
    }
  }
});

export const setOperationNotValidError = (state: POS.Reducer.PosState): POS.Reducer.PosState => (
  setError(state, "Operation Is Not Valid For This Item")
);