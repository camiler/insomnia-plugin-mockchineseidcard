const preSix = require('./preSix');
const sixArr = Object.keys(preSix);
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
    
    let lastFour = String(Math.floor(Math.random() * 10000));
    lastFour = fixZero(lastFour, 4);
    lastFour = Math.random() * 100 < 90 ? lastFour : lastFour.slice(0, 3) + 'X';
    
    return `${sixArr[preSixIndex]}${yearRandom}${month}${day}${lastFour}`;
  }
}]