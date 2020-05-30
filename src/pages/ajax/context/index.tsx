import React, {
  createContext,
  useReducer,
  useEffect
} from "react";
import { IReducerAction, IContextValue } from "common/interface";
// import { callBackWhenPassAllFunc } from "common/utils/util";
// import { useIsCurrentPage } from "common/useHook";
import useReducerMiddleware from "common/useHook/useReducerMiddleware";

import {IStoreAjaxPageActions, useStoreAjaxPageGetActions} from "./useGetActions";

export const StoreAjaxPageContext = createContext({} as IStoreAjaxPageContext);

// store name
export const StoreAjaxPage = "StoreAjaxPage";
// store state
export interface IStoreAjaxPageState {
  testValue: number;
}

// interface
export interface IStoreAjaxPageContext
  extends IStoreAjaxPageActions,
    IContextValue {
  storeAjaxPageContextValue: IStoreAjaxPageState;
  storeAjaxPageContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreAjaxPageContextProvider(props: any) {
  const initState: IStoreAjaxPageState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreAjaxPageActions = useStoreAjaxPageGetActions(state, dispatch);

  const propsValue: IStoreAjaxPageContext = {
    ...action,
    storeAjaxPageContextValue: state,
    storeAjaxPageContextDispatch: dispatch
  };
  return <StoreAjaxPageContext.Provider value={propsValue} {...props} />;

  // const isPage = useIsCurrentPage("/test");
  // @useEffect
  // useEffect(() => {
  //   // 1 当前页面
  //   callBackWhenPassAllFunc([() => isPage], action.getTestAjaxValue);
  // }, [action.getTestAjaxValue, isPage]);
}



// action types
export const storeAjaxPageReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state: IStoreAjaxPageState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeAjaxPageReducerTypes.setTestValue: {
      newState = {
        ...newState,
        testValue: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
