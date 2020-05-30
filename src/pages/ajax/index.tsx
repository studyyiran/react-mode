import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreAjaxPageContext, StoreAjaxPageContext } from "./context";

interface IAjaxPage {

}

export const AjaxPage: React.FC<IAjaxPage> = props => {
  // 修改testValue
  // 修改StoreAjaxPage
  // 引入context
  const storeAjaxPageContext = useContext(StoreAjaxPageContext);
  const {
    storeAjaxPageContextValue,
    getTestAjaxValue
  } = storeAjaxPageContext as IStoreAjaxPageContext;
  // 从context中获取值
  const { testValue } = storeAjaxPageContextValue;
  // local发起请求
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);
  // 渲染
  return <div className="test-page">{testValue}</div>;
}
