import { IStoreInfo } from "../../context/originData";

export interface IReducerAction {
  type: string;
  value?: any;
}

export interface IOriginData {
  ssrConfig: {
    ssrTitle: string;
    metaDesc?: string;
    jsonInfo?: string;
  };
  storeList: IStoreInfo[];
}

export interface IContextValue {
  useClientRepair?: any;
}
