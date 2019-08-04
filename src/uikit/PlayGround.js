import React from 'react'
import AnimatedImg from 'uikit/AnimatedImg'

import src from 'assets/images/tower.jpg'

const PlayGround = () => <div className='playground' style={{ width: 'var(--center-w)', height: '100vh' }}>
  <AnimatedImg src={src}/>
</div>

export default PlayGround