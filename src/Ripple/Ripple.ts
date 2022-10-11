import styles from './ripple.style.css' assert { type: 'css' }

type Options = {
  clientX?: number
  clientY?: number
  pulsate?: boolean
}

export default class Ripple extends HTMLElement {
  rippleChildren: HTMLSpanElement[] = []

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets.push(styles)
    this.rippleChildren = []
  }

  get center() {
    return this.getAttribute('center') !== null
  }

  static get observedAttributes() {
    return ['center']
  }
  attributeChangedCallback() {
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  get rippleRoot() {
    return this.shadowRoot.querySelector<HTMLSpanElement>('.MaxRipple-root')
  }

  render() {
    this.shadowRoot.innerHTML = `
      <span class="MaxRipple-root"></span>
    `
  }

  /**
   * 创建以下结构：
   *   <span class="MaxRipple-child enter">
   *     <span class="MaxRipple-child-child"></span>
   *   </span>
   */
  createRippleChild(rect: Pick<CSSStyleDeclaration, 'width' | 'height' | 'top' | 'left'>) {
    const rippleChild = document.createElement('span')
    rippleChild.classList.add('MaxRipple-child', 'enter')
    const rippleChildChild = document.createElement('span')
    rippleChildChild.classList.add('MaxRipple-child-child')
    rippleChild.appendChild(rippleChildChild)

    const { height, left, top, width } = rect
    if (height) rippleChild.style.height = rect.height
    if (width) rippleChild.style.width = rect.width
    if (top) rippleChild.style.top = rect.top
    if (left) rippleChild.style.left = rect.left
    this.rippleChildren.push(rippleChild)

    return rippleChild
  }

  start(options: Options) {
    const { left, top, width, height } = this.rippleRoot.getBoundingClientRect()
    const { clientX = 0, clientY = 0, pulsate = false } = options || {}

    const center = this.center || pulsate
    const rippleX = center ? width / 2 : clientX - left
    const rippleY = center ? height / 2 : clientY - top

    // 从鼠标点击的中心位置，构造一个能正好包围当前元素的圆
    const sizeX = Math.max(width - rippleX, rippleX) * 2
    const sizeY = Math.max(height - rippleY, rippleY) * 2
    const diagonal = Math.sqrt(sizeX ** 2 + sizeY ** 2)

    const rippleChild = this.createRippleChild({
      width: `${diagonal}px`,
      height: `${diagonal}px`,
      left: `${-diagonal / 2 + rippleX}px`,
      top: `${-diagonal / 2 + rippleY}px`,
    })

    if (pulsate) {
      rippleChild.classList.add('pulsate')
    }

    this.rippleRoot.appendChild(rippleChild)
  }

  stop() {
    const rippleChild = this.rippleChildren.shift()

    if (!rippleChild) return

    rippleChild.addEventListener('animationend', (event) => {
      if (event.animationName === 'exitKeyframe') {
        rippleChild.remove()
      }
    })
    rippleChild.classList.add('exit')
  }
}
