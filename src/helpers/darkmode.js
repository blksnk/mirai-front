const colors = {
  background: '#F5FBFE',
  extralightBlue: '#EEF7FB',
  mediumBlueDesat: '#C7D8E1',
  mediumBlue: '#9DC6DC',
  greyBlue: '#6386A6',
  mediumDarkDesat: '#455F78',
  darkBlue: '#273644',
  black: '#212121',
}

const wrapper = document.querySelector('.linesWrapper')
const lines = document.querySelectorAll('.gridLine')

export const darkMode = (darkModeActive) => {
  //change styles
  wrapper.style.backgroundColor = colors.black
  lines.forEach(line => {
    line.style.borderColor = colors.darkBlue
  })
  //change active boolean
  darkModeActive = true
}

export const lightMode = (darkModeActive) => {
  wrapper.style.backgroundColor = colors.background
  lines.forEach(line => {
    line.style.borderColor = colors.extralightBlue
  })
  //change active boolean
  darkModeActive = false
}

export const toggle = (darkModeActive) => darkModeActive ? lightMode() : darkMode()