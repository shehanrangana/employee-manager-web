import { createContext, useReducer } from "react";

const SHOW_CONFIRM = "SHOW_CONFIRM";
const HIDE_CONFIRM = "HIDE_CONFIRM";

const initialState = {
  show: false,
  message: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        show: true,
        message: action.payload.message,
      };

    case HIDE_CONFIRM:
      return initialState;

    default:
      return initialState;
  }
};

const ConfirmContext = createContext(initialState);

export const ConfirmProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showConfirm = async (message) => {
    dispatch({ type: "SHOW_CONFIRM", payload: { message } });
    return;
  };

  const hideConfirm = async () => {
    dispatch({ type: "HIDE_CONFIRM" });
    return;
  };

  return <ConfirmContext.Provider value={{ ...state, showConfirm, hideConfirm }}>{children}</ConfirmContext.Provider>;
};

export default ConfirmContext;
