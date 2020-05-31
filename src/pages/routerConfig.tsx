import React from "react";
import {MainPage} from "./main";
import {SubPage} from "./sub";
import {AjaxPage} from "./ajax";
import {ajaxPageSsr} from "./ajax/ssr";

export const routerConfig = [
  {
    path: "/main",
    title: "main",
    Component: MainPage,
  },
  {
    path: "/sub",
    title: "sub",
    Component: SubPage
  },
  {
    path: "/ajax",
    title: "ajax",
    Component: AjaxPage,
    getSsrData: ajaxPageSsr
  },
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
