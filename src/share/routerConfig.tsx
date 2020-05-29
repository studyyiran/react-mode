import React from "react";
import {MainPage} from "../pages/main";
import {SubPage} from "../pages/sub";

export const routerConfig = [
  {
    path: "/main",
    title: "main",
    Component: MainPage
  },
  {
    path: "/sub",
    title: "sub",
    Component: SubPage
  },
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
