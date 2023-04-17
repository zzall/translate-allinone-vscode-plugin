## 如果打包报错，node 版本最好设置为`v14.17.0`

错误日志是：
![错误日志截图](https://p.ipic.vip/k5jyio.png)

因为eslint的node包限制是
![node包限制信息](https://p.ipic.vip/6u9yq0.png)


具体步骤是：
1. 切换node版本为`v14.17.0`
2. `rm -rf node_modules`然后使用`npm i`重新安装包
3. `vsce publish`开始发布
4. 这里安装的时候最好用`npm`，用`pnpm`有可能会依然报错

### ERROR:Missing publisher name

只需要在`package.json`中新增`"publisher": "zzailianlian"`即可

