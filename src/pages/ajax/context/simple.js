import React, {
  createContext,
  useReducer,
  useCallback
} from "react";
// 引入请求层
import { storeAjaxPageServer } from "../server";

export const StoreAjaxPageContext = createContext({});

// store name
export const StoreAjaxPage = "StoreAjaxPage";


// store provider
export function StoreAjaxPageContextProvider(props) {
  const initState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(reducer, initState);

  // 传入state dispatch -> actions请求中间体
  const action = useStoreAjaxPageGetActions(
    state,
    dispatch
  );

  const contextValue = {
    // contextValue = 所有的请求中间体 + stateValue + dispatch
    ...action,
    storeAjaxPageContextValue: state,
    storeAjaxPageContextDispatch: dispatch
  };
  return <StoreAjaxPageContext.Provider value={contextValue} {...props} />;
}

// useGetActions
export function useStoreAjaxPageGetActions(
  state,
  dispatch
) {
  // useCallBack包装得到了一个: 依赖于状态的函数.
  const getTestAjaxValue = useCallback(
    async function(n) {
      const res = await storeAjaxPageServer.getTestAjaxResult(n);
      dispatch({
        type: storeAjaxPageReducerTypes.setTestValue,
        value: res
      });
    },
    [dispatch]
  );
  return {
    getTestAjaxValue
  };
}

// reducer action types
export const storeAjaxPageReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state, action) {
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
