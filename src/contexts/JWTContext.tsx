import React, { createContext, useEffect, useReducer } from "react";

// third-party
import { Chance } from "chance";
import { jwtDecode, JwtPayload } from "jwt-decode";

// reducer - state management
import { LOGIN, LOGOUT } from "../store/actions";
import accountReducer from "../store/accountReducer";
// project imports
import Loader from "../ui-component/Loader";
import { initialLoginContextProps, KeyedObject } from "../types";
import { JWTContextType } from "../types/auth";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../utils/mutations/userMutations";
import { GET_CURRENT_USER } from "../utils/querys/userQuery";

const chance = new Chance();

// constant
const initialState: initialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  // const decoded: KeyedObject = jwtDecode(serviceToken);
  const decoded: KeyedObject = jwtDecode<JwtPayload>(serviceToken);

  // Returns with the JwtPayload type
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return Date.now() < decoded.exp * 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem("serviceToken", serviceToken);
    // axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem("serviceToken");
    localStorage.clear();
    // delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);
  const { refetch } = useQuery(GET_CURRENT_USER);
  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem("serviceToken");
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          //QUERY CLIENT
          const response = await refetch()

          const { user } = response.data.me;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user,
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT,
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginUser({ variables: { input: { email: email, password: password } } })
    const { accessToken, user } = response.data.login
    setSession(accessToken);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user,
      },
    });
  };

  const register = async (
    // avatar: any,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const data = await createUser({ variables: { input: { firstName: firstName, lastName: lastName, email: email, password: password, phone: phoneNumber } } })
    let users = data.data?.createUser?.user;
    if (
      window.localStorage.getItem("users") !== undefined &&
      window.localStorage.getItem("users") !== null
    ) {
      const localUsers = window.localStorage.getItem("users");
      users = [
        ...JSON.parse(localUsers!),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`,
        },
      ];
    }
    window.localStorage.setItem("users", JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = () => { };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
