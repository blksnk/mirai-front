import React from 'react'
import { withRouter } from 'react-router-dom'

import MenuIcon from './MenuIcon'

import about from 'assets/icons/ios-bicycle.svg'
import projects from 'assets/icons/ios-folder-open.svg'
import contact from 'assets/icons/ios-create.svg'
import linkedin from 'assets/icons/logo-linkedin.svg'
import instagram from 'assets/icons/logo-instagram.svg'
import github from 'assets/icons/logo-github.svg'
import gitlab from 'assets/icons/md-git-branch.svg'



import s from './RightNav.module.css'

const RightNav = ({ history }) => {
  const [expanded, setExpansion] = React.useState(false)
  const retract = () => {
    if(expanded) {
      setExpansion(false)
    }
  }
  return (
  <nav className={`${s.nav} ${expanded ? s.expanded : ''}`}>
    <div className={s.left}>
      <MenuBtn expanded={expanded} setExpansion={setExpansion} hide={expanded}/>
      <Links h={history} retract={retract} />

      <Socials h={history} retract={retract} />
    </div>
    <div className={s.right}>
      <MenuBtn expanded={expanded} setExpansion={setExpansion}/>
      <LinkLabels h={history} retract={retract}/>
      <SocialLabels h={history} retract={retract}/>
    </div>
  </nav>
  )
}

const Links = ({ h, retract }) => 
  <div className={s.links}>
    <LinkIcon retract={retract} icon={about} href='/about' title='about' h={h}/>
    <LinkIcon retract={retract} icon={projects} href='/projects' title='projects' h={h}/>
    <LinkIcon retract={retract} icon={contact} href='/contact' title='contact' h={h}/>
  </div>

const LinkLabels = ({ h, retract }) => 
  <div className={`${s.links} ${s.linkLabel}`}>
    <LinkIcon retract={retract} href='/about' title='about' h={h} label='about'/>
    <LinkIcon retract={retract} href='/projects' title='projects' h={h} label='projects'/>
    <LinkIcon retract={retract} href='/contact' title='contact' h={h} label='contact'/>
  </div>

const Socials = ({ h, retract }) =>
  <div className={s.socials}>
    <LinkIcon icon={linkedin} retract={retract} href='https://www.linkedin.com/in/jn-veigel/' title='linkedin' external/>
    <LinkIcon icon={gitlab} retract={retract} href='https://www.gitlab.com/blksnk' title='gitlab' external/>
    <LinkIcon icon={github} retract={retract} href='https://www.github.com/blksnk' title='github' external/>
    <LinkIcon icon={instagram} retract={retract} href='https://www.instagram.com/chxmpetre' title='instagram' external/>
  </div>

const SocialLabels = ({ h, retract }) => 
  <div className={`${s.socials} ${s.linkLabel}`}>
    <LinkIcon retract={retract} href='https://www.linkedin.com/in/jn-veigel/' title='linkedin' external label='linkedin' />
    <LinkIcon retract={retract} href='https://www.gitlab.com/blksnk' title='gitlab' external label='gitlab'/>
    <LinkIcon retract={retract} href='https://www.github.com/blksnk' title='github' external label='github'/>
    <LinkIcon retract={retract} href='https://www.instagram.com/chxmpetre' title='instagram' external label='instagram'/>
  </div>

const LinkIcon = ({ href, icon, title, h, external, label, retract, className, }) => {
  const active = checkActive(href)
  return (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    title={title}
    className={`${s.linkIcon} ${active ? s.active : ''} ${className}`}
    onClick={e => {
      if(retract) {
        retract()
      }
      redirectTo(e, href, h, external)
    }}
  >
    {label
      ? <span>{`${label}.`}</span>
      : <img src={icon} alt={title}/>
    }
  </a>
  )
}

const checkActive = href => window.location.pathname === href

const redirectTo = (e, href, h, external) => {
  if(!external) {
    e.preventDefault()
    e.stopPropagation()
    if(window.location.pathname !== href) {
      h.push(href)
    }
  }
}

const MenuBtn = ({ expanded, setExpansion, hide }) => 
  <button
    className={`${s.menuBtn} ${hide ? s.hidden : ''}`}
    onClick={() => setExpansion(!expanded)}
  >
    <MenuIcon active={expanded}/>
  </button>


export default withRouter(RightNav)