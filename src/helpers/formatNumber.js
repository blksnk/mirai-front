export const formatNumber = n => {
  if(n < 10) {
    return '0' + String(n)
  } else {
    return String(n)
  }
}