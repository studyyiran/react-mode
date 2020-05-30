import React, { useCallback, useRef } from "react";
import { IReducerAction } from "common/interface";
import { storeAjaxPageServer } from "../server";
import { IStoreAjaxPageState, storeAjaxPageReducerTypes } from "./index";

// @actions
export interface IStoreAjaxPageActions {
  getTestAjaxValue: () => any;
}

// useCreateActions
export function useStoreAjaxPageGetActions(
  state: IStoreAjaxPageState,
  dispatch: (action: IReducerAction) => void
) : IStoreAjaxPageActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  return {
    getTestAjaxValue: useCallback(
      async function() {
        const res = await storeAjaxPageServer.getTestAjaxResult();
        dispatch({
          type: storeAjaxPageReducerTypes.setUserSunnyValue,
          value: res
        });
      },
      [dispatch]
    )
  };
}
