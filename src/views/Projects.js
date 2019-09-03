import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore';

import { darkModeSet, darkModeToggle } from 'store/actions/actions'
import { formatNumber } from 'helpers/formatNumber'
import { createEvent, removeEvent } from 'helpers/parallax'
import { translateNode } from 'helpers/translateNode'

import s from 'views/Projects.module.css'

import tower from 'assets/images/tower.jpg'
import dark from 'assets/images/dark.jpg'
import home2 from 'assets/images/home2.jpg'
import light from 'assets/images/light.jpg'

import TextParallax from 'uikit/TextParallax'
import Button from 'uikit/Button'
import AnimatedImg from 'uikit/AnimatedImg'
import ProjectThumbs, { translate } from 'components/ProjectThumbs'

const mapStateToProps = ({ darkMode, userDarkMode }) => ({ darkMode, userDarkMode })
const mapDispatchToProps = dispatch => ({
  setDarkMode: bool => dispatch(darkModeSet(bool)),
  toggleDarkMode: () => dispatch(darkModeToggle()),
})

const createTitle = (a, b, c) => <span> {a} <br/> <span className={s.secondRow}><TextParallax> {b} </TextParallax> {c ? c : ''} </span></span>

const projectInfo = [
  {
    title:  createTitle('enjoying the', 'cityscape'),
    thumb: tower,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'light',
    url: 'www.gooogle.com',
  },
  {
    title: createTitle('a calming', 'breeze...'),
    thumb: light,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'light',
    url: 'www.gooogle.com',
  },
  {
    title: createTitle('reaching a', 'dark', 'place'),
    thumb: dark,
    subtitle: 'Culpa laboris dolore ex ex ut laborum pariatur in reprehenderit excepteur ut deserunt in adipisicing non eu sit in in qui sed.',
    color: 'dark',
    url: 'www.gooogle.com',
  },
  {
    title: createTitle('sweet', 'sunrise'),
    thumb: home2,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'dark',
    url: 'www.gooogle.com',
  },
  {
    title: createTitle('low contrast', 'goodness'),
    thumb: light,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'light',
    url: 'www.gooogle.com',
  },
]

const Projects = ({ history, darkMode, setDarkMode, toggleDarkMode, userDarkMode, ...props }) => {
  React.useEffect(() => {
    createEvent()
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

  const dbScroll = e => debounceScroll(e, scrolling, setScrolling, currentIndex, applyDarkMode, setCurrentIndex)
  const dbResize = e => debounceResize(e, scrolling, currentIndex, applyDarkMode, setCurrentIndex)
  const dbKeyPress = e => debounceKeyPress(e, scrolling, setScrolling, currentIndex, applyDarkMode, setCurrentIndex)

  React.useEffect(() => {
    const wrapper = document.querySelector(`.${s.wrapper}`)
    window.addEventListener('resize', dbResize)
    document.addEventListener('keydown', dbKeyPress)
    wrapper.addEventListener('wheel', dbScroll)

    return () => {
      window.removeEventListener('resize', dbResize)
      document.removeEventListener('keydown', dbKeyPress)
      wrapper.removeEventListener('wheel', dbScroll)
    }
  })

  return (
    <div className={s.wrapper}>
      {/*<ThumbScroller {...{ thumbs }}/>*/}
      <Thumbs {...{ thumbs }}/>
      <NumberScroller {...{ numbers }}/>
      <TextScroller {...{ titles, subtitles }}/>

      <Button onClick={() => console.log(projects[currentIndex].title)} className={s.visit}>see for yourself</Button>
      
      <button onClick={() => scroll(currentIndex, currentIndex - 1, applyDarkMode, setCurrentIndex)} className={` ${s.scroll} ${s.prev} projectPrevBtn`}>Previous</button>
      <button onClick={() => scroll(currentIndex, currentIndex + 1, applyDarkMode, setCurrentIndex)} className={`${s.scroll} ${s.next} projectPrevBtn`}>Next project</button>
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
    scroll(currentIndex, scrollToIndex, applyDarkMode, setCurrentIndex)
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
    scroll(currentIndex, scrollToIndex, applyDarkMode, setCurrentIndex)
    setTimeout(() => setScrolling(false), 300)
  }
}

const scrollOnResize = (e, scrolling, currentIndex, applyDarkMode, setCurrentIndex) => {
  if(!scrolling) {
    const text = document.getElementById(`projectText${currentIndex}`)
    const number = document.getElementById(`projectNumber${currentIndex}`)
    translateNode(text, 100)
    translateNode(number, 100, true)
  }
} 

const debounceScroll = _.debounce(scrollOnEvent, 300, true)
const debounceKeyPress = _.debounce(scrollOnKeyPress, 300, true)
const debounceResize = _.debounce(scrollOnResize, 150, false)

const ThumbScroller = ({ thumbs }) => 
<div className={s.thumbScroller}>
  {thumbs.map((src, i) => (
    <div className={s.thumbWrapper} key={`projectThumb${i}`} id={`projectThumb${i}`}>
      <AnimatedImg className={s.thumb} index={i} src={src} alt=''/>
    </div>
  ))}
</div>

const Thumbs = ({ thumbs }) => 
<div className={s.thumbScroller}>
    <div className={s.thumbWrapper} key={`projectThumb${0}`} id={`projectThumb${0}`}>
      <ProjectThumbs className={s.thumb} urls={thumbs} alt='projectthumbs'/>
    </div>
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

const scroll = (currentIndex, i, applyDarkMode, setCurrentIndex) => {
  const text = document.getElementById(`projectText${i}`)
  const number = document.getElementById(`projectNumber${i}`)
  
  if(i >= 0 && i <= projectInfo.length - 1 && text && number) {
    translateNode(text, 300)
    translate(currentIndex, i, 600)
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