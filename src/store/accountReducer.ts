// action - state management
import { LOGIN, LOGOUT, REGISTER } from "./actions";
import { initialLoginContextProps } from "../types";

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState: initialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

export interface AccountReducerActionProps {
  type: string;
  payload?: initialLoginContextProps;
}

const accountReducer = (
  state = initialState,
  action: AccountReducerActionProps
) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload!;
      return {
        ...state,
        user,
      };
    }
    case LOGIN: {
      const { user } = action.payload!;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
  console.log(state);
};

export default accountReducer;
