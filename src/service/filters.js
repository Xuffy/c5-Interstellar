'use strict';

/**
 * 数字过滤器
 */
export const numberSplit = function (s, n) {
  if (!s) return s;
  /*let decimal = String(num).split('.')[1] || '';//小数部分
   let tempArr = [];
   let revNumArr = String(num).split('.')[0].split('').reverse();//倒序

   for (let i in revNumArr) {
   tempArr.push(revNumArr[i]);
   if ((i + 1) % 3 === 0 && i !== revNumArr.length - 1) {
   tempArr.push(',');
   }
   }
   let zs = tempArr.reverse().join('');//整数部分

   return decimal ? zs + '.' + decimal : zs;*/
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  let l = s.split('.')[0].split('').reverse(), r = s.split('.')[1];
  let t = '';
  r = r === '00' ? '' : '.' + r;
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
  }
  return t.split('').reverse().join('') + r;
};
