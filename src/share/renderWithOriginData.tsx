// 这是公用代码
import React from "react";

import { GlobalSettingContextProvider } from "../context";
import { OriginDataContextProvider } from "../context/originData";
import { StoreAjaxPageContextProvider } from "../pages/ajax/context";

export function RenderWithOriginData(props: any) {
  return (
    <OriginDataContextProvider>
      <GlobalSettingContextProvider>
        <StoreAjaxPageContextProvider>
          {props.children}
        </StoreAjaxPageContextProvider>
      </GlobalSettingContextProvider>
    </OriginDataContextProvider>
  );
}
