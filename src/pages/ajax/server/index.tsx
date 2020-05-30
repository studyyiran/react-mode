import ajax from "common/utils/ajax";

/**
 * 首页相关
 * */
const serverName = "/sunny";

const getUserSunnyUrl = serverName + "/getUserSunny";

export const storeAjaxPageServer = {
  getTestAjaxResult: async () => {
    const res: any = await ajax.get(getUserSunnyUrl);
    return res;
  }
};
