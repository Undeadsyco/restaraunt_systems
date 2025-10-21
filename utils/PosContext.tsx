"use client"

import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { v4 } from 'uuid';

import * as reducerUtils from "@/utils/posReducerUtils";

const initialState: POS.Reducer.PosState = {
  user: undefined,
  currentSize: "",
  currentPizza: undefined,
  orderIndex: 0,
  orders: [{
    selectedItem: undefined,
    toppingMod: undefined,
    name: undefined,
    items: [],
    itemIndex: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    payments: [],
    change: 0,
    taxExempt: false,
  }],
  modal: {
    open: false,
    err: { display: false, message: "" },
    keyboard: { display: false, action: "" },
    numberpad: { display: false, type: "whole", action: "", name: "", amount: 0 },
  },
}

const reducer = (state: POS.Reducer.PosState, { type, data }: POS.Reducer.PosAction): POS.Reducer.PosState => {
  switch (type) {
    case "SET_USER": {
      return { ...state, user: data }
    }
    case "CLOCK_IN": {
      const user = state.user;
      if (user) user.employment.clocked_in = true;

      return ({
        ...state,
        user: user
      })
    }
    case "CLOCK_OUT": {
      const user = state.user;
      if (user) user.employment.clocked_in = false;

      return ({
        ...state,
        user: undefined
      })
    }
    case "SET_SIZE": {
      return ({
        ...state,
        currentSize: data,
      });
    }
    case "SET_PIZZA": {
      return ({
        ...state,
        currentPizza: data,
      })
    }
    case "CREATE_ORDER": return ({
      ...state,
      orders: [...state.orders, {
        selectedItem: undefined,
        toppingMod: undefined,
        name: undefined,
        items: [],
        itemIndex: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
        payments: [],
        change: 0,
        taxExempt: false,
      }],
      orderIndex: state.orders.length
    });

    case "SELECT_ORDER": return ({
      ...state,
      orderIndex: data
    });

    case "DELETE_ORDER": {
      const orders = [...state.orders];
      if (state.orders.length > 1) { orders.splice(state.orderIndex, 1); }
      else orders.splice(state.orderIndex, 1, {
        selectedItem: undefined,
        toppingMod: undefined,
        name: undefined,
        items: [],
        itemIndex: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
        payments: [],
        change: 0,
        taxExempt: false,
      })
      return ({
        ...state,
        orders: [...orders],
        orderIndex: 0
      })
    }

    case "SET_ORDER_NAME": return ({
      ...state,
      orders: state.orders.toSpliced(state.orderIndex, 1, {
        ...state.orders[state.orderIndex],
        name: data,
      }),
    })

    case "SET_MODIFICATION": return ({
      ...state,
      orders: state.orders.toSpliced(state.orderIndex, 1, {
        ...state.orders[state.orderIndex],
        toppingMod: data,
      }),
    });

    case "CREATE_ITEM": {
      if (!state.currentPizza) return reducerUtils.setError(state, "Please Select Pizza")

      const order = state.orders[state.orderIndex];
      console.log(state.currentSize)
      console.log(state.currentPizza.prices);
      console.log(state.currentPizza.prices.filter(size => size.dough === state.currentSize));
      // const newItem: POS.Order.PizzaItem = {
      //   id: v4(),
      //   portion: 'whole',
      //   modifications: [],
      //   comments: [],
      //   type: "pizza",
      //   pizzas: [pizza._id!],
      //   price: pizza.prices![sizeIndex].price,
      //   size: state.currentSize,
      // }

      // order.items = [...order.items, newItem];
      // reducerUtils.calculatePrice(order);

      return ({
        ...state, orders: state.orders.toSpliced(state.orderIndex, 1, {
          ...order,
          // selectedItem: newItem,
          itemIndex: order.items.length - 1,
        })
      })
    }
    case "SELECT_ITEM": {
      // const order = state.orders[state.orderIndex];
      // order.selectedItem = data;
      // switch (data.type) {
      //   case "pizza": {
      //     state.toppingPreview = state.pizzas.find(pizza => pizza._id === state.currentPizza)!.toppings;
      //     order.itemIndex = order.items.indexOf(data);
      //     state.currentPizza = data._id
      //     break;
      //   }
      //   default: {
      //     order.itemIndex = order.items.indexOf(
      //       order.items.find((i) => i.id === data.parent)!
      //     )
      //     break;
      //   }
      //   // Pizza Option
      // }

      return ({
        ...state,
        // orders: state.orders.toSpliced(state.orderIndex, 1, order)
      });
    }
    case "CHANGE_SIZE": {
      // const order = state.orders[state.orderIndex];

      // if (order.selectedItem?.type !== "pizza") return reducerUtils.setOperationNotValidError(state);

      // const item = order.selectedItem as POS.Order.PizzaItem
      // let index = state.dough.indexOf(state.dough.find(d => d._id === item.size)!);

      // if (data === "up" && index < state.dough.length - 1) index += 1;
      // if (data === "down" && index > 0) index -= 1;

      // item.size = state.dough[index]._id!;
      // item.price = state.pizzas.find(p => p._id === item.pizzas[0])!.prices![index].price;

      // order.items = order.items.toSpliced(order.itemIndex, 1, item)
      // reducerUtils.calculatePrice(order);

      return ({ 
        ...state, 
        // orders: state.orders.toSpliced(state.orderIndex, 1, order)
      });
    }
    case "MODIFY_ITEM": {
      // const order = state.orders[state.orderIndex];

      // if (!order.selectedItem) return reducerUtils.setError(state, "Please Add Pizza To Order Before Modifying");
      // if (order.selectedItem.type !== "pizza") return reducerUtils.setOperationNotValidError(state);

      // const orderItem = order.selectedItem as POS.Order.PizzaItem;
      // const pizza = state.pizzas.find(pizza => pizza._id === state.currentPizza)!;
      // const topping = state.toppings.find(t => t._id === data);

      // const onPizza = pizza.toppings.includes(data);
      // const inModifications = orderItem.modifications.find(m => m.topping === data);
      // const index = inModifications
      //   ? orderItem.modifications.indexOf(orderItem.modifications.find(m => m.topping === data)!)
      //   : undefined;

      // switch (order.toppingMod) {
      //   case "extra": {
      //     if (onPizza || inModifications) {
      //       orderItem.modifications.splice(index ? index + 1 : orderItem.modifications.length, 0,
      //         { parent: orderItem.id, type: "modification", modification: "extra", topping: data, price: topping!.price }
      //       );
      //     } else {
      //       orderItem.modifications.splice(orderItem.modifications.length, 0,
      //         { parent: orderItem.id, type: "modification", modification: "add", topping: data, price: topping!.price },
      //         { parent: orderItem.id, type: "modification", modification: "extra", topping: data, price: topping!.price }
      //       );
      //     }
      //     break;
      //   }
      //   case "less": {
      //     if (onPizza || inModifications) {
      //       orderItem.modifications.splice(index ? index + 1 : orderItem.modifications.length, 0,
      //         { parent: orderItem.id, type: "modification", modification: "less", topping: data, price: 0 }
      //       );
      //     } else {
      //       orderItem.modifications.splice(orderItem.modifications.length, 0,
      //         { parent: orderItem.id, type: "modification", modification: "add", topping: data, price: topping!.price },
      //         { parent: orderItem.id, type: "modification", modification: "less", topping: data, price: 0 }
      //       );
      //     }
      //     break;
      //   }
      //   // Add or Remove
      //   default: {
      //     if (inModifications) {
      //       orderItem.modifications = orderItem.modifications.filter(m => m.topping !== data);
      //     } else if (onPizza) {
      //       orderItem.modifications.push({ parent: orderItem.id, type: "modification", modification: "no", topping: data, price: 0 });
      //     } else {
      //       orderItem.modifications.push({ parent: orderItem.id, type: "modification", modification: "add", topping: data, price: topping!.price });
      //     }
      //     break;
      //   }
      // }

      // order.toppingMod = undefined;

      // reducerUtils.calculatePrice(order);

      return ({ 
        ...state, 
        // orders: state.orders.toSpliced(state.orderIndex, 1, order) 
      });
    }

    case "ADD_COMMENT": {
      const order = state.orders[state.orderIndex];

      if (!order.selectedItem) return reducerUtils.setError(state, "Please Select An Item")
      if (order.selectedItem?.type !== "pizza") return reducerUtils.setOperationNotValidError(state)

      const comment: POS.Order.CommentItem = {
        parent: order.selectedItem.id,
        type: "comment",
        name: data.name,
        message: data.name === "Custom" ? data.message : data.name,
      }

      order.selectedItem.comments.push(comment);

      state.orders.splice(state.orderIndex, 1, order);
      return ({
        ...state,
        orders: state.orders.toSpliced(state.orderIndex, 1, order),
      })
    }
    case "ADD_DISCOUNT": {
      const order = state.orders[state.orderIndex];

      if (order.selectedItem?.type !== "pizza") return reducerUtils.setOperationNotValidError(state);
      if (order.selectedItem.discount) return reducerUtils.setError(state, "Item Is Already Discounted");
      if (order.selectedItem.price < data.amount) return reducerUtils.setError(state, "Cannot set discount greater than pizza price")

      order.selectedItem.discount = {
        type: "discount",
        parent: order.selectedItem.id,
        name: data.name,
        amount: data.amount
      };
      reducerUtils.calculatePrice(order);

      return ({
        ...state,
        orders: state.orders.toSpliced(state.orderIndex, 1, order),
        modal: {
          ...state.modal,
          open: false,
          numberpad: {
            display: false,
            type: "whole",
            action: "",
            name: "",
            amount: 0,
          }
        }
      })
    }

    case "DELETE_SELECTED": {
      const order = state.orders[state.orderIndex];

      if (!order.selectedItem) return reducerUtils.setError(state, "Please Select An Item To Delete")

      const orderItem = order.items[order.itemIndex];
      switch (order.selectedItem.type) {
        case "modification": {
          const index = orderItem.modifications.indexOf(order.selectedItem);
          const mod = orderItem.modifications.splice(index, 1);
          if (mod[0].modification === "add") {
            orderItem.modifications = orderItem.modifications.filter(m => m.topping !== mod[0].topping)
          }
          order.items = order.items.toSpliced(order.itemIndex, 1, orderItem);
          order.selectedItem = orderItem;
          break;
        }
        case "comment": {
          const index = orderItem.comments.indexOf(order.selectedItem)
          orderItem.comments.splice(index, 1);
          order.items = order.items.toSpliced(order.itemIndex, 1, orderItem);
          order.selectedItem = orderItem;
          break;
        }
        case "discount": {
          orderItem.discount = undefined;
          order.items = order.items.toSpliced(order.itemIndex, 1, orderItem);
          order.selectedItem = orderItem;
          break;
        }
        case "payment": {
          const index = order.payments.indexOf(order.selectedItem);
          order.payments = order.payments.toSpliced(index, 1);
          const currentPayment = order.payments.reduce((acc, current) => acc + current.value, 0);
          currentPayment > order.total ? order.change = currentPayment - order.total : order.change = 0;
          break;
        }
        // Pizza Option
        default: {
          order.items = order.items.toSpliced(order.itemIndex, 1)
          order.itemIndex = order.items.length > 0 ? order.items.length - 1 : 0;
          order.selectedItem = order.items[order.itemIndex];
          break;
        }
      }

      reducerUtils.calculatePrice(order);

      return ({
        ...state,
        orders: state.orders.toSpliced(state.orderIndex, 1, order)
      })
    }

    case "ADD_PAYMENT": {
      const order = state.orders[state.orderIndex];
      let currentPayment = order.payments.reduce((acc, current) => {
        return acc + current.value;
      }, 0);

      if (currentPayment > order.total) {
        return reducerUtils.setError(state, "Payment already exceeded total");
      }

      order.payments.push({ type: "payment", ...data });
      currentPayment += data.value;

      if (currentPayment > order.total) {
        order.change = parseFloat((currentPayment - order.total).toFixed(2));
      }

      return ({
        ...state,
        orders: state.orders.toSpliced(state.orderIndex, 1, order)
      })
    }
    case "CLOSE_CHECK": {
      // if ()
      return ({
        ...state
      })
    }

    case "SET_ERROR": return reducerUtils.setError(state, data);
    case "CLEAR_ERR": {
      const shouldStayOpen = state.modal.numberpad.display || state.modal.keyboard.display;
      return { ...state, modal: { ...state.modal, open: shouldStayOpen, err: { display: false, message: "" } } }
    }
    case "OPEN_KEYBOARD": return ({
      ...state,
      modal: {
        ...state.modal,
        open: true,
        keyboard: {
          display: true,
          action: data,
        }
      }
    });
    case "CLOSE_KEYBOARD": return ({
      ...state,
      modal: {
        ...state.modal,
        open: false,
        keyboard: {
          display: false,
          action: "",
        }
      }
    });
    case "OPEN_NUMBERPAD": return ({
      ...state,
      modal: {
        ...state.modal,
        open: true,
        numberpad: {
          display: true,
          type: data.type,
          action: data.action,
          name: data.name,
          amount: (state.orders[state.orderIndex].selectedItem as POS.Order.PizzaItem).price
        }
      }
    });
    case "CLOSE_NUMBERPAD": return ({
      ...state,
      modal: {
        ...state.modal,
        open: false,
        numberpad: {
          display: false,
          type: "whole",
          action: "",
          name: "",
          amount: 0,
        }
      }
    });
    case "CLOSE": return ({
      ...state,
      user: undefined
    })
    default: {
      return ({ ...state })
    }
  }
}

export const PosContext = createContext<{ state: POS.Reducer.PosState, dispatch: Dispatch<{ type: string, data?: any }> }>({
  state: initialState,
  dispatch: () => { },
});

export default function PosProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PosContext.Provider value={{ state, dispatch }}>
      {children}
    </PosContext.Provider>
  )
}