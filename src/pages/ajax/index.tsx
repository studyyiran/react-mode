import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreAjaxPageContext, StoreAjaxPageContext } from "./context";

interface IAjaxPage {}

export const AjaxPage: React.FC<IAjaxPage> = (props) => {
  // 修改userSunnyValue
  // 修改StoreAjaxPage
  // 引入context
  const storeAjaxPageContext = useContext(StoreAjaxPageContext);
  const {
    storeAjaxPageContextValue,
    getTestAjaxValue,
    useClientRepair,
  } = storeAjaxPageContext as IStoreAjaxPageContext;
  // 从context中获取值
  const { userSunnyValue } = storeAjaxPageContextValue;
  // local发起请求
  // useClientRepair();
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);
  // 渲染
  return <div className="test-page">{userSunnyValue}</div>;
};
