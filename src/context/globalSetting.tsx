import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useState
} from "react";
import { IReducerAction } from "common/interface";
import {isServer} from "common/utils";
import ajax from "common/utils/ajax";
import { useGetOriginData } from "common/useHook/useGetOriginData";
import { getBlackFiveTime } from "./server";

export const GlobalSettingContext = createContext({});
export const StoreNameGlobalSetting = "GlobalSetting";

// state
interface IContextState {
  isMobile: boolean;
  categoryId: string;
  blackHappyHour: number;
  isBlackHappyHour: boolean;
  blackHappyCountDown: any[];
}

// @provider
export function GlobalSettingContextProvider(props: any) {
  const initState: IContextState = {
    isMobile: false,
    categoryId: "",
    blackHappyHour: -1, // 只在初始化的时候设定
    isBlackHappyHour: false,
    blackHappyCountDown: []
  };
  const [state, dispatch, useClientRepair] = useGetOriginData(
    reducer,
    initState,
    StoreNameGlobalSetting
  );
  const action: IContextActions = useGetAction(state, dispatch);
  useEffect(() => {
    if (!isServer()) {
      // if (window.addEventListener) {
      //   window.addEventListener(
      //     "resize",
      //     () => {
      //       action.setIsMobile();
      //     },
      //     false
      //   );
      // }
    }
    action.setIsMobile();
  }, []);

  useEffect(() => {
    const CategoryId = "1";
    dispatch({ type: "setCategoryId", value: CategoryId });
  }, []);

  const propsValue: IGlobalSettingContext = {
    ...useClientRepair,
    ...action,
    globalSettingContextValue: state,
    globalSettingContextDispatch: dispatch
  };
  return <GlobalSettingContext.Provider value={propsValue} {...props} />;
}

// @actions
interface IContextActions {
  setIsMobile: () => void;
  emailSubscribed: (email: string) => any;
  getBlackFiveTime: () => any;
  resetFiveAct: () => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    resetFiveAct: function() {
      dispatch({
        type: reducerActionTypes.setIsBlackHappyHour,
        value: false
      });
    },
    getBlackFiveTime: (async function() {
      const res = await getBlackFiveTime();
      if (res && res > 0) {
        dispatch({
          type: reducerActionTypes.setBlackHappyHour,
          value: res
        });
        dispatch({
          type: reducerActionTypes.setIsBlackHappyHour,
          value: true
        });
      }
    }),
    setIsMobile: (async function() {
      const clientWidth = document.body.clientWidth;
      if (clientWidth <= 700) {
        dispatch({ type: reducerActionTypes.setIsMobile, value: true });
        document.body.classList.add("ismobile");
        (document.querySelector("body") as any).setAttribute("id", "ismobile");
      } else {
        dispatch({ type: reducerActionTypes.setIsMobile, value: false });
        document.body.classList.remove("ismobile");
        (document.querySelector("body") as any).setAttribute("id", "");
      }
    }),
    emailSubscribed: (async function(a: any,) {
      return ajax.post("/message_books/subscribed", { userEmail: a });
    })
  };
  actions.setIsMobile = useCallback(actions.setIsMobile, []);
  return actions;
}

// interface
export interface IGlobalSettingContext extends IContextActions {
  globalSettingContextValue: IContextState;
  globalSettingContextDispatch: (action: IReducerAction) => void;
}

// action types
const reducerActionTypes = {
  setIsMobile: "setIsMobile",
  setCategoryId: "setCategoryId",
  setBlackHappyHour: "setBlackHappyHour",
  setBlackHappyCountDown: "setBlackHappyCountDown",
  setIsBlackHappyHour: "setIsBlackHappyHour"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case reducerActionTypes.setIsBlackHappyHour: {
      newState = {
        ...newState,
        isBlackHappyHour: value
      };
      break;
    }
    case reducerActionTypes.setBlackHappyCountDown: {
      newState = {
        ...newState,
        blackHappyCountDown: value
      };
      break;
    }
    case reducerActionTypes.setBlackHappyHour: {
      newState = {
        ...newState,
        blackHappyHour: value
      };
      break;
    }
    case reducerActionTypes.setIsMobile: {
      newState = {
        ...newState,
        isMobile: value
      };
      break;
    }
    case reducerActionTypes.setCategoryId: {
      newState = {
        ...newState,
        categoryId: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
