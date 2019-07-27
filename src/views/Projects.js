import React from 'react'
import {Waypoint} from 'react-waypoint'
import { connect } from 'react-redux'
import { darkModeSet, darkModeToggle } from 'store/actions/actions'
import { formatNumber } from 'helpers/formatNumber'

import s from 'views/Projects.module.css'
import g from 'uikit/uikit.module.css'
import { selectElements, createEvent } from 'helpers/parallax.js'

import tower from 'assets/images/tower.jpg'
import dark from 'assets/images/dark.jpg'

import TextParallax from 'uikit/TextParallax'
import Button from 'uikit/Button'
import PageSection from 'uikit/PageSection'

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
      title: <span>entering a <br/> <TextParallax>dark</TextParallax> place</span>,
      thumb: dark,
      subtitle: 'Quis excepteur magna magna ut enim in ad mollit occaecat fugiat ut pariatur ex ex est velit.',
      color: 'dark',
    }
  ]

const Projects = ({ history, darkMode, setDarkMode, toggleDarkMode, userDarkMode, ...props }) => {
  React.useEffect(() => {
    const els = selectElements(g)
    if(els) {
      createEvent(els, g)
    }
    return () => {
      if(!userDarkMode && darkMode) {
        setDarkMode(false)
      }
    }
  })
  return (
    <React.Fragment>
      <Wrapper>
        {projectInfo.map((item, i) => 
          <RenderProject
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            applyDarkMode={i => applyDarkMode(darkMode, projectInfo, i, setDarkMode)}
            key={`project${i}`}
            i={i}
            project={item}
          />)}
      </Wrapper>
      
    </React.Fragment>
  )
}

const Wrapper = ({ children, ...props }) => <div {...props} className={s.wrapper}>
  {children}
</div>

const RenderProject = ({ darkMode, setDarkMode, applyDarkMode, project, i }) => {
  const { title, subtitle, thumb, color } = project
  
  
  return (
    <Waypoint
      horizontal
    >
      <div
        className={`${s.project} ${g[color]}`}
        id={`project${i}`}
      >
        <PageSection
          first={i === 0 ? true : false}
          total={projectInfo.length}
          current={i}
          horizontal
        />
        <div className={s.left}>
          <span className={`${s.number} projectNumber`}>{formatNumber(i + 1)}</span>
        </div>

        <Thumb src={thumb} alt={title}/>
        <Title>{title}</Title>
        <h3>{subtitle}</h3>
        <button onClick={() => scrollTo(i - 1, applyDarkMode)} className={`${s.prev} projectPrevBtn`}>Previous</button>
        <Button onClick={() => scrollTo(i + 1, applyDarkMode)} className={s.next}>next project</Button>
      </div>
    </Waypoint>
  )
}


const TextScroller = ({ projects }) => {
  return null
}

const ThumbScroller = ({ projects }) => {
  return null
}

const NumberScroller = ({ projects }) => {

}

const scrollTo = (i, applyDarkMode) => {
  const el = document.getElementById(`project${i}`)
  if(el) {
    el.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => applyDarkMode(i), 200)
  }
}

const applyDarkMode = (darkMode, projects, i, setDarkMode) => {
  const { color } = projects[i]
  console.log(color)
  if(darkMode && color === 'light') {
    setDarkMode(false)
  } else if(!darkMode && color === 'dark') {
    setDarkMode(true)
  }
}


const Title = ({ children }) => 
<div className={s.titleSection}>
  <h1 className={`projectTitle  ${s.title}`}>{children}</h1>
</div>

const Thumb = ({ src, alt }) =>
<div className={s.thumbWrapper}>  
  <img className={s.thumb} src={src} alt={alt}/>
</div>

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
