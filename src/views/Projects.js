import React from 'react'

import'./Projects.css'
import home from 'assets/images/home1.jpg'
import hole from 'assets/images/hole.jpg'
import wadyz1 from 'assets/images/wadyz1.jpg'

const images = [home, hole, wadyz1]
const l = images.length
let timeout = false

const Projects = () => {
  const [currentIndex, setState] = React.useState(0)
  const [scrolling, setScroll] = React.useState(false)

  window.addEventListener('wheel', e => {
    const { deltaY } = e
    let direction = deltaY < 0 ? 'up' : 'down'

    scrollPage(currentIndex, l, direction, setState, scrolling, setScroll)
    return false
  })

  return (
    <div className="projectWrapper">
      <Mask src={images}/>

      <Borders/>
    </div>
  )
}

const scrollPage = (currentIndex, length, direction, setState, scrolling, setScroll) => {
  let scrollToIndex
  let change = false
  if (direction === 'down' && currentIndex < length - 1) {
    scrollToIndex = currentIndex + 1
    change = true
    setState(scrollToIndex)
  } else if (direction === 'up' && currentIndex > 0) {
    scrollToIndex = currentIndex - 1
    change = true
    setState(scrollToIndex)
  }

  if(change && !scrolling) {
    setScroll(true)
    let scrollTo = document.getElementById(`clippedImage${scrollToIndex}`)
    console.log('current: ', currentIndex ,'  ', 'scrollTo: ', scrollToIndex )
    change = false
    scrollTo.scrollIntoView( { behavior: 'smooth', block: 'center', inline: 'center' } )
    setTimeout(() => setScroll(false), 250)

  }
}


const Mask = ({ src }) => <div className='mask'>
  {src.map((img, i) => <img
      src={img}
      alt=""
      className="clippedImage"
      id={`clippedImage${i}`}
      key={`clippedImage${i}`}
    />)
  
  }
</div>

const Borders = () => <>
  <div className='border' id='border0'></div>
  <div className='border' id='border1'></div>
  <div className='border' id='border2'></div>
  <div className='border' id='border3'></div>
  <div className='border' id='border4'></div>
</>

export default Projects