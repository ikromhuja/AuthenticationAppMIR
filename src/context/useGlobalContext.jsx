import { createContext, useReducer } from "react";

export const GlobalContext = createContext();
const changeState = (state, action) => {
  switch (action.type) {
    case "CHANGE_USER":
      return { ...state, user: action.payload };
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "AUTH_CHANGE":
      return { ...state, authChange: true };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, { user: null ,authChange:false});
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
