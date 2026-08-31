"use client"

import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { v4 } from 'uuid';

// import * as reducerUtils from "@/utils/posReducerUtils";
import { PosProps } from "@/app/pos/layout";
import {
  isComment,
  isDiscount,
  isModification,
  isPayment,
  isPizza,
  Order,
  ItemComponent,
  Pizza,
} from "@/app/pos/classes";
import { Modal } from "@/app/components";
import { ErrorScreen, Notice, OrderSubmit } from "@/app/pos/components";

const initialState: POS.Reducer.PosState = {
  user: undefined,
  sections: [],
  dough: [],
  pizzas: [],
  toppings: [],
  section: "",
  pizza: "",
  toppingType: "Sauce",
  index: 0,
  orders: [new Order()],
  modal: {
    display: false,
    child: undefined,
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

      return ({ ...state, user: user })
    }
    case "CLOCK_OUT": {
      const user = state.user;
      if (user) user.employment.clocked_in = false;

      return ({ ...state, user: undefined })
    }
    case "SET_SECTION": {
      return ({ ...state, section: data, })
    }
    case "SET_PIZZA": {
      return { ...state, pizza: data, }
    }
    case "SET_TOPPING_TYPE": {
      return ({ ...state, toppingType: data, })
    }
    case "SET_PORTIONING": {
      const order = state.orders[state.index];
      order.portion = data;
      return ({ ...state, orders: state.orders.toSpliced(state.index, 1, order) })
    }
    case "CREATE_ORDER": {
      return ({
        ...state,
        orders: state.orders.toSpliced(state.orders.length, 0, new Order()),
        index: state.orders.length,
      })
    }
    case "SELECT_ORDER": {
      return ({ ...state, index: data, })
    }
    case "DELETE_ORDER": {
      return ({
        ...state,
        orders: state.orders.length > 1
          ? state.orders.toSpliced(state.index, 1)
          : state.orders.toSpliced(state.index, 1, new Order()),
        index: 0,
      })
    }
    case "SELECT_ITEM": {
      const order = state.orders[state.index];
      order.selected = data;
      return ({
        ...state,
        pizza: isPizza(data) ? state.pizzas.find(p => p._id === data.item)!._id : state.pizza,
        orders: state.orders.toSpliced(state.index, 1, order),
      })
    }
    case "ADD_PIZZA": {
      const pizza = state.pizzas.find(p => p._id === data.pizza);
      const price = pizza?.prices.find(d => d.size === data.size);
      if (!pizza) return ({ ...state });

      const order = state.orders[state.index];
      order.addItem({
        item: pizza._id,
        type: "pizza",
        cost: price?.cost as number,
        size: price?.size as string,
        toppings: pizza.toppings.map(t => t.item) as string[],
      });

      return ({ ...state, orders: state.orders.toSpliced(state.index, 1, order) })
    }
    case "UP_SIZE": {
      const order = state.orders[state.index];
      const selected = order.selected
      if (!selected || !(isPizza(selected))) return ({
        ...state,
        modal: {
          display: true,
          child: <ErrorScreen message="Either No Item Is Selected Or The Selected Item is Not A Pizza" />
        }
      });

      const dough = state.dough.find(d => d._id === selected.size)!
      const index = state.dough.indexOf(dough);
      if (index + 1 === state.dough.length) return ({
        ...state,
        modal: {
          display: true,
          child: <Notice message="No larger size" />
        }
      });

      selected.size = state.dough[index + 1]._id;

      order.replaceItem(selected);

      return ({
        ...state,
        orders: state.orders.toSpliced(state.index, 1, order)
      })
    }
    case "DOWN_SIZE": {
      const order = state.orders[state.index];
      const selected = order.selected;
      if (!selected || !(isPizza(selected))) return ({
        ...state,
        modal: {
          display: true,
          child: <ErrorScreen message="Either No Item Is Selected Or The Selected Item is Not A Pizza" />
        }
      });

      const dough = state.dough.find(d => d._id === selected.size)!
      const index = state.dough.indexOf(dough);
      if (index - 1 < 0) return ({
        ...state,
        modal: {
          display: true,
          child: <Notice message="No larger size" />
        }
      });

      selected.size = state.dough[index - 1]._id;

      order.replaceItem(selected);

      return ({
        ...state,
        orders: state.orders.toSpliced(state.index, 1, order)
      })
    }
    case "MODIFY_ITEM": {
      const order = state.orders[state.index];
      const item = order.selected;

      if (!item || !(isPizza(item))) return ({
        ...state,
        modal: {
          display: true,
          child: <ErrorScreen message="Please Select An Item before Modifying Toppings" />
        }
      });

      const topping = state.toppings.find(t => t._id === data);
      if (!topping) return ({
        ...state,
        modal: {
          display: true,
          child: <ErrorScreen message="No Topping Found In Modification" />
        }
      });

      let mod = item.findModification(data);

      if (mod) {
        if (!order.portion) item.removeModification(mod);
        else item.addModification(topping, order.portion);
      } else item.addModification(topping, order.portion);


      order.replaceItem(item);
      order.portion = undefined;

      return ({
        ...state,
        orders: state.orders.toSpliced(state.index, 1, order),
      })
    }
    case "ADD_COMMENT": {
      const order = state.orders[state.index];
      const item = order.selected;
      if (!item || !(isPizza(item))) return ({
        ...state,
        modal: {
          display: true,
          child: <ErrorScreen message="Please Select An Item before Applying Comments" />
        }
      });

      item.addComent(data);
      order.replaceItem(item);

      return ({
        ...state,
        orders: state.orders.toSpliced(state.index, 1, order),
      })
    }
    case "ADD_DISCOUNT": {
      const order = state.orders[state.index];
      const item = order.selected;

      if (!item || !(isPizza(item))) return ({
        ...state,
        modal: {
          display: true,
          child: <ErrorScreen message="Please Select An Item before Applying Discount" />
        }
      });

      item.addDiscount(
        data.text,
        data.category === "percentage"
          ? item.price * (+data.amount / 100)
          : +data.amount
      );
      order.replaceItem(item);

      return ({
        ...state,
        orders: state.orders.toSpliced(state.index, 1, order),
      })
    }
    case "DELETE_ITEM": {
      const order = state.orders[state.index];
      const item = order.selected;
      if (!item) return ({
        ...state,
        modal: {
          display: true,
          child: <Notice message="Please Select An Item before Deleting" />
        }
      });

      if (isPizza(item)) order.removeItem();
      else if (isPayment(item)) order.removePayment(item);
      else {
        const pizza = order.items.find(i => i === (item as ItemComponent).parent);
        if (!pizza) return ({ ...state });

        if (isModification(item)) {
          (pizza as Pizza).removeModification(item);
        }
        if (isComment(item)) {
          pizza.removeComment(item);
        }
        if (isDiscount(item)) {
          pizza.removeDiscount();
        }

        order.replaceItem(pizza);
      }

      return ({
        ...state,
        orders: state.orders.toSpliced(state.index, 1, order)
      });
    }
    case "ADD_PAYMENT": {
      const order = state.orders[state.index];
      if (order.items.length === 0) return ({
        ...state,
        modal: {
          display: true,
          child: <Notice message="Add an item to order before adding payment" />
        }
      })
      order.addPayment(data.source, +data.amount);
      return ({
        ...state,
        orders: state.orders.toSpliced(state.index, 1, order),
        modal: order.status === "closed" ? {
          display: true,
          child: <OrderSubmit />
        } : state.modal
      })
    }
    case "OPEN_MODAL": {
      return ({
        ...state,
        modal: {
          display: true,
          child: data,
        }
      })
    }
    case "CLOSE_MODAL": {
      return ({
        ...state,
        modal: {
          display: false,
          child: undefined,
        }
      })
    }
    case "SET_ERROR": {
      return ({
        ...state,
        modal: {
          display: true,
          child: <ErrorScreen message={data} />
        }
      })
    }
    default: return ({ ...state });
  }
}

export const PosContext = createContext<{ state: POS.Reducer.PosState, dispatch: Dispatch<{ type: string, data?: any }> }>({
  state: initialState,
  dispatch: () => { },
});

type ProviderProps = { props: PosProps, className: string, children: ReactNode | ReactNode[] }
export default function PosProvider({ props, className, children }: ProviderProps) {
  const [state, dispatch] = useReducer(
    reducer,
    { ...initialState },
    (state: POS.Reducer.PosState) => ({
      ...state,
      ...props,
      section: props.sections[0]._id,
      pizza: props.pizzas.filter(p => p.section === props.sections[0]._id)[0]._id,
    })
  );

  // console.log("state", state)

  return (
    <PosContext.Provider value={{ state, dispatch }}>
      <main className={className}>
        {state.modal.display && <Modal>{state.modal.child}</Modal>}
        {children}
      </main>
    </PosContext.Provider>
  )
}