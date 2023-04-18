# translate-allinone README

## 功能

* 划线翻译，多个语种
* 中文转英文小驼峰命名
* 翻译中文并覆盖当前选中文案
* 更多功能待拓展

## 涉及到命令

目前只有以下三种

![命令](https://p.ipic.vip/bf9k9x.png)

## 用法

### 划词翻译

1. 选中内容(语种不限，如果是其他语种，默认翻译为中文)
2. 键入`shift + command + p`调出vscode命令看板
3. 选择`translateSelection`即可看到翻译弹窗，具体如下：
  ![translateSelection翻译弹窗](https://p.ipic.vip/orl4xh.png)

### 中文转英文小驼峰命名

1. 选中内容
2. 键入`shift + command + p`调出vscode命令看板
3. 选择`translateToCamelCase`即可自动把划线内容转成小驼峰命名

### 翻译中文并覆盖当前选中文案

> 针对场景：主要用于源码查看时的注释翻译

1. 选中内容
2. 键入`shift + command + p`调出vscode命令看板
3. 选择`translateAndReplaceSelection`即可自动把划线内容转成中文


