import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {AppWithRouter} from "../share/appWithRouter";
import { isServer } from "common/utils";

if (!isServer()) {
  (window as any).LOCATIONENV = "buy";
}

const dom : any = document.querySelector('#currentenv')
dom.innerHTML = 'isclient'

// client入口 client only.
ReactDOM.hydrate(
  <BrowserRouter>
    <AppWithRouter />
  </BrowserRouter>,
  document.getElementById("root")
);
