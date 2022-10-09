import styles from './button.style.css' assert { type: 'css' }

export interface MaxButtonProps {
  variant?: 'text' | 'contained' | 'outlined'
  color?: 'primary' | 'secondary' | 'success'
  style?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default class MaxButton extends HTMLElement {
  readonly #rippleChildren: HTMLSpanElement[] = []

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [styles]
  }

  get #rippleRoot() {
    return this.shadowRoot.querySelector<HTMLSpanElement>('button > .MaxRipple-root')
  }

  // --------- attributes ----------
  static get observedAttributes() {
    return ['disabled', 'color', 'variant', 'type']
  }
  get color() {
    return this.getAttribute('color') || 'primary'
  }
  get variant() {
    return this.getAttribute('variant') || 'contained'
  }
  get disabled() {
    return this.getAttribute('disabled') !== null
  }
  get type() {
    return this.getAttribute('type') || 'button'
  }
  // --------- attributes ----------

  attributeChangedCallback() {
    this.render()
  }

  connectedCallback() {
    this.render()
    if (this.#rippleRoot) {
      this.addEventListener('mousedown', this.#startRipple)
      this.addEventListener('focus', this.#startRipple)
      this.addEventListener('mouseup', this.#stopRipple)
      this.addEventListener('mouseleave', this.#stopRipple)
      this.addEventListener('blur', this.#stopRipple)
    }
  }

  render() {
    const tabindex = this.disabled ? -1 : 0

    this.shadowRoot.innerHTML = `
      <button
        ${this.disabled ? 'disabled' : ''}
        type="${this.type}"
        tabindex=${tabindex}
      >
        <slot></slot>
        ${this.disabled ? '' : '<span class="MaxRipple-root"></span>'}
      </button>
    `

    if (this.disabled) {
      this.style.pointerEvents = 'none'
    }
  }

  #createRippleChild(rect: Pick<CSSStyleDeclaration, 'width' | 'height' | 'top' | 'left'>) {
    // eslint-disable-next-line padded-blocks
    /**
     * 创建以下结构：
     * <span class="MaxRipple-child enter">
     *   <span class="MaxRipple-child-child"></span>
     * </span>
     */
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

    this.#rippleChildren.push(rippleChild)

    return rippleChild
  }

  #startRipple(event: MouseEvent | FocusEvent) {
    const { left, top, width, height } = this.getBoundingClientRect()

    let clientX = 0
    let clientY = 0

    /**
     * 涟漪效果是否从节点的中心扩散，否则从鼠标点击的位置开始扩散
     * 使用 Tab 键移动焦点的时候，从节点的中心扩散
     */
    let center = false
    let isFocusVisible = false

    if (event instanceof FocusEvent) {
      const button = this.shadowRoot.querySelector<HTMLButtonElement>('button')
      if (!button || !button.matches(':focus-visible')) {
        return
      }
      center = true
      isFocusVisible = true
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }

    const rippleX = center ? width / 2 : clientX - left
    const rippleY = center ? height / 2 : clientY - top

    // 从鼠标点击的中心位置，构造一个能正好包围当前元素的圆
    const sizeX = Math.max(width - rippleX, rippleX) * 2
    const sizeY = Math.max(height - rippleY, rippleY) * 2
    const diagonal = Math.sqrt(sizeX ** 2 + sizeY ** 2)

    const rippleChild = this.#createRippleChild({
      width: `${diagonal}px`,
      height: `${diagonal}px`,
      left: `${-diagonal / 2 + rippleX}px`,
      top: `${-diagonal / 2 + rippleY}px`,
    })
    if (isFocusVisible) {
      rippleChild.classList.add('pulsate')
    }
    this.#rippleRoot.appendChild(rippleChild)
  }

  #stopRipple() {
    const rippleChild = this.#rippleChildren.shift()

    if (!rippleChild) return

    rippleChild.addEventListener('animationend', (event) => {
      if (event.animationName === 'exitKeyframe') {
        rippleChild.remove()
      }
    })
    rippleChild.classList.add('exit')
  }
}
