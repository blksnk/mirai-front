import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore';

import { darkModeSet, darkModeToggle } from 'store/actions/actions'
import { formatNumber } from 'helpers/formatNumber'
import { trigger, removeEvent } from 'helpers/parallax'
import { translateNode } from 'helpers/translateNode'

import s from 'views/Projects.module.css'

import tower from 'assets/images/tower.jpg'
import dark from 'assets/images/dark.jpg'
import home2 from 'assets/images/home2.jpg'
import light from 'assets/images/light.jpg'

import TextParallax from 'uikit/TextParallax'
import Button from 'uikit/Button'
import AnimatedImg from 'uikit/AnimatedImg'

const mapStateToProps = ({ darkMode, userDarkMode }) => ({ darkMode, userDarkMode })
const mapDispatchToProps = dispatch => ({
  setDarkMode: bool => dispatch(darkModeSet(bool)),
  toggleDarkMode: () => dispatch(darkModeToggle()),
})

const projectInfo = [
  {
    title: <span>enjoying the <br/> <TextParallax>cityscape</TextParallax></span>,
    thumb: tower,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'light',
    url: 'www.gooogle.com',
  },
  {
    title: <span>a calming <br/> <TextParallax>breeze...</TextParallax></span>,
    thumb: light,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'light',
    url: 'www.gooogle.com',
  },
  {
    title: <span>reaching a <br/> <TextParallax>dark</TextParallax> place</span>,
    thumb: dark,
    subtitle: 'Culpa laboris dolore ex ex ut laborum pariatur in reprehenderit excepteur ut deserunt in adipisicing non eu sit in in qui sed.',
    color: 'dark',
    url: 'www.gooogle.com',
  },
  {
    title: <span>Sweet <br/><TextParallax>sunrise</TextParallax></span>,
    thumb: home2,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'dark',
    url: 'www.gooogle.com',
  },
  {
    title: <span>low contrast<br/> <TextParallax>goodness</TextParallax></span>,
    thumb: light,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'light',
    url: 'www.gooogle.com',
  },
]

const Projects = ({ history, darkMode, setDarkMode, toggleDarkMode, userDarkMode, ...props }) => {
  React.useEffect(() => {
    trigger()
    return () => {
      removeEvent()
      if(!userDarkMode && darkMode) {
        setDarkMode(false)
      }
    }
  })
  return (
    <ProjectView
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      applyDarkMode={i => applyDarkMode(darkMode, projectInfo, i, setDarkMode)}
      projects={projectInfo}
    />
  )
}

const ProjectView = ({ projects, darkMode, setDarkMode, applyDarkMode }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [scrolling, setScrolling] = React.useState(false)

  const titles = projects.map(item => item.title)
  const thumbs = projects.map(item => item.thumb)
  const subtitles = projects.map(item => item.subtitle)
  const numbers = projects.map((item, i) => formatNumber(i + 1))

  React.useEffect(() => {
    const wrapper = document.querySelector(`.${s.wrapper}`)
    window.addEventListener('resize', e => 
      debounceResize(e, scrolling, currentIndex, applyDarkMode, setCurrentIndex)
    )
    document.addEventListener('keydown', e =>
      debounceKeyPress(e, scrolling, setScrolling, currentIndex, applyDarkMode, setCurrentIndex)
    )
    wrapper.addEventListener('wheel', e => 
      debounceScroll(e, scrolling, setScrolling, currentIndex, applyDarkMode, setCurrentIndex)
    )

    return () => {
      window.removeEventListener('resize', e => 
        debounceResize(e, scrolling, currentIndex, applyDarkMode, setCurrentIndex)
      )
      document.removeEventListener('keydown', debounceKeyPress)
      wrapper.removeEventListener('wheel', e => 
        debounceScroll(e, scrolling, setScrolling, currentIndex, applyDarkMode, setCurrentIndex)
      )
    }
  })

  return (
    <div className={s.wrapper}>
      <ThumbScroller {...{ thumbs }}/>
      <NumberScroller {...{ numbers }}/>
      <TextScroller {...{ titles, subtitles }}/>

      <Button onClick={() => console.log(projects[currentIndex].title)} className={s.visit}>see for yourself</Button>
      
      <button onClick={() => scroll(currentIndex - 1, applyDarkMode, setCurrentIndex)} className={` ${s.scroll} ${s.prev} projectPrevBtn`}>Previous</button>
      <button onClick={() => scroll(currentIndex + 1, applyDarkMode, setCurrentIndex)} className={`${s.scroll} ${s.next} projectPrevBtn`}>Next project</button>
    </div>
  )
}

