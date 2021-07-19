function mobile(s){
  //return /^(13[0-9]|14[5-9]|15[012356789]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/.test(s);
  return /^1[3-9][0-9]{9}$/.test(s);
};
function sfz(s){
  return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(s);
};
function email(s){
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(s);
};
function notPostcode(s){
  return /\D/g.test(s);
};
function throttle(fn, gapTime){
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }
    let _lastTime = null
    // 返回新的函数
    const ret = function(){
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments)   //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
    return ret;
}
function formatNumber(n){
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatTime(date){
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function debounce(fn, delay){
  var timer="";
  delay = delay||500;
  return function(){
    if(timer)clearTimeout(timer);
    var args = arguments
    var $this= this;
    timer = setTimeout(function(){
      fn.apply($this,args)
    },delay)
  }
};

export {
  sfz,
  mobile,
  email,
  debounce,
  formatTime,
  throttle,
  notPostcode
};