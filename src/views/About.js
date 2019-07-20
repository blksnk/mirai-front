import React from 'react'
import Img from 'uikit/Img'
import PageSection from 'uikit/PageSection'

import s from './About.module.css'
import g from 'uikit/uikit.module.css'
import { selectElements, createEvent } from 'helpers/parallax.js'

import light from 'assets/images/light.jpg'
import city from 'assets/images/city.jpg'

const About = () => {
  React.useEffect(() => {
    const els = selectElements(g)
    if(els) {
      createEvent(els, g)
    }
  })
  return(
    <React.Fragment>
      <div className='titleSection'>
        <PageSection className={s.s} first total={3}/>
        <h1>I create
          <br/>
          & build
          <br/>
          Websites
        </h1>
        <p>Sunt dolore ut deserunt occaecat duis ut enim anim non dolor mollit aliqua anim sint enim consectetur deserunt incididunt. Sunt dolore ut deserunt occaecat duis ut enim anim non dolor mollit aliqua anim sint enim consectetur deserunt incididunt.</p>
      </div>

        <h2 className={s.s1t}>Who are you again ?</h2>
        <p className={s.s1p}>
          Lorem ipsum magna magna nulla laborum est magna irure dolor aliquip sed elit commodo labore in est sunt dolore dolor magna non elit proident dolore veniam aliquip commodo in irure tempor ad exercitation sunt in laborum enim reprehenderit veniam eiusmod veniam magna dolore ad irure commodo aliquip sit consectetur laborum ad adipisicing elit amet voluptate nostrud reprehenderit dolore reprehenderit duis cupidatat consequat irure ex in laboris laborum.
        </p>
        <Img src={light} alt='test image' className={s.s1i}/>

        <div className='sectionSeparator'></div>
        <PageSection className={s.s} current={2}/>

        <h2 className={s.s2t}>And what is it that you do ?</h2>
        <p className={s.s2p}>
           Lorem ipsum magna magna nulla laborum est magna irure dolor aliquip sed elit commodo labore in est sunt dolore dolor magna non elit proident dolore veniam aliquip commodo in irure tempor ad exercitation sunt in laborum enim reprehenderit veniam eiusmod veniam magna dolore ad irure commodo aliquip sit consectetur laborum ad adipisicing elit amet voluptate nostrud reprehenderit dolore reprehenderit duis cupidatat consequat irure ex in laboris laborum.
        </p>
        <Img src={city} alt='test-image' landscape className={s.s2i}/>

        <div className='sectionSeparator'></div>
        <PageSection className={s.s} current={3}/>

        <h2 className={s.s3t}>What do others say about you ?</h2>
        <p className={s.s3p}>
          Exercitation quis dolor anim officia dolor ea ullamco aliquip et dolore excepteur enim laborum tempor sint dolore et ut magna adipisicing irure magna in occaecat ea ea dolore qui ad non dolore.
        </p>
    </React.Fragment>
  )
}

export default About