const scrollOnKeyPress = (e, scrolling, setScrolling, currentIndex, applyDarkMode, setCurrentIndex) => {
  const { code } = e
  let scrollToIndex = 'empty'
  switch(code) {
    case 'ArrowLeft':
      scrollToIndex = currentIndex - 1
      break
    case 'ArrowRight':
      scrollToIndex = currentIndex + 1
      break
    case 'ArrowUp': 
      scrollToIndex = currentIndex - 1
      break
    case 'ArrowDown':
      scrollToIndex = currentIndex + 1
      break

    default:
      scrollToIndex = 'empty'
  }

  if(!scrolling && scrollToIndex !== 'empty') {
    setScrolling(true)
    scroll(scrollToIndex, applyDarkMode, setCurrentIndex)
    setTimeout(() => setScrolling(false), 300)
  }
}

const scrollOnEvent = (e, scrolling, setScrolling, currentIndex, applyDarkMode, setCurrentIndex) => {
  e.preventDefault()
  //normalize directions
  const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY !== 0 ? e.deltaY : 0
  //scroll according to delta
  let scrollToIndex = 0
  if(!scrolling && delta) {
    setScrolling(true)
    if(delta > 0) {
      scrollToIndex = currentIndex + 1
    } else {
      scrollToIndex = currentIndex - 1
    }
    scroll(scrollToIndex, applyDarkMode, setCurrentIndex)
    setTimeout(() => setScrolling(false), 300)
  }
}

const scrollOnResize = (e, scrolling, currentIndex, applyDarkMode, setCurrentIndex) => {
  if(!scrolling) {
    const text = document.getElementById(`projectText${currentIndex}`)
    const thumb = document.getElementById(`projectThumb${currentIndex}`)
    const number = document.getElementById(`projectNumber${currentIndex}`)
    translateNode(text, 100)
    translateNode(thumb, 100)
    translateNode(number, 100, true)
  }
} 

const debounceScroll = _.debounce(scrollOnEvent, 300, false)
const debounceKeyPress = _.debounce(scrollOnKeyPress, 300, false)
const debounceResize = _.debounce(scrollOnResize, 150, false)

const ThumbScroller = ({ thumbs }) => 
<div className={s.thumbScroller}>
  {thumbs.map((src, i) => (
    <div className={s.thumbWrapper} key={`projectThumb${i}`} id={`projectThumb${i}`}>
      <AnimatedImg className={s.thumb} index={i} src={src} alt=''/>
    </div>
  ))}
</div>

const TextScroller = ({ titles, subtitles }) => 
<div className={s.textScroller}>
  {titles.map((title, i) => 
    <div className={s.textWrapper} key={`projectText${i}`} id={`projectText${i}`}>
      <h1 className={`projectTitle  ${s.title}`}>{title}</h1>

      <h3 className={s.subtitle}>{subtitles[i]}</h3>
    </div>
  )}
</div>

const NumberScroller = ({ numbers }) => 
<div className={s.numberScroller}>
  {numbers.map((n, i) => 
    <span className={`${s.number} projectNumber`} key={`projectNumber${i}`} id={`projectNumber${i}`}>
      {n}
    </span>
  )}
</div>

const scroll = (i, applyDarkMode, setCurrentIndex) => {
  const text = document.getElementById(`projectText${i}`)
  const thumb = document.getElementById(`projectThumb${i}`)
  const number = document.getElementById(`projectNumber${i}`)
  
  if(i >= 0 && i <= projectInfo.length - 1 && text && thumb && number) {
    translateNode(text, 300)
    translateNode(thumb, 300)
    translateNode(number, 300, true)
    setTimeout(() => applyDarkMode(i), 300)
    setCurrentIndex(i)
  }
}

const applyDarkMode = (darkMode, projects, i, setDarkMode) => {
  const { color } = projects[i]
  if(darkMode && color === 'light') {
    setDarkMode(false)
  } else if(!darkMode && color === 'dark') {
    setDarkMode(true)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)