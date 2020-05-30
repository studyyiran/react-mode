import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {AppWithRouter} from "../share/appWithRouter";
import { isServer } from "common/utils";
import {IOriginData} from "../context/originData";

const dom : any = document.querySelector('#currentenv')
dom.innerHTML = 'isclient'
const originData : IOriginData[] = (window as any).SSRDATA ? (window as any).SSRDATA : undefined;

// client入口 client only.
ReactDOM.hydrate(
  <BrowserRouter>
    <AppWithRouter originData={originData} />
  </BrowserRouter>,
  document.getElementById("root")
);
