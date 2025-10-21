"use client"
import { createContext, Dispatch, ReactNode, useReducer } from "react";

type user = { _id: string; name: string, position: DataBase.Types.EmploymentPositions };
type reducerState = { user: user | undefined }
type reducerAction = { type: string, data?: any }

const initialState: reducerState = { user: undefined }

const reducer = (state: reducerState, { type, data }: reducerAction): reducerState => {
  switch (type) {
    case "INIT_STATE": return ({
      ...state,
      ...data,
    })
    case "SET_USER": return ({
      ...state,
      user: data,
    });

    case "LOGOUT": return ({
      ...state,
      user: undefined,
    });
    
    default: return ({ ...state })
  }
}

export const OfficeContext = createContext<{ state: reducerState, dispatch: Dispatch<reducerAction> }>({
  state: initialState,
  dispatch: () => { }
});

export default function OfficeProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <OfficeContext.Provider value={{ state, dispatch }}>
        {children}
      </OfficeContext.Provider>
    </>
  )
}