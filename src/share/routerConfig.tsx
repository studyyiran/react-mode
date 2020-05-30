import React from "react";
import {MainPage} from "../pages/main";
import {SubPage} from "../pages/sub";
import {AjaxPage} from "../pages/ajax";

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
  {
    path: "/ajax",
    title: "ajax",
    Component: AjaxPage
  },
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
