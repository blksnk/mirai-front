import React, { Component } from 'react';
import s from 'stylesheets/progress.css'
import _ from 'underscore';

const ProgressBarHooks = ({ parent }) => {
	const parentHTML = document.querySelector(`.${parent}`)
	const [progress, setProgress] = React.useState(computePercentage(parentHTML))

	React.useEffect(() => {
		if(parentHTML) {
			parentHTML.addEventListener('scroll', e => debounceScroll(e, progress, setProgress), {passive: true})
			return () => parentHTML.removeEventListener('scroll', debounceScroll)
		}
	}, [parent, parentHTML, progress, setProgress])

	return (
	  <div className='progressbar-container'>
	  	<div className='progressbar-progress' style={{ height: `${progress}%` }}></div>
	  </div>
	)
}

const debounceScroll = (e, progress, setProgress) => {
	_.debounce(handleScroll(e, progress, setProgress), 50, false)
}

const computePercentage = t => Math.min(Math.max(Math.round(((t.scrollTop + t.clientHeight)/t.scrollHeight*100) * 100) / 100, 0), 100)

const handleScroll = (e, progress, setProgress) => {
	let currentScroll = computePercentage(e.target)
	if(currentScroll !== progress) {
		setProgress(currentScroll)
		// requestAnimationFrame(() => setProgress(currentScroll))
	}
}

export default ProgressBarHooks