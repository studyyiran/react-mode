// 拉取接口。
// 返回。
// 被中间件吃掉。

import { StoreAjaxPage } from "./context";
import {
    IOriginData
} from "common/interface";
import {storeAjaxPageServer} from "./server";

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
            userSunnyValue: 0
        }
    }
    const result = await storeAjaxPageServer.getTestAjaxResult()
    if (result) {
        store.storeData.userSunnyValue = result.sunnyCount
    }
    ssrRes.storeList.push(store)

    return ssrRes
}