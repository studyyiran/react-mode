import express from 'express';
import React from 'react';
// import ReactDom from 'react-dom';
// 注意是什么包体
import ReactDOMServer from 'react-dom/server';
import {TestPage} from "../share/test";

import {matchPath, StaticRouter} from 'react-router-dom'
import {routerConfig} from '../share/routerConfig'
import {RootRouter} from '../share/router'
const fs = require('fs')
const path = require('path')

const app = express();

function hehe (req, res) {
    const url = req.url;
    // 这块路由匹配是一套。ssr是一套。单元没问题
    const targetRouter = routerConfig.find(({component, ...other}) => {
        return matchPath(url, {...other})
    })
    if (targetRouter && targetRouter.component) {
        // const Component = targetRouter.component
        // 路由匹配
        // const jsx = <RootRouter history={StaticRouterHistory} Component={Component} />
        // 传入html头 尾

        // 传入外部的layout

    } else {
    }
    console.log(url)
    const context = {};
    // renderToString(req, res, <StaticRouter context={context} location={url}><RootRouter /></StaticRouter>)
    renderToString(req, res, <StaticRouter context={context} location={url}><RootRouter /></StaticRouter>)
    // renderToNodeStream(req, res, Component)
    // 获取后返回？
}
// 这块有一个nginx确认路由需要搞一下
app.get('/sub', hehe)
app.get('/main', hehe)

// 打包后的文件夹
app.use(express.static(path.resolve(__dirname, '../build')))

function renderToString(req, res, jsx) {
    const result = ReactDOMServer.renderToString(jsx)
    // 这块应该读取html。然后插入进去
    // 不知道为什么这里获取不到。这令我务必困惑。非常困惑。
    // 为什么他会认为我在根路径，而不是server.js的文件路径呢？
    // console.log(__dirname)
    // console.log(path.resolve(__dirname, '../'))
    let template = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), {
        encoding: "utf-8"
    });
    template = template.replace('INNER', result)
    // send 只能写一次
    res.send(template);
}

function renderToNodeStream(req, res, Component) {
    const readableString = ReactDOMServer.renderToNodeStream(<Component />)
    // write和end 可以反反复复好几次
    readableString.pipe(res, {end: false})
    readableString.on('end',() => {
        res.write('finish');
        res.end();
    })
    res.write()
}
app.listen('5000', () => {
    console.log('have listen')
})


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