export const translateNode = (el, duration, vertical) => {
  const parent = el.parentNode
  const to = vertical ? el.offsetTop : el.offsetLeft
  const start = vertical ? parent.scrollTop : parent.scrollLeft
  const change = to - start
  let currentTime = 0
  let increment = 20
        
    var animateScroll = function(timestamp){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        if(vertical) {
          parent.scrollTop = val;
        } else {
          parent.scrollLeft = val;
        }
        if(currentTime < duration) {
            setTimeout(() => requestAnimationFrame(animateScroll), increment);
        }
    };
    requestAnimationFrame(animateScroll)
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};