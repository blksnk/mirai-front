import React from 'react'
import { connect } from 'react-redux'
import { darkModeSet, darkModeToggle } from 'store/actions/actions'
import { formatNumber } from 'helpers/formatNumber'
import { trigger, removeEvent } from 'helpers/parallax'
import { translateNode } from 'helpers/translateNode'

import s from 'views/Projects.module.css'
import g from 'uikit/uikit.module.css'

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
  },
  {
    title: <span>a calming <br/> <TextParallax>breeze...</TextParallax></span>,
    thumb: light,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'light',
  },
  {
    title: <span>reaching a <br/> <TextParallax>dark</TextParallax> place</span>,
    thumb: dark,
    subtitle: 'Culpa laboris dolore ex ex ut laborum pariatur in reprehenderit excepteur ut deserunt in adipisicing non eu sit in in qui sed.',
    color: 'dark',
  },
  {
    title: <span>Sweet <br/><TextParallax>sunrise</TextParallax></span>,
    thumb: home2,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'dark',
  },
  {
    title: <span>low contrast<br/> <TextParallax>goodness</TextParallax></span>,
    thumb: light,
    subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
    color: 'light',
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

  const titles = projects.map(item => item.title)
  const thumbs = projects.map(item => item.thumb)
  const subtitles = projects.map(item => item.subtitle)
  const numbers = projects.map((item, i) => formatNumber(i + 1))

  return (
    <div className={s.wrapper}>
      <ThumbScroller {...{ thumbs }}/>
      <NumberScroller {...{ numbers }}/>
      <TextScroller {...{ titles, subtitles }}/>

      <button onClick={() => scroll(currentIndex - 1, applyDarkMode, setCurrentIndex)} className={`${s.prev} projectPrevBtn`}>Previous</button>
      <Button onClick={() => scroll(currentIndex + 1, applyDarkMode, setCurrentIndex)} className={s.next}>next project</Button>
    </div>
  )
}

const ThumbScroller = ({ thumbs }) => 
<div className={s.thumbScroller}>
  {thumbs.map((src, i) => (
    <div className={s.thumbWrapper} key={`projectThumb${i}`} id={`projectThumb${i}`}>
      <AnimatedImg className={s.thumb} src={src} alt=''/>
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
  
  if(i >= 0 && i <= projectInfo.length - 1) {
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