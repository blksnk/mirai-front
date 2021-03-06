import React from 'react'
import { createEvent, removeEvent } from 'helpers/parallax.js'

import Img from 'uikit/Img'
import PageSection from 'uikit/PageSection'
import Button from 'uikit/Button'
import { InfoSlider } from 'uikit/Slider'
import ProgressBar from 'uikit/ProgressBar'

import s from './About.module.css'

import light from 'assets/images/light.jpg'
import city from 'assets/images/city.jpg'
import dark from 'assets/images/dark.jpg'

const sliderInfo = [
  {
    img: light,
    alt: 'test alt light',
    onClick: () => console.log('light'),
    title: 'light',
    p: 'Lorem ipsum labore minim deserunt mollit sint minim eiusmod laborum do nulla proident irure incididunt ullamco amet cupidatat aute exercitation consectetur in labore laborum ut enim labore ut esse incididunt duis.',
    color: 'light',
  }, {
    img: dark,
    alt: 'test alt dark',
    title: 'dark',
    p: 'Ut elit cillum officia aliquip sunt dolore adipisicing cupidatat aute.',
    color: 'dark',
  }, {
    img: city,
    alt: 'test alt city',
    onClick: () => console.log('city'),
    title: 'city',
    p: 'Ut elit cillum officia aliquip sunt dolore adipisicing cupidatat aute.',
    color: 'light',
  }, {
    img: light,
    alt: 'test alt light',
    onClick: () => console.log('light'),
    title: 'light',
    p: 'Lorem ipsum labore minim deserunt mollit sint minim eiusmod laborum do nulla proident irure incididunt ullamco amet cupidatat aute exercitation consectetur in labore laborum ut enim labore ut esse incididunt duis.',
    color: 'light',
  }, {
    img: dark,
    alt: 'test alt dark',
    title: 'dark',
    p: 'Ut elit cillum officia aliquip sunt dolore adipisicing cupidatat aute.',
    color: 'dark',
  }, {
    img: city,
    alt: 'test alt city',
    onClick: () => console.log('city'),
    title: 'city',
    p: 'Ut elit cillum officia aliquip sunt dolore adipisicing cupidatat aute.',
    color: 'light',
  }
]

const About = ({ history }) => {
  const [progress, displayProgress] = React.useState(false)
  React.useEffect(() => {
    if(!progress) {
      displayProgress(true)
    }
    createEvent()
    return removeEvent
  }, [progress, displayProgress])
  return(
    <React.Fragment>
      {progress
        ? <ProgressBar parent='contentContainer'/>
        : null}
      <div className='titleSection'>
        <PageSection className={s.s} first total={4}/>
        <h1>I create<br/>
          and build<br/>
          Websites.
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

      <InfoSlider className={s.s3sl} array={sliderInfo} numbers/>

      <PageSection className={s.s} current={4}/>

      <h2 className={s.s4t}>Are you proficient in X language ?</h2>
      <p className={s.s4p}>Nostrud ullamco in id fugiat aliqua eiusmod dolore nulla id pariatur ut do dolor enim culpa consequat.</p>

      <Skills className={s.s4sk}/>
      <div className='sectionSeparator'></div>


    </React.Fragment>
  )
}

const Skills = ({ className }) => <table className={className ? className : ''}>
  <tbody>
    <tr>
      <td>JavaScript ES6</td>
      <td>HTML 5</td>
      <td>CSS 3</td>
    </tr>
    <tr>
      <td>React</td>
      <td>React Native</td>
      <td>Redux</td>     
    </tr>
    <tr>
      <td>MongoDB</td>
      <td>PostgreSQL</td>
      <td>Firebase</td>
    </tr>
    <tr>
      <td>NodeJS</td>
      <td>Express</td>
      <td>AngularJS</td>
    </tr>
  </tbody>
</table>

export default About