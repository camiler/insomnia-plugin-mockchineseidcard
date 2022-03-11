import sixArr from './preSixArr';

// 510824 19930411 0846
const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const validate = ['1','0','X','9','8','7','6','5','4','3','2'];

const evens = [0, 2, 4, 6, 8]
const odds = [1, 3, 5, 7, 9]

function getRandom(max) {
  return Math.random() * max;
}
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
      displayName: '类型(the type of person)',
      type: 'enum',
      defaultValue: 'random',
      options: [{
        displayName: '成年男性(adult male)',
        value: 'adult_male'
      }, {
        displayName: '成年女性(adult famale)',
        value: 'adult_famale'
      }, {
        displayName: '未成年男性(minor male)',
        value: 'minor_male'
      }, {
        displayName: '未成年女性(minor famale)',
        value: 'minor_famale'
      }, {
        displayName: '随机(random)',
        value: 'random'
      }]
    }
  ],
  async run(context, type) {
    const preSixIndex = Math.floor(Math.random() * sixArr.length);
    const curYear = new Date().getFullYear();
    
    let yearRandom = Math.floor(curYear - getRandom(100));
    let the17th = Math.floor(getRandom(10))
    const [adult, sex] = type.split('_')
    
    if (adult === 'adult') {
      yearRandom = Math.floor((curYear - 19) - (getRandom(60 - 18)));
    }
    if (adult === 'minor') {
      yearRandom = Math.floor(curYear - getRandom(17));
    }
    if (sex === 'male') {
      the17th = odds[Math.floor(getRandom(5))]
    }
    if (sex === 'famale') {
      the17th = evens[Math.floor(getRandom(5))]
    }
    
    let month = String(Math.ceil(getRandom(12)));
    month = fixZero(month, 2);
    
    let day = String(Math.ceil(getRandom(28)));
    day = fixZero(day, 2);

    const seqTwo = fixZero(String(Math.floor(getRandom(100))), 2); // 第15 16位

    const pre17 = `${sixArr[preSixIndex]}${yearRandom}${month}${day}${seqTwo}${the17th}`;
    const lastOne = genLastNum(pre17);
    
    return `${pre17}${lastOne}`;
  }
}]