// import { createHash } from 'crypto'
// // compute md5 value for any text
// window.$$md5 = text => {
//   return createHash('md5').update(text).digest('hex')
// }
// shorthand for console.log

// 检测是否包含中文、英文或数字之外的字符（返回true表示包含非法字符）
window.$$violate = function(str) {
  const regexp = /[^\u4e00-\u9fa5a-zA-Z0-9]/
  return regexp.test(str)
}
window.$$validate = function(str) {
  const regexp = /[^\u4e00-\u9fa5a-zA-Z0-9]/
  return str.match(regexp)
}
window.$$lg = function () {
  console.log(Array(60).fill('*').join(''))
  if (arguments.length === 0) return
  const l = arguments.length
  let i = 0
  
  while (i < l) {
    console.log(`${i} >`,arguments[i])
    i++
  }
  console.log(Array(60).fill('*').join(''))
}
// halt for a short time
window.$$sleep = ms => {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve()},ms)
  })
}
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
window.$$shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// 产生介于两个数值之间的随机数
window.$$randomTimer = function(from, to) {
  const diff = to - from
  return Math.random() * diff + from
}
// 定时
window.$$timer = function(fn,t) {
  if(typeof fn !== 'function') 
    throw new Error('first argument must be a function')
  t = t ? t : 0
  setTimeout(fn,t)
}
