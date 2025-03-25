import { Dispatch, useEffect, useReducer } from "react";
import { v4 } from 'uuid';

import * as reducerUtils from "@/app/utils/posReducerUtils";

// const initialState: POS.Reducer.PosState = 

const reducer = (state: POS.Reducer.PosState, { type, data }: POS.Reducer.PosAction): POS.Reducer.PosState => {
  // console.log(type, data);
  switch (type) {
    case "INIT_STATE": {
      return ({ ...state, ...data, currentSize: data.dough[data.dough.length - 1]._id });
    }
    case "SET_SIZE": {
      return ({
        ...state,
        currentSize: data,
        views: {
          ...state.views,
          menu: "Traditional"
        }
      });
    }
    case "SET_PIZZA": {
      return ({
        ...state,
        currentPizza: data._id,
        toppingPreview: data.toppings,
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
        price: 0,
      }],
      orderIndex: state.orders.length
    });
    case "SELECT_ORDER": return ({
      ...state,
      orderIndex: data
    });
    case "DELETE_ORDER": {
      if (state.orders.length > 1) { state.orders.splice(state.orderIndex, 1); }
      else state.orders.splice(state.orderIndex, 1, {
        selectedItem: undefined,
        toppingMod: undefined,
        name: undefined,
        items: [],
        itemIndex: 0,
        price: 0
      });
      return ({
        ...state,
        orderIndex: 0
      })
    }

    case "SET_ORDER_NAME": return ({
      ...state,
      orders: reducerUtils.replaceOrder(state, {
        ...state.orders[state.orderIndex],
        name: data,
      })
    })

    case "SET_MODIFICATION": return ({
      ...state,
      orders: reducerUtils.replaceOrder(state, {
        ...reducerUtils.getOrder(state),
        toppingMod: data,
      })
    });

    case "CREATE_ITEM": {
      if (!state.currentPizza) return reducerUtils.setError(state, "Please Select Pizza")

      const order = reducerUtils.getOrder(state);
      const pizza = reducerUtils.getPizza(state, state.currentPizza);
      const sizeIndex = state.dough.indexOf(state.dough.find(dough => dough._id === state.currentSize)!)
      const newItem: POS.Reducer.OrderItem<"pizza"> = {
        id: v4(),
        portion: 'whole',
        modifications: [],
        comments: [],
        type: "pizza",
        pizzas: [pizza._id],
        price: pizza.prices![sizeIndex].price,
        size: state.currentSize,
      }

      order.selectedItem = newItem;
      order.items.push(newItem);
      reducerUtils.calculatePrice(order);

      return ({ ...state, orders: reducerUtils.replaceOrder(state, order) })
    }
    case "SELECT_ITEM": {
      const order = reducerUtils.getOrder(state);
      order.selectedItem = data;
      switch (data.type) {
        case "pizza": {
          state.toppingPreview = reducerUtils.getPizza(state, data.pizzas[0]).toppings;
          order.itemIndex = order.items.indexOf(data);
          state.currentPizza = data._id
          break;
        }
        default: {
          order.itemIndex = order.items.indexOf(
            order.items.find((i) => i.id === data.parent)!
          )
          break;
        }
        // Pizza Option
      }
      const orders = reducerUtils.replaceOrder(state, order);
      return ({ ...state, orders });
    }
    case "CHANGE_SIZE": {
      const order = reducerUtils.getOrder(state);

      if (order.selectedItem?.type !== "pizza") return reducerUtils.setOperationNotValidError(state);

      const item = order.selectedItem as POS.Reducer.OrderItem<"pizza">
      const size = state.dough.find(d => d._id === item.size);
      const index = state.dough.indexOf(size!);

      if (data === "up") item.size = state.dough[index < state.dough.length ? index + 1 : index]._id;
      if (data === "down") item.size = state.dough[index > 0 ? index - 1 : index]._id;

      order.items.splice(order.itemIndex, 1, item);
      state.orders.splice(state.orderIndex, 1, order);

      return ({ ...state });
    }
    case "MODIFY_ITEM": {
      const order = reducerUtils.getOrder(state);
      let orderItem;

      if (!order.selectedItem) return reducerUtils.setError(state, "Please Add Pizza To Order Before Modifying");

      if (order.selectedItem.type !== "pizza") return reducerUtils.setOperationNotValidError(state);

      orderItem = order.selectedItem as POS.Reducer.OrderItem<"pizza">;
      const pizza = reducerUtils.getPizza(state, orderItem.pizzas[0]);
      const topping = state.toppings.find(t => t._id === data);

      const onPizza = pizza.toppings.includes(data);
      const inModifications = orderItem.modifications.find(m => m.topping === data);
      const index = inModifications
        ? orderItem.modifications.indexOf(orderItem.modifications.find(m => m.topping === data)!)
        : undefined;

      switch (order.toppingMod) {
        case "extra": {
          if (onPizza || inModifications) {
            orderItem.modifications.splice(index ? index + 1 : orderItem.modifications.length, 0,
              { parent: orderItem.id, type: "modification", modification: "extra", topping: data, price: topping!.price }
            );
          } else {
            orderItem.modifications.splice(orderItem.modifications.length, 0,
              { parent: orderItem.id, type: "modification", modification: "add", topping: data, price: topping!.price },
              { parent: orderItem.id, type: "modification", modification: "extra", topping: data, price: topping!.price }
            );
          }
          break;
        }
        case "less": {
          if (onPizza || inModifications) {
            orderItem.modifications.splice(index ? index + 1 : orderItem.modifications.length, 0,
              { parent: orderItem.id, type: "modification", modification: "less", topping: data, price: 0 }
            );
          } else {
            orderItem.modifications.splice(orderItem.modifications.length, 0,
              { parent: orderItem.id, type: "modification", modification: "add", topping: data, price: topping!.price },
              { parent: orderItem.id, type: "modification", modification: "less", topping: data, price: 0 }
            );
          }
          break;
        }
        // Add or Remove
        default: {
          if (inModifications) {
            orderItem.modifications = orderItem.modifications.filter(m => m.topping !== data);

          } else if (onPizza) {
            orderItem.modifications.push({ parent: orderItem.id, type: "modification", modification: "no", topping: data, price: 0 });
          } else {
            orderItem.modifications.push({ parent: orderItem.id, type: "modification", modification: "add", topping: data, price: topping!.price });
          }
          break;
        }
      }

      order.toppingMod = undefined;

      reducerUtils.calculatePrice(order);

      const orders = reducerUtils.replaceOrder(state, order)
      return ({ ...state, orders });
    }

    case "ADD_COMMENT": {
      const order = reducerUtils.getOrder(state);

      if (!order.selectedItem) return reducerUtils.setError(state, "Please Select An Item")
      if (order.selectedItem?.type !== "pizza") return reducerUtils.setOperationNotValidError(state)

      const comment: POS.Reducer.CommentItem = {
        parent: order.selectedItem.id,
        type: "comment",
        name: data.name,
        message: data.name === "Custom" ? data.message : data.name,
      }

      order.selectedItem.comments.push(comment);
      return ({
        ...state,
        orders: reducerUtils.replaceOrder(state, order),
      })
    }
    case "ADD_DISCOUNT": {
      const order = reducerUtils.getOrder(state);

      if (order.selectedItem?.type !== "pizza") return reducerUtils.setOperationNotValidError(state);

      if (order.selectedItem.discount) return reducerUtils.setError(state, "Item Is Already Discounted")

      order.selectedItem.discount = {
        type: "discount",
        parent: order.selectedItem.id,
        name: data.name,
        amount: data.amount
      };
      reducerUtils.calculatePrice(order);

      return ({
        ...state,
        orders: reducerUtils.replaceOrder(state, order),
      })
    }

    case "DELETE_SELECTED": {
      const order = reducerUtils.getOrder(state);

      if (!order.selectedItem) return reducerUtils.setError(state, "Please Select An Item To Delete")

      const orderItem = reducerUtils.getOrderItem(state);
      switch (order.selectedItem.type) {
        case "modification": {
          const index = orderItem.modifications.indexOf(order.selectedItem);
          const mod = orderItem.modifications.splice(index, 1);
          if (mod[0].modification === "add") {
            orderItem.modifications = orderItem.modifications.filter(m => m.topping !== mod[0].topping)
          }
          order.items.splice(order.itemIndex, 1, orderItem);
          order.selectedItem = orderItem;
          break;
        }
        case "comment": {
          const index = orderItem.comments.indexOf(order.selectedItem)
          orderItem.comments.splice(index, 1);
          order.items.splice(order.itemIndex, 1, orderItem);
          order.selectedItem = orderItem;
          break;
        }
        case "discount": {
          orderItem.discount = undefined;
          order.items.splice(order.itemIndex, 1, orderItem);
          order.selectedItem = orderItem;
          break;
        }
        // Pizza Option
        default: {
          order.items.splice(order.itemIndex, 1)
          order.itemIndex = order.items.length > 0 ? order.items.length - 1 : 0;
          order.selectedItem = order.items[order.itemIndex];
          break;
        }
      }

      reducerUtils.calculatePrice(order);

      return ({
        ...state,
        orders: reducerUtils.replaceOrder(state, {
          ...order
        })
      })
    }

    case "SET_MAIN_VIEW": {
      return ({
        ...state,
        views: {
          ...state.views,
          main: data,
        }
      })
    }
    case "SET_MENU_VIEW": {
      return ({
        ...state,
        views: {
          ...state.views,
          menu: data,
        }
      })
    }

    case "SET_ERROR": return reducerUtils.setError(state, data);
    case "CLEAR_ERR": {
      return { ...state, modal: { ...state.modal, open: false, err: { display: false, message: "" } } }
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
    case "OPEN_NUMBERPAD": 
    console.log("open number pad", data)
    return ({
      ...state,
      modal: {
        ...state.modal,
        open: true,
        numberpad: {
          display: true,
          type: data.type,
          action: data.action,
          data: { name: data.name },
        }
      }
    });
    case "CLOSE_NUMBERPAD": return ({
      ...state,
      modal: {
        ...state.modal,
        open: false,
        numberpad: {
          display: true,
          type: "whole",
          action: "",
          data: {},
        }
      }
    });
    default: {
      return ({ ...state })
    }
  }
}

export default function UseOrderReducer(): [POS.Reducer.PosState, Dispatch<POS.Reducer.PosAction>] {
  const [state, dispatch] = useReducer(reducer, {
    dough: [],
    sections: [],
    pizzas: [],
    toppings: [],
    currentSize: "",
    currentPizza: "",
    toppingPreview: [],
    orders: [{
      selectedItem: undefined,
      toppingMod: undefined,
      name: undefined,
      items: [],
      itemIndex: 0,
      price: 0,
    }],
    orderIndex: 0,
    views: {
      main: "Menu",
      menu: "Traditional",
    },
    modal: {
      open: false,
      err: { display: false, message: "" },
      keyboard: { display: false, action: "" },
      numberpad: { display: false, type: "whole", action: "", data: {} },
    },
  });

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  return [state, dispatch];
}