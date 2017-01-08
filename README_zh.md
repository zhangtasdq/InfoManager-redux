InfoManger
===
一个非常小的信息管理工具，会对保存的信息进行加密，可以将加密后的信息保存到 `OneDrive`，
也可以从 `OneDrive` 还原，使用 `react-native + redux` 开发，目前只支持 `Android`。


开发的目的
---
因为我们现在有太多的帐号，要全部记住的话太困难，所以写一个工具进行保存。还可以学习一下 `react-native 和 redux`。

特点
---
1. 本应用不保存加密信息的密码，所以您必须牢记您的密码。
2. 可以将加密后的信息备份到 `OneDrive`， 也可以从 `OneDrive` 还原，避免信息丢失。
3. 对密码进行填充，避免密码过于简单。

登录过程
---
1. 登录的时候先检查应用目录下是否有加密后的信息文件，如果信息文件不存在则直接进入应用。
2. 如果发现有信息文件则会使用你输入的密码，则尝试解密，如果解密成功则进入应用否则密码不正确无法进入应用。

安装
---

1. 搭建 [React-Native](http://facebook.github.io/react-native/docs/getting-started.html#content) 的开发环境
2. 安装依赖包
```shell
yarn install
```
3. 运行
```shell
react-native run-android
```


OneDrive
---
1. 在[这里](https://dev.onedrive.com/app-registration.htm#register-your-app-for-onedrive)注册 `App` 获取 `clientid`。
2. 将获得的 `clientid` 写入 `src/configs/AppConfig.js#oneDriveClientId`
3. 注册 [Microsoft](https://account.microsoft.com) 帐号
4. 重新运行程序

最后
---
>如果您有什么意见或者建议请您告诉我，谢谢！ ^_^
