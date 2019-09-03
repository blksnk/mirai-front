import React from 'react'
import * as PIXI from 'pixi.js'
import tweenManager from 'pixi-tween'
import g from 'uikit/uikit.module.css'
import displacementSource from 'assets/pixi/displacement_map_0.png'

let count = .25
const intervalDelay = 30
const initIntevalCount = 30
let intervalCount = initIntevalCount
const padding = 50

let displacementFilter, displacementSprite
let renderer, sprites, stage

let ticker = PIXI.ticker.shared

const setScene = (urls, playground, uid) => {
  renderer = PIXI.autoDetectRenderer(playground.offsetWidth, playground.offsetHeight)
  renderer.interactive = true
  renderer.autoResize = true
  window.addEventListener('resize', () => renderer.resize())
  playground.appendChild(renderer.view)

  ticker.add(function(delta) {
    PIXI.tweenManager.update()
  })

  stage = new PIXI.Container()

  initDisplacementFilter(renderer)
  stage.addChild(displacementSprite)

  sprites = createSprites(urls, renderer)
  sprites.forEach(sprite => {
    stage.addChild(sprite[0])
  })

  // document.addEventListener('mousedown', () => {
  //   translate(0, 1, 300)
  // })

  animate(playground, uid)
}


const initDisplacementFilter = renderer => {
  displacementSprite = new PIXI.extras.TilingSprite(createDisplacementTexture(), renderer.width, renderer.height)
  displacementSprite.scale.x = initIntevalCount / 10
  displacementSprite.scale.y = initIntevalCount / 10

  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)
}

const createDisplacementTexture = () => {
  let displacementTexture = PIXI.Texture.fromImage(displacementSource)
  displacementTexture.baseTexture.isPowerOfTwo = true
  displacementTexture.baseTexture.mipmap = false
  displacementTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
  return displacementTexture
}


const createSprites = (urls, renderer) => {
  const sprites = urls.map((url, index) => {
    const texture = PIXI.Texture.fromImage(url)
    let sprite = new PIXI.Sprite(texture)
    sprite.position.x = - padding / 2 + ((renderer.width + padding / 2) * index)
    sprite.position.y = - padding / 2
    sprite.width = renderer.width + padding
    sprite.anchor.x = 0
    sprite.interactive = true
    return [ sprite, texture ]
  })
  return sprites
}



const animate = (playground, uid) => {
  requestAnimationFrame(() => animate(playground, uid))
  displacementSprite.x += count
  displacementSprite.y += count

  sprites.forEach(item => {
    const [ sprite, texture ] = item
    preserveAspectRatio(sprite, texture, uid, playground)
  })
  resizeRenderer(renderer, playground)

  stage.filters = [ displacementFilter ]
  renderer.render(stage)
}

const resizeRenderer = (renderer, playground) => {
  if(renderer.height !== playground.offsetHeight || renderer.width !== playground.offsetWidth) {
    renderer.resize(playground.offsetWidth, playground.offsetHeight)
  }
}

const preserveAspectRatio = (sprite, texture, uid, playground) => {
  const { offsetWidth, offsetHeight } = getPlaygroundDimensions(uid, playground)
  const { width, height } = texture
   //get aspect ratio
  const apspectRatio = width / height

  //get new w and h
  let newWidth = offsetWidth + padding
  let newHeight = newWidth / apspectRatio

  //ckeck if height < window height
  if(newHeight - padding < offsetHeight) {
    newHeight = offsetHeight + padding
    newWidth = newHeight * apspectRatio
  }
  //set new width according to aspect ratio
  sprite.width = newWidth
  sprite.height = newHeight
}

const getPlaygroundDimensions = (uid, playground) => {
  const hot = document.getElementById(uid)
  let h, w
  if(hot) {
    const { offsetHeight, offsetWidth } = hot
    h = offsetHeight
    w = offsetWidth
  } else {
    const { offsetHeight, offsetWidth } = playground
    h = offsetHeight
    w = offsetWidth
  }
  return { offsetHeight: h, offsetWidth: w }
}



export const translate = (currentIndex, scrollToIndex, duration) => {
  if(sprites[scrollToIndex][0].position.x === - padding / 2) {
    console.log('no move needed')
  } else {
    sprites.forEach(item => {
      const [ sprite ] = item
      const tween = PIXI.tweenManager.createTween(sprite)
      tween.from({ x: sprite.position.x })
      tween.time = duration

      if(currentIndex < scrollToIndex) {
        tween.to({ x: sprite.position.x - renderer.width - padding / 2 })
        // sprite.position.x -= renderer.width + padding / 2
      } else if (currentIndex > scrollToIndex) {
        tween.to({ x: sprite.position.x + renderer.width + padding / 2 })
        // sprite.position.x += renderer.width + padding / 2
      }
      if(currentIndex !== scrollToIndex) {
        tween.start()
      }
    })
  }
}


const ProjectThumbs = ({ urls, className, alt, ...props }) => {
  const [state, setState] = React.useState(false)
  const uid = 'px-render-projects'

  React.useEffect(() => {
    if(!state) {
      let playground = document.getElementById(uid)
      setScene(urls, playground, uid)
      setState(true)
    }
  }, [ state, setState, uid, urls ])
  return <div title={alt} className={`${g.animatedImgWrapper} ${className ? className : ''}`} {...props} id={uid}></div>
}

export default ProjectThumbs