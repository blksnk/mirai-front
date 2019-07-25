import React from 'react'

import g from 'uikit/uikit.module.css'

const Logo = ({ vertical, onClick, history, className }) =>{
  const props = {
    onClick: () => triggerAction(onClick, history),
    className: `${vertical ? g.logoVertical : g.logoHorizontal} ${g.logoVector} ${className ? className : ''}`,
    title: 'Home.',
    color: '#F5FBFE',
  }

  if (vertical) {
    return <Vertical {...props}/>
  } else {
    return <Horizontal {...props}/>
  }
}
const Vertical = ({ className, title, onClick, color }) => 
<svg xmlns="http://www.w3.org/2000/svg" className={className} fill={color} onClick={onClick} viewBox="0 0 47.13 119.63">
  <title>{title}</title>
  <path d="M36.5,11.13V58.25H29.25V11.13a3.63,3.63,0,1,0-7.25,0V58.25H14.75V11.13a3.63,3.63,0,1,0-7.25,0V58.25H.25V.25H11.13c4,0,7.24,1.62,7.24,3.62,0-2,3.25-3.62,7.26-3.62A10.86,10.86,0,0,1,36.5,11.13Z" transform="translate(-0.25 -0.25)"/>
  <path d="M25.62,69.13A3.62,3.62,0,0,0,22,72.76V80H14.75V61.88H25.62A10.87,10.87,0,0,1,36.5,72.76V109c0,6-3.24,10.88-7.25,10.88H22c-4,0-7.25-4.86-7.25-10.88V94.5c0-6,3.24-10.87,7.25-10.87s7.25,1.62,7.25,3.63V72.76A3.62,3.62,0,0,0,25.62,69.13ZM22,109a3.63,3.63,0,1,0,7.25,0V94.5a3.63,3.63,0,0,0-7.25,0Z" transform="translate(-0.25 -0.25)" />
  <path d="M47.37,11.13V58.25H40.13V11.13Z" transform="translate(-0.25 -0.25)"/>
  <rect x="39.88" width="7.24" height="7.25"/>
  <rect x="39.87" y="112.38" width="7.26" height="7.25"/>
  <path d="M47.38,72.76V109H40.12V72.76Z" transform="translate(-0.25 -0.25)"/>
  <rect x="39.87" y="61.63" width="7.26" height="7.25"/>
  <path d="M11.13,61.88v7.24A3.64,3.64,0,0,0,7.5,72.75v47.13H.26V72.75A10.86,10.86,0,0,1,11.13,61.88Z" transform="translate(-0.25 -0.25)"/>
</svg>

const Horizontal = ({ className, onClick, title, color }) =>
<svg xmlns="http://www.w3.org/2000/svg" className={className} fill={color} onClick={onClick} viewBox="0 0 97.88 58.01">
  <title>{title}</title>
  <path d="M36.5,11.13V58.25H29.25V11.13a3.63,3.63,0,1,0-7.25,0V58.25H14.75V11.13a3.63,3.63,0,1,0-7.25,0V58.25H.25V.25H11.13c4,0,7.24,1.62,7.24,3.62,0-2,3.25-3.62,7.26-3.62A10.86,10.86,0,0,1,36.5,11.13Z" transform="translate(-0.25 -0.25)"/>
  <rect x="39.88" width="7.24" height="7.25"/>
  <path d="M47.37,11.13V58.25H40.13V11.13Z" transform="translate(-0.25 -0.25)"/>
  <rect x="90.62" y="50.75" width="7.26" height="7.25"/>
  <path d="M98.13,11.13V47.37H90.87V11.13Z" transform="translate(-0.25 -0.25)"/>
  <rect x="90.62" width="7.26" height="7.25"/>
  <path d="M61.88.26V7.5a3.64,3.64,0,0,0-3.63,3.63V58.26H51V11.13A10.86,10.86,0,0,1,61.88.26Z" transform="translate(-0.25 -0.25)"/>
  <path d="M87.25,11.13V47.37c0,6-3.24,10.88-7.25,10.88H72.75c-4,0-7.25-4.86-7.25-10.88V32.87c0-6,3.24-10.87,7.25-10.87S80,23.62,80,25.63V11.13a3.63,3.63,0,1,0-7.25,0v7.24H65.5V.25H76.37A10.87,10.87,0,0,1,87.25,11.13ZM80,47.37V32.87a3.63,3.63,0,0,0-7.25,0v14.5a3.63,3.63,0,1,0,7.25,0Z" transform="translate(-0.25 -0.25)"/>
</svg>

const triggerAction = (onClick, history) => {
  if(onClick) {
    onClick()
  } else {
    history.push('/')
  }
}

export default Logo