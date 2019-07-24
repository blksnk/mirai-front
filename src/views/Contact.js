import React from 'react'
import PageSection from 'uikit/PageSection'
import Button from 'uikit/Button'

import s from './Contact.module.css'
import g from 'uikit/uikit.module.css'
import { selectElements, createEvent } from 'helpers/parallax.js'

const initState = {
  name: '',
  subject: '',
  message: '',
  email: '',
  phoneNumber: '',
}

const Contact = ({ history, ...props }) => {
  const [state, setState] = React.useState(initState)

  const [sent, send] = React.useState(false)

  const changeState = (f, v) => {
    setState({
      ...state,
      [f]: v,
    })
  }

  React.useEffect(() => {
    const els = selectElements(g)
    if(els) {
      createEvent(els, g)
    }
  })
  console.log(state)
  return (
    <React.Fragment>
      <div className='titleSection'>
        <h1 className={s.s1t}>Let's work<br/>together</h1>
        <p className={s.s1p}>Veniam incididunt eiusmod culpa dolore adipisicing fugiat et aliqua voluptate occaecat pariatur laboris dolor irure eiusmod id aliqua.</p>
      </div>

      <form action='#' className={s.s2f} onSubmit={e => {
        e.preventDefault()
        submit()
        e.returnValue = false
        return false
      }} id='contactForm'>
        <FormInput
          className={s.s2i1}
          changeState={changeState}
          name='name'
          type='text'
          value={state.name}
          required
          width={276}
          tabIndex={1}
          finite
        >Hi, my name is</FormInput>

        <FormInput
          className={s.s2i2}
          changeState={changeState}
          name='subject'
          type='text'
          value={state.subject}
          required
          width={564}
          tabIndex={2}
          finite
        >I'd like to get in touch with you<br/>about</FormInput>

        <TextBox
          className={s.s2t}
          changeState={changeState}
          name='message'
          value={state.message}
          required
          style={ { } }
          tabIndex={3}
          placeholder='Let me tell you all about it'
        />

        <FormInput
          className={s.s2i3}
          changeState={changeState}
          name='email'
          type='email'
          value={state.email}
          required
          width={348}
          tabIndex={4}
          style={{
            marginBottom: 0,
          }}
          half
        >You can send me an email at</FormInput>

        <FormInput
          className={s.s2i4}
          changeState={changeState}
          name='phoneNumber'
          type='tel'
          value={state.phoneNumber}
          width={204}
          tabIndex={5}
          style={{
            marginBottom: 0,
          }}
          finite
        >Or give me a call at</FormInput>

        <Button formId='contactForm' title='submit' className={s.submit} onClick={() => triggerSubmit()}>Send that shit!</Button>
      </form>

    </React.Fragment>
  )
}

const triggerSubmit = () => {
  const form = document.getElementById('contactForm')
  form.submit(e => e.preventDefault())
}

const submit = state => {
  console.log('submit: ', state)
}

const TextBox = ({
  className,
  changeState,
  name,
  value,
  required,
  width,
  tabIndex,
  style,
  placeholder,
}) => {
  return (
    <textarea
      name={name}
      className={`${g.textBox} ${className ? className : ''}`}
      style={{ ...style, width }}
      required={required || false}
      tabIndex={tabIndex}
      value={value}
      placeholder={placeholder || ''}
      onChange={e => {
        changeState(name, e.target.value)
        textAreaAdjust(e.target)
      }}

    ></textarea>
  )
}

const textAreaAdjust = o => {
  o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";
}

const FormInput = ({
  className,
  changeState,
  onChange,
  children,
  name,
  value,
  type,
  required,
  width,
  tabIndex,
  inline,
  style,
  half,
  finite }) => {

  return (
    <label style={{ ...style }} className={`${className ? className : ''} ${g.contactFormLabel} ${inline ? g.contactFormLabelInline :''}`}>
      {children}
      <input
        className={g.contactFormInput}
        type={type || 'text'}
        value={value || ''}
        name={name}
        tabIndex={tabIndex}
        style={{ width }}
        required={required || false}
        onChange={e => {
          const v = e.target.value
          onChange ? onChange(name, v, changeState) : changeState(name, v)
        }}
      />
      <span>{finite ? '.' : half ? ',' : ''}</span>
    </label>
  )
}

export default Contact