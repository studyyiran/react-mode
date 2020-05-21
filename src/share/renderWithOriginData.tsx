// 这是公用代码
import React from "react";

import { GlobalSettingContextProvider,  } from "../context";
import {OriginDataContextProvider} from "../context/originData";

export function RenderWithOriginData(props: any) {
  return (
      // ssr

        <OriginDataContextProvider>
          <GlobalSettingContextProvider>
          {props.children}
          </GlobalSettingContextProvider>
        </OriginDataContextProvider>

  );
}
