import React from 'react'
import Draggable from 'react-draggable'
import classNames from 'classnames'

const browserPrefix = (function() {
  if (typeof window === 'undefined') return ''
  // Thanks David Walsh
  const styles = window.getComputedStyle(document.documentElement, ''),
  pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1]
  // 'ms' is not titlecased
  if (pre === 'ms') return pre
  return pre.slice(0, 1).toUpperCase() + pre.slice(1)
})()

const assign = Object.assign

function canDragX(draggable) {
  return draggable.props.axis === 'both' || draggable.props.axis === 'x'
}

function canDragY(draggable) {
  return draggable.props.axis === 'both' || draggable.props.axis === 'y'
}

function createCSSTransform(style) {
  // Replace unitless items with px
  const x = `${style.x} px`
  const y = `${style.y} px`
  const out = {transform: `translate(${x}, ${y}) translateZ(0)`}
  // Add single prefixed property as well
  if (browserPrefix) {
    out[`${browserPrefix} Transform`] = out.transform
  }
  return out
}

Object.assign(Draggable.prototype, {
  render() {
    // Create style object. We extend from existing styles so we don't
    // remove anything already set (like background, color, etc).
    const childStyle = this.props.children.props.style || {}

    // Add a CSS transform to move the element around. This allows us to move the element around
    // without worrying about whether or not it is relatively or absolutely positioned.
    // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
    // has a clean slate.

    const x = canDragX(this) ? this.state.clientX : this.props.start.x, 
    y = canDragY(this) ? this.state.clientY : this.props.start.y

      const transform = createCSSTransform({
      // Set left if horizontal drag is enabled
      x,
      // Set top if vertical drag is enabled
      y
    })

    // Workaround IE pointer events; see #51
    // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
    const touchHacks = {
      touchAction: 'none'
    }

    const style = assign({}, childStyle, transform, touchHacks)

    if (this.props.parseStyle) {
      this.props.parseStyle(style, this)
    }

    // Set zIndex if currently dragging and prop has been provided
    if (this.state.dragging && !isNaN(this.props.zIndex)) {
      style.zIndex = this.props.zIndex
    }

    const className = classNames((this.props.children.props.className || ''), 'react-draggable', {
      'react-draggable-dragging': this.state.dragging,
      'react-draggable-dragged': this.state.dragged
    })

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(React.Children.only(this.props.children), {
      style,
      className,
      onMouseDown: this.onMouseDown,
      onTouchStart: this.onTouchStart,
      onMouseUp: this.handleDragEnd,
      onTouchEnd: this.handleDragEnd
    })
  }
})

export default Draggable