import React, {createContext, useReducer, useEffect, useCallback} from "react";
// 引入请求层
import {storeAjaxPageServer} from "../server";

export const StoreAjaxPageContext = createContext({});

export interface IReducerAction {
  type: string;
  value?: any;
}

// store name
export const StoreAjaxPage = "StoreAjaxPage";

// store state
export interface IStoreAjaxPageState {
  testValue: number;
}

// store context value
export interface IStoreAjaxPageContext extends IStoreAjaxPageActions {
  storeAjaxPageContextValue: IStoreAjaxPageState;
  storeAjaxPageContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreAjaxPageContextProvider(props: any) {
  const initState: IStoreAjaxPageState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(reducer, initState);

  // 传入state dispatch -> actions请求中间体
  const action: IStoreAjaxPageActions = useStoreAjaxPageGetActions(
    state,
    dispatch
  );

  // global useEffect
  const { getTestAjaxValue } = action;
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);

  const contextValue: IStoreAjaxPageContext = {
    // contextValue = 所有的请求中间体 + stateValue + dispatch
    ...action,
    storeAjaxPageContextValue: state,
    storeAjaxPageContextDispatch: dispatch
  };
  return <StoreAjaxPageContext.Provider value={contextValue} {...props} />;
}

// actions type
export interface IStoreAjaxPageActions {
  getTestAjaxValue: () => void;
}

// useGetActions
export function useStoreAjaxPageGetActions (
  state: IStoreAjaxPageState,
  dispatch: (action: IReducerAction) => void
): IStoreAjaxPageActions {
  // useCallBack包装得到了一个: 依赖于状态的函数.
  const getTestAjaxValue = useCallback(async function() {
    const res = await storeAjaxPageServer.getTestAjaxResult();
    dispatch({
      type: storeAjaxPageReducerTypes.setTestValue,
      value: res
    });
  }, [dispatch])
  return {
    getTestAjaxValue
  };
}

// reducer action types
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