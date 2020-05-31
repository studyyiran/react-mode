import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {App} from "../app";
import { isServer } from "common/utils";
import {IOriginData} from "../common/interface";

const dom : any = document.querySelector('#currentenv')
dom.innerHTML = 'isclient'
const originData : IOriginData = (window as any).SSRDATA ? (window as any).SSRDATA : undefined;
// const originData =  JSON.parse('{"ssrConfig":{"ssrTitle":""},"storeList":[{"storeName":"StoreAjaxPage","storeData":{"userSunnyValue":777}}]}')

// client入口 client only.
ReactDOM.hydrate(
  <BrowserRouter>
    <App originData={originData} />
  </BrowserRouter>,
  document.getElementById("root")
);
