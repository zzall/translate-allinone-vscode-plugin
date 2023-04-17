const request = require('request-promise')
const crypto = require('crypto');

/**
 * 翻译器
 */
class Translator {
    constructor() {
        this.config = {
            from: 'zh-CHS',
            to: 'en',
            appKey: '36049700194eafb2',
            secretKey: 'E5YFMkxigFRvCBkimPVMmqNoU5lqO43x',
        }
    }

    /**
     * md5加密
     */
    md5(str) {
        const crypto_md5 = crypto.createHash("md5");
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
        return Object.entries(_params).map(([key, value]) => `${key}=${value}`).join('&');
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
        }
        const url = `${youdaoHost}?${this.generateUrlParams(paramsJson)}`;
        const result = await request.get({ url });
        return result;
    }
}

const tr = new Translator();
console.log('Translator()', Translator);

tr.translate('多少钱')
    .then(res => console.log('翻译结果', res))
    .catch(err => console.log('翻译错误', err));

module.exports = Translator;

