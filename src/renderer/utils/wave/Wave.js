import raf from 'raf'
import lerp from 'lerp'
import hexrgb from 'hexrgb'
import Curve from './Curve'
import fit from 'canvas-fit'
import _ from 'lodash'

export default class Wave {
  constructor (opt = {}) {
    this.container = opt.container

    const containerWidth = window.getComputedStyle(this.container).width.replace('px', '')
    const containerHeight = window.getComputedStyle(this.container).height.replace('px', '')

    this.opt = {
      ...{
        ratio: 1,
        speed: 0.2,
        amplitude: 1,
        frequency: 6,
        color: '#000000',
        cover: false,
        width: containerWidth,
        height: containerHeight,
        autostart: false,
        pixelDepth: 0.02,
        lerpSpeed: 0.3
      },
      ...opt
    }

    this.phase = 0
    this.run = false
    this.speed = Number(this.opt.speed)
    this.amplitude = Number(this.opt.amplitude)
    this.width = Number(this.opt.ratio * this.opt.width)
    this.height = Number(this.opt.ratio * this.opt.height)
    this.heightMax = Number(this.height / 2) - 6
    this.color = hexrgb.hex2rgb(this.opt.color)
    this.resizeDelayed = _.throttle(this.resize, 50)

    this.interpolation = {
      speed: this.speed,
      amplitude: this.amplitude
    }

    this.canvas = document.createElement('canvas')
    this._fit()
    this._setupListeners()

    this.ctx = this.canvas.getContext('2d')

    this.curves = []

    for (const def of Curve.getDefinition()) {
      this.curves.push(
        new Curve({
          ctrl: this,
          definition: def
        })
      )
    }

    // Attach to the container
    this.container.appendChild(this.canvas)

    // Start the animation
    if (opt.autostart) {
      this.start()
    }
  }

  _setupListeners = () => {
    window.addEventListener('resize', this.resizeDelayed, false)
  }

  _setDimensions = () => {
    this.opt.width = window.getComputedStyle(this.container).width.replace('px', '')
    this.opt.height = window.getComputedStyle(this.container).height.replace('px', '')
    this.width = Number(this.opt.ratio * this.opt.width)
    this.height = Number(this.opt.ratio * this.opt.height)
    this.heightMax = Number(this.height / 2) - 6
  }

  _fit = () => {
    fit(this.canvas)
  }

  resize = () => {
    this._setDimensions()
    this._fit()
  }

  lerp (propertyStr) {
    this[propertyStr] = lerp(
      this[propertyStr],
      this.interpolation[propertyStr],
      this.opt.lerpSpeed
    )
    if (this[propertyStr] - this.interpolation[propertyStr] === 0) {
      this.interpolation[propertyStr] = null
    }
    return this[propertyStr]
  }

  _clear () {
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.globalCompositeOperation = 'source-over'
  }

  _draw () {
    for (const curve of this.curves) {
      curve.draw()
    }
  }

  startDrawCycle = () => {
    if (this.run === false) return
    this._clear()

    // Interpolate values
    if (this.interpolation.amplitude !== null) this.lerp('amplitude')
    if (this.interpolation.speed !== null) this.lerp('speed')

    this._draw()
    this.phase = (this.phase + (Math.PI / 2) * this.speed) % (2 * Math.PI)

    raf(this.startDrawCycle, 16)
  }

  start () {
    this.phase = 0
    this.run = true
    this.startDrawCycle()
  }

  stop () {
    this.phase = 0
    this.run = false
  }

  set (propertyStr, v) {
    this.interpolation[propertyStr] = Number(v)
  }

  destroy () {
    this.stop()
    window.removeEventListener('resize', this.resizeDelayed, false)
  }
}
