const preSix = require('./preSix');
const sixArr = Object.keys(preSix);

const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const validate = ['1','0','X','9','8','7','6','5','4','3','2'];
/**
 * 填充零
 * @param str 要填充的字符串
 * @param total 填充后的字符串总位数
 */
function fixZero(str, total) {
  str = String(str);
  const zn = total - str.length;
  if (zn === 0) return str;
  const zero = new Array(zn).fill('0').join('');
  return `${zero}${str}`;
}

/**
 * 最后一位的生成规则
 * @param pre17
 * @returns {string}
 */
function genLastNum(pre17) {
  let sum = 0;
  weight.forEach((wi, idx) => {
    sum += pre17[idx] * wi;
  })
  const mode = sum%11;

  return validate[mode];
}

module.exports.templateTags = [{
  name: 'mockChineseIdCard',
  displayName: 'mock chinese id card',
  description: 'mock chinese id card in insominia rest client',
  args: [
    {
      displayName: 'IsAdult',
      type: 'enum',
      defaultValue: 'random',
      options: [{
        displayName: 'adult',
        value: 'adult'
      }, {
        displayName: 'minor',
        value: 'minor'
      }, {
        displayName: 'random',
        value: 'random'
      }]
    }
  ],
  async run(context, adult) {
    const preSixIndex = Math.floor(Math.random() * sixArr.length);
    const curYear = new Date().getFullYear();
    
    let yearRandom = Math.floor(Math.random() * (curYear - 1900) + 1900);
    
    if (adult === 'adult') {
      yearRandom = Math.floor(Math.random() * (curYear - 1900 - 18) + 1900);
    }
    if (adult === 'minor') {
      yearRandom = Math.floor(Math.random() * 17) + (curYear - 17);
    }
    
    let month = String(Math.ceil(Math.random() * 12));
    month = fixZero(month, 2);
    
    let day = String(Math.ceil(Math.random() * 28));
    day = fixZero(day, 2);

    let seqThree = String(Math.floor(Math.random() * 1000));
    seqThree = fixZero(seqThree, 3);

    const pre17 = `${sixArr[preSixIndex]}${yearRandom}${month}${day}${seqThree}`;
    const lastOne = genLastNum(pre17);
    
    return `${pre17}${lastOne}`;
  }
}]