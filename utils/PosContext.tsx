"use client"

import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { v4 } from 'uuid';

import * as reducerUtils from "@/utils/posReducerUtils";

const initialState: POS.Reducer.PosState = {
  user: undefined,
  orderIndex: 0,
  section: "",
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
    case "SET_SECTION": {
      return ({
        ...state,
        section: data,
      })
    }
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