import classNames from "classnames";
import style from './Button.style'

export interface MaxButtonProps {
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success";
  style?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

class MaxButton extends HTMLElement {

  constructor() {
    super();

    const color = this.getAttribute("color");
    const variant = this.getAttribute("variant");
    const disabled = this.getAttribute("disabled");
    const type = this.getAttribute("type") || "button";

    const html = `
      <style>
        ${style}
      </style>
      <button
        class="${classNames("MaxButton-root", {
          [`MaxButton-${variant}`]: variant,
          [`MaxButton-${color}`]: color,
          [`MaxButton-disabled`]: disabled !== null,
        })}"
        ${disabled !== null ? `disabled` : ``}
        type="${type}"
        tabindex="0"
      >
        <slot>Button</slot>
        <span class="MaxRipple-root"></span>
      </button>
    `;
    
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.innerHTML = html;

    const rippleRoot = shadowRoot.querySelector('.MaxButton-root > .MaxRipple-root');
    
    this.addEventListener('mousedown', (event) => {
      if (!rippleRoot) return

      const { clientX, clientY } = event
      const { left, top, width, height } = this.getBoundingClientRect()

      const rippleX = Math.round(clientX - left);
      const rippleY = Math.round(clientY - top);

      // 从鼠标点击的中心位置，构造一个能正好包围当前元素的圆
      const sizeX = Math.max(Math.round(width) - rippleX, rippleX) * 2;
      const sizeY = Math.max(Math.round(height) - rippleY, rippleY) * 2;
      const diagonal = Math.round(Math.sqrt(sizeX * sizeX + sizeY * sizeY));

      const rippleChild = this.createRippleChild(
        {
          width: `${diagonal}px`,
          height: `${diagonal}px`,
          left: `${-diagonal / 2 + rippleX}px`,
          top: `${-diagonal / 2 + rippleY}px`,
        },
      )

      rippleRoot.appendChild(rippleChild)
    })
  }

  createRippleChild(
    rect: Pick<CSSStyleDeclaration, 'width' | 'height' | 'top' | 'left'>,
  ) {
    const rippleChild = document.createElement('span')
    rippleChild.classList.add('MaxRipple-child')

    rippleChild.addEventListener('animationend', (event) => {
      const node = event.target as HTMLSpanElement
      if (node) {
        node.remove()
      }
    })

    const { height, left, top, width } = rect
    if (height) rippleChild.style.height = rect.height
    if (width) rippleChild.style.width = rect.width
    if (top) rippleChild.style.top = rect.top
    if (left) rippleChild.style.left = rect.left

    return rippleChild
  }
}

window.customElements.define("max-button", MaxButton);
