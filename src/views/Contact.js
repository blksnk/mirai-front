import React from 'react'
import { connect } from 'react-redux'
import { updateForm } from 'store/actions/actions'
import { createEvent, removeEvent } from 'helpers/parallax.js'

import Button from 'uikit/Button'
import ProgressBar from 'uikit/ProgressBar'

import s from './Contact.module.css'
import g from 'uikit/uikit.module.css'

import downArrow from 'assets/icons/ios-arrow-down.svg'

const initState = {
  name: '',
  subject: '',
  message: '',
  clientEmail: '',
  phoneNumber: '',
}

const subjectValues = [
  ['work', 'work'],
  ['question', 'a random inquiry'],
  ['random', 'something else'],
]

const retrieveForm = (setState, state, form) => {
  if(state !== form) {
    setState(form)
  }
}

const uploadFormToReducer = (dispatch, state, form) => {
  if(state !== form) {
    dispatch(updateForm(state))
  }
}

const Contact = ({ history, form, dispatch, ...props }) => {
  const [state, setState] = React.useState(initState)
  const [load, setLoaded] = React.useState(false)

  const changeState = (f, v) => {
    setState({
      ...state,
      [f]: v,
    })
  }

  React.useEffect(() => {
    createEvent()
    if(!load) {
      retrieveForm(setState, state, form)
      setLoaded(true)
    }

    return () => {
      removeEvent()
      uploadFormToReducer(dispatch, state, form)
    }
  }, [ load, setLoaded, dispatch, form, state ])
  return (
    <React.Fragment>
      {load
        ? <ProgressBar parent='contentContainer'/>
        : null}
      <div className='titleSection'>
        <h1 className={s.s1t}>Let's work<br/>together</h1>
        <p className={s.s1p}>Veniam incididunt eiusmod culpa dolore adipisicing fugiat et aliqua voluptate occaecat pariatur laboris dolor irure eiusmod id aliqua.</p>
      </div>

      <form
        action="https://formspree.io/hello.mirai.dev@gmail.com"
        method="POST"
        className={s.s2f}
        onSubmit={e => {
          e.preventDefault()
          submit()
        }}
        id='contactForm'>
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

        <DropDown
          className={s.s2i2}
          changeState={changeState}
          name='subject'
          type='text'
          values={subjectValues}
          required
          tabIndex={2}
          finite
        >I'd like to get in touch with you<br/>about</DropDown>

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
          name='clientEmail'
          type='email'
          value={state.clientEmail}
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

        <Button title='submit' className={s.submit} onClick={() => triggerSubmit()}>Say Hello</Button>
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

const DropDown = ({
  className,
  changeState,
  name,
  values,
  required, 
  tabIndex,
  inline,
  finite,
  style,
  children,
  width
}) => {
  const renderValues = () => values.map(v => <option key={`option_${v[0]}`} value={v[0]} title={v[0]}>{v[1]}</option>)
  return (
    <label style={{ ...style }} className={`${className ? className : ''} ${g.contactFormLabel} ${inline ? g.contactFormLabelInline :''}`}>
      {children}
      <div className={g.selectWrapper}>     
        <select
            tabIndex={tabIndex}
            className={g.contactFromDropDown}
            style={{ width, backgroundImage: `url(${downArrow})`, }}
            name={name}
            required={required || false}
            onChange={e => changeState(name, e.target.value)}>
          {renderValues()}
        </select>
      </div>
      <span>{finite ? '.' : ''}</span>
    </label>
  )
}

export default connect( ({ form }) => ({ form }) )(Contact)