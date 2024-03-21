import React, { createContext, useContext, useReducer } from 'react';

const initialState: any = {
  light: {
    light1: {
      hex: '',
      status: false,
    },
    light2: {
      hex: '',
      status: false,
    },
  },
};

const AppExampleContext = createContext(initialState);
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setLight':
      return { ...state, light: action.payload };
    default:
      return state;
  }
};

export const AppMobileProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppExampleContext.Provider value={{ state, dispatch }}>
      {children}
    </AppExampleContext.Provider>
  );
};

export const useAppExampleContext = () => {
  const context = useContext(AppExampleContext);
  if (!context) {
    throw new Error(
      'AppExampleContext must be used within an AppExampleProvider'
    );
  }
  return context;
};
