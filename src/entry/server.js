import express from "express";
import React from "react";
// import ReactDom from 'react-dom';
// 注意是什么包体
import ReactDOMServer from "react-dom/server";

import { matchPath, StaticRouter } from "react-router-dom";
import { routerConfig } from "../pages/routerConfig";
import { App } from "../app";
const fs = require("fs");
const path = require("path");

const app = express();

async function hehe(req, res) {
  const url = req.url;
  // 这块路由匹配是一套。ssr是一套。单元没问题
  const targetRouter = routerConfig.find(({ component, ...other }) => {
    return matchPath(url, { ...other });
  });
  let originData;
  console.log(targetRouter)
  if (targetRouter &&  targetRouter.getSsrData) {
    originData = await targetRouter.getSsrData();
  } else {
  }
  console.log(url);
  console.log(JSON.stringify(originData));
  const context = {};
  // renderToString(req, res, <StaticRouter context={context} location={url}><App /></StaticRouter>)
  let template = renderToString(
    req,
    res,
    <StaticRouter context={context} location={url}>
      <App originData={originData} />
    </StaticRouter>
  );
  template = template.replace(
      /(<\/head>)/,
      "<script>var SSRDATA=" + JSON.stringify(originData) + ";</script>$1"
  );
  res.send(template)
  // renderToNodeStream(req, res, Component)
  // 获取后返回？
}
// 这块有一个nginx确认路由需要搞一下
app.get("/sub", hehe);
app.get("/main", hehe);
app.get("/ajax", hehe);

// 打包后的文件夹
app.use(express.static("build"));

function renderToString(req, res, jsx) {
  const result = ReactDOMServer.renderToString(jsx);
  // 这块应该读取html。然后插入进去
  // 不知道为什么这里获取不到。这令我务必困惑。非常困惑。
  // 为什么他会认为我在根路径，而不是server.js的文件路径呢？
  // console.log(__dirname)
  // console.log(path.resolve(__dirname, '../'))
  let template = fs.readFileSync("build/index.html", {
    encoding: "utf-8",
  });
  template = template.replace("INNER", result);
  return template
  // send 只能写一次
  // res.send(template);
}

function renderToNodeStream(req, res, Component) {
  const readableString = ReactDOMServer.renderToNodeStream(<Component />);
  // write和end 可以反反复复好几次
  readableString.pipe(res, { end: false });
  readableString.on("end", () => {
    res.write("finish");
    res.end();
  });
  res.write();
}
app.listen("5000", () => {
  console.log("have listen");
});

// express.listen((req, res) => {
//     // 路由匹配
//     const Component = TestPage
//     const readableString = ReactDom.renderToStringAsyn(Component)
//     // res是writeable
//     readableString.pipe(res)
//     // 获取后返回？
// }, '5000')

/*
router怎么玩？
listen怎么玩？
static怎么玩？
 */
