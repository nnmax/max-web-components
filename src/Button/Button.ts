import classNames from "../utils/classNames";
import style, { exitKeyframeName } from './Button.style'

export interface MaxButtonProps {
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success";
  style?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default class MaxButton extends HTMLElement {

  private readonly rippleRoot: HTMLSpanElement | null
  private readonly rippleChildren: HTMLSpanElement[] = []

  constructor() {
    super();

    const color = this.getAttribute("color") || 'primary';
    const variant = this.getAttribute("variant") || 'contained';
    const disabled = this.getAttribute("disabled") !== null;
    const type = this.getAttribute("type") || "button";

    const tabindex = disabled ? -1 : 0

    const html = `
      <style>
        ${style}
      </style>
      <button
        class="${classNames("MaxButton-root", {
          [`MaxButton-${variant}`]: variant,
          [`MaxButton-${color}`]: color,
          [`MaxButton-disabled`]: disabled,
        })}"
        ${disabled ? `disabled` : ``}
        type="${type}"
        tabindex=${tabindex}
      >
        <slot></slot>
        ${disabled ? '' :  `<span class="MaxRipple-root"></span>`}
      </button>
    `;
    
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.innerHTML = html;

    this.rippleRoot = shadowRoot.querySelector('.MaxButton-root > .MaxRipple-root');

    if (disabled) {
      this.style.pointerEvents = 'none'
    }
    
    if (this.rippleRoot) {
      this.addEventListener('mousedown', this.startRipple)
      this.addEventListener('focus', this.startRipple)
      this.addEventListener('mouseup', this.stopRipple)
      this.addEventListener('mouseleave', this.stopRipple)
      this.addEventListener('blur', this.stopRipple)
    }
  }

  private createRippleChild(
    rect: Pick<CSSStyleDeclaration, 'width' | 'height' | 'top' | 'left'>,
  ) {
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

    this.rippleChildren.push(rippleChild)

    return rippleChild
  }

  private startRipple(event: MouseEvent | FocusEvent) {
    
    const { left, top, width, height } = this.getBoundingClientRect()
    let rippleX: number, rippleY: number
    let clientX = 0, clientY = 0
    /**
     * 涟漪效果是否从节点的中心扩散，否则从鼠标点击的位置开始扩散
     * 使用 Tab 键移动焦点的时候，从节点的中心扩散
     */
    let center = false
    let isFocusVisible = false

    if (event instanceof FocusEvent) {
      const button = this.shadowRoot.querySelector('.MaxButton-root') as HTMLButtonElement
      if (!button || !button.matches(':focus-visible')) {
        return
      }
      center = isFocusVisible = true
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }

    rippleX = center ? width / 2 : clientX - left;
    rippleY = center ? height / 2 : clientY - top;

    // 从鼠标点击的中心位置，构造一个能正好包围当前元素的圆
    const sizeX = Math.max(width - rippleX, rippleX) * 2;
    const sizeY = Math.max(height - rippleY, rippleY) * 2;
    const diagonal = Math.sqrt(sizeX ** 2 + sizeY ** 2);

    const rippleChild = this.createRippleChild(
      {
        width: `${diagonal}px`,
        height: `${diagonal}px`,
        left: `${-diagonal / 2 + rippleX}px`,
        top: `${-diagonal / 2 + rippleY}px`,
      },
    )
    if (isFocusVisible) {
      rippleChild.classList.add('pulsate')
    }
    this.rippleRoot.appendChild(rippleChild)
  }

  private stopRipple() {
    const rippleChild = this.rippleChildren.shift()

    if (!rippleChild) return

    rippleChild.addEventListener('animationend', (event) => {
      if (event.animationName === exitKeyframeName) {
        rippleChild.remove()
      }
    })
    rippleChild.classList.add('exit')
  }
}
