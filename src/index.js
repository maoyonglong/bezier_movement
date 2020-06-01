import {linear, quadratic, cubic} from './bezier'

const isDef = (val) => typeof val !== 'undefined'
const contains = (arr, item) => arr.indexOf(item) >= 0
const isEmpty = (arr) => arr.length === 0

class BezierMovement {
  constructor (options) {
    // set default
    this.type = 'quadratic'
    this.autoPlay = false
    this.trackPoints = []
    this.fixedPoints = []
    this.container = document.body
    this.setOptions(options)
    if (this.autoPlay) {
      this.play()
    }
  }

  refreshTrack () {
    this.removeTrack()
    this.genTrack()
    return this
  }

  removeTrack () {
    this.trackPoints.forEach(point => {
      point.remove()
    })
    this.trackPoints = []
    return this
  }

  genTrack (count = 0) {
    const t = this._calcT(count, t)
    const points = this._calcBezierPoint(t)
    const point = document.createElement('div')
    this.trackPoints.push(point)
    point.className = 'track-point'
    point.style.position = 'absolute'
    point.style.left = points.x + 'px'
    point.style.top = points.y + 'px'
    this.container.appendChild(point)
    if (t < 1) {
      count++
      this.genTrack(count)
    }
    return this
  }

  toggleTrack (flag) {
    this.trackPoints.forEach(point => {
      point.style.display = flag ? 'block' : 'none'
    })
    return this
  }

  _setOptionValue (key, val, enums = [], required = false) {
    if (isDef(val)) {
      if (!isEmpty(enums) && !contains(enums, val)) {
        throw new Error(`[error]: the value of the ${key} option must be one of ${enums}.`)
      }
      this[key] = val || this[key]
    } else if (required) {
      throw new Error(`[error]: the value of the ${key} option is required.`)
    }
  }

  setOptions (options) {
    const optionsConfig = {
      type: [['linear', 'quadratic', 'cubic']],
      target: [[], true],
      container: [[], true],
      start: [[], true],
      end: [[], true],
      autoPlay: [[true, false]],
      fixedPoints: [[], true],
      onEnd: [[], false]
    }
    if (options.type) {
      this._setOptionValue.apply(this, ['type', options.type].concat(optionsConfig.type))
      delete options.type
    }
    if (options.fixedPoints) {
      const len = options.fixedPoints.length
      const type = this.type
      const fixedPointsSelections = [
        ['linear', 0, 'zero'],
        ['quadratic', 1, 'one'],
        ['cubic', 2, 'two']
      ]
      fixedPointsSelections.forEach(selection => {
        if (type === selection[0] && len !== selection[1]) {
          throw new Error(`[error]: the length of fixedPoints should be ${selection[2]} when type is ${selection[0]}.`)
        }
      })
      this._setOptionValue.apply(this, ['fixedPoints', options.fixedPoints].concat(optionsConfig.fixedPoints))
      delete options.fixedPoints
    }
    for (const [key, val] of Object.entries(options)) {
      if (isDef(optionsConfig[key])) {
        this._setOptionValue.apply(this, [key, val].concat(optionsConfig[key]))
      } else {
        throw new Error(`[error]: the ${key} option isn't existed.`)
      }
    }
    return this
  }

  bezier (type) {
    if (type === 'linear') {
      return linear
    } else if (type === 'quadratic') {
      return quadratic
    } else {
      return cubic
    }
  }

  _calcBezierPoint (t) {
    const {type, start, end} = this
    let result

    if (type === 'linear') {
      result = linear(start, end, t)
    } else if (type === 'quadratic') {
      result = quadratic(start, end, this.fixedPoints[0], t)
    } else {
      result = cubic(start, end, this.fixedPoints[0], this.fixedPoints[1], t)
    }

    return result
  }

  _calcT (count) {
    return 1 / 30 * count
  }

  setCalcT (fn) {
    this._calcT = fn
    return this
  }

  _move (target, count) {
    const t = this._calcT(count, t)
    const points = this._calcBezierPoint(t)
    target.style.left = points.x + 'px'
    target.style.top = points.y + 'px'
    if (t < 1) {
      count++
      requestAnimationFrame(() => {
        this._move(target, count)
      })
    } else {
      if (isDef(this.onEnd)) {
        this.onEnd()
      }
    }
  }

  play () {
    const {target, start, end} = this
    if ([target, start, end].every(isDef)) {
      let count = 0
      target.style.position = 'absolute'
      requestAnimationFrame(() => {
        this._move(target, count)
      })
    } else {
      throw new Error('[error]: the target, start and end option must be defined.')
    }
    return this
  }
}

export default BezierMovement
