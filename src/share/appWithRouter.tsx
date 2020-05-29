import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { scrollTop } from "common/utils";
import { routerConfig } from "share/routerConfig";
import { RenderWithOriginData } from "share/renderWithOriginData";
import { IOriginData } from "context/originData";
import hocDocumentTitle from "common/components/documentTitle";
import './index.less';

export const AppWithRouter = () => {
  // 这段脚本只在浏览器运行 从window中获取.进行脱水
    const originData = {}
  // let originData: IOriginData[] = (window as any).SSRDATA
  //   ? (window as any).SSRDATA
  //   : undefined;
  // router是最外层
  // 然后是provider层,这样store可以使用router的信息
  // 然后是组件渲染层.
  // 这个层次结构应该和serve是一致的,因为需求是类似的.
  return (
      <RenderWithOriginData originData={originData}>
          <Switch>
              {routerConfig.map(
                  (
                      { path, Component, exact, ...otherConfig }: any,
                      index: number
                  ) => (
                      <Route
                          exact={exact}
                          key={path}
                          path={path}
                          component={hocWithLayout(Component, otherConfig)}
                      />
                  )
              )}
              <Redirect to={routerConfig[0].path} />
          </Switch>
      </RenderWithOriginData>
  );
}

function hocWithLayout(Component: any, otherConfig: any) {
  const { title, header, footer } = otherConfig;
  const NewComponent = (routerProps: any) => {
    useEffect(() => {
      // 路由跳转钩子K
      scrollTop();
    }, [routerProps.match.url]);
    return (
      <div className="layout">
        <header>
          {/*  from v12-25 to 3-31 to 4-31 to 512（sunny）*/}
          {/*  <UserSunny />*/}
          {/*<PlayerGrowthInfoContainer />*/}
        </header>
          {/*<div className="testtest">*/}
          {/*    <p>中国 清单 hehe score 123</p>*/}
          {/*</div>*/}
        <main>
          <Component {...routerProps} />
        </main>
      </div>
    );
  };
  return hocDocumentTitle(NewComponent)(title);
}
