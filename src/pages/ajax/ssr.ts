// 拉取接口。
// 返回。
// 被中间件吃掉。

import { StoreAjaxPage } from "./context";
import {
    IOriginData
} from "common/interface";

export const ajaxPageSsr = async (url: string, href: string) => {
    console.log(href);
    const ssrRes: IOriginData = {
        ssrConfig: {
            ssrTitle: ""
        },
        storeList: []
    };
    const store = {
        storeName: StoreAjaxPage,
        storeData: {
            userSunnyValue: 777
        }
    }

    ssrRes.storeList.push(store)

    return ssrRes
}