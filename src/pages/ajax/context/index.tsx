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
import {useGetOriginData} from "../../../common/useHook/useGetOriginData";

export const StoreAjaxPageContext = createContext({} as IStoreAjaxPageContext);

// store name
export const StoreAjaxPage = "StoreAjaxPage";
// store state
export interface IStoreAjaxPageState {
  userSunnyValue: number;
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
    userSunnyValue: 101
  };
  const [state, dispatch, useClientRepair] = useGetOriginData(
      reducer,
      initState,
      StoreAjaxPage
  );
  const action: IStoreAjaxPageActions = useStoreAjaxPageGetActions(state, dispatch);

  const propsValue: IStoreAjaxPageContext = {
    ...action,
    useClientRepair,
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
  setUserSunnyValue: "setUserSunnyValue"
};

// reducer
function reducer(state: IStoreAjaxPageState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeAjaxPageReducerTypes.setUserSunnyValue: {
      newState = {
        ...newState,
        userSunnyValue: value && value.sunnyCount
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
