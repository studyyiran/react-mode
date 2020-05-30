// 这是公用代码
import React from "react";

import { GlobalSettingContextProvider } from "../context";
import { OriginDataContextProvider } from "../context/originData";
import { StoreAjaxPageContextProvider } from "../pages/ajax/context";
import {IOriginData} from "../common/interface";

interface IRenderWithOriginData {
    originData?: IOriginData
}

export const RenderWithOriginData: React.FC<IRenderWithOriginData> = props => {
  return (
    <OriginDataContextProvider originData={props.originData}>
      <GlobalSettingContextProvider>
        <StoreAjaxPageContextProvider>
          {props.children}
        </StoreAjaxPageContextProvider>
      </GlobalSettingContextProvider>
    </OriginDataContextProvider>
  );
}
