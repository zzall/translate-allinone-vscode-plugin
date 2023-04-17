const vscode = require('vscode');
const request = require('request-promise');
const crypto = require('crypto');

/**
 * 翻译器
 */
class Translator {
  constructor() {
    this.config = {
      from: '',
      to: '',
      appKey: '36049700194eafb2',
      secretKey: 'E5YFMkxigFRvCBkimPVMmqNoU5lqO43x',
    };
  }

  /**
   * md5加密
   */
  md5(str) {
    const crypto_md5 = crypto.createHash('md5');
    crypto_md5.update(str);
    return crypto_md5.digest('hex');
  }

  /**
   * 生成[0,n]区间的随机整数
   * 比如生成[0,100]的闭区间随机整数，getRandomN(100)
   */
  getRandomN(roundTo) {
    return Math.round(Math.random() * roundTo);
  }

  /**
   * {a:'111',b:'222'} => a=111&b=222
   */
  generateUrlParams(_params) {
    return Object.entries(_params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  /**
   * 进行翻译
   */
  async translate(word) {
    const youdaoHost = 'http://openapi.youdao.com/api';
    // 在get请求中，中文需要进行uri编码
    const encodeURIWord = encodeURI(word);
    const salt = this.getRandomN(1000);
    const sign = this.md5(this.config.appKey + word + salt + this.config.secretKey);
    const paramsJson = {
      q: encodeURIWord,
      from: this.config.from,
      to: this.config.to,
      appKey: this.config.appKey,
      salt,
      sign,
    };
    const url = `${youdaoHost}?${this.generateUrlParams(paramsJson)}`;
    const result = await request.get({ url });
    return result;
  }
}

/**
 * 激活插件
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const tr = new Translator();

  function translateAndReplaceSelection() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const selection = editor.selection;
    const word = editor.document.getText(selection);
    tr.translate(word).then(result => {
      const finalText = JSON.parse(result)?.translation?.join('/n');
      editor.edit(editBuilder => {
        editBuilder.replace(selection, finalText);
      });
    });
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('translate-allinone.translateSelection', async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      const word = editor.document.getText(selection);
      const result = await tr.translate(word);
      const finalText = JSON.parse(result)?.basic?.explains?.join('\n') || JSON.parse(result)?.translation?.join('\n');
      vscode.window.showInformationMessage(finalText.replace(/\n/g, '\r\n'), { modal: true });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('translate-allinone.translateAndReplaceSelection', translateAndReplaceSelection)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('translate-allinone.translateToCamelCase', async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      const word = editor.document.getText(selection);
      const result = await tr.translate(word);
      const finalText = JSON.parse(result)?.basic?.explains?.join('') || JSON.parse(result)?.translation?.join('');
      const words = finalText.split(' ');
      let camelCase = words[0].toLowerCase();
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        camelCase += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      editor.edit(editBuilder => {
        editBuilder.replace(selection, camelCase);
      });
    })
  );
}

exports.activate = activate;
