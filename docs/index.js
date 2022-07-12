function classNames(...names) {
    const classes = [];
    names.forEach(name => {
        if (typeof name === 'string' || typeof name === 'number') {
            if (name) {
                classes.push(String(name));
            }
        }
        else if (Array.isArray(name)) {
            name.forEach(val => {
                const className = classNames(val);
                if (className) {
                    classes.push(className);
                }
            });
        }
        else if (typeof name === 'object' && name !== null) {
            Object.keys(name).forEach(key => {
                if (name[key]) {
                    classes.push(key);
                }
            });
        }
    });
    return classes.join(' ');
}

const ANIMATION_DURATION = '550ms';
const enterKeyframeName = 'enterKeyframe';
const exitKeyframeName = 'exitKeyframe';
const pulsateKeyframeName = 'pulsateKeyframe';
const enterKeyframe = `
  @keyframes ${enterKeyframeName} {
    0% {
      transform: scale(0);
      opacity: 0.1;
    }

    100% {
      transform: scale(1)
      opacity: 0.3;
    }
  }
`;
const exitKeyframe = `
  @keyframes ${exitKeyframeName} {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
const pulsateKeyframe = `
  @keyframes ${pulsateKeyframeName} {
    0% {
      transform: scale(0.9);
    }

    50% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(0.9);
    }
  }
`;
const rippleStyle = `
  ${enterKeyframe}
  ${exitKeyframe}
  ${pulsateKeyframe}

  .MaxRipple-root {
    display: block;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background-color: transparent;
    z-index: 0;
    border-radius: inherit;
  }

  .MaxRipple-root > .MaxRipple-child {
    position: absolute;
    display: block;
    opacity: 0;
  }

  .MaxRipple-root > .MaxRipple-child.enter {
    opacity: 0.3;
    transform: scale(1);
    animation: ${enterKeyframeName} ${ANIMATION_DURATION} ease-in-out;
  }

  .MaxRipple-root > .MaxRipple-child > .MaxRipple-child-child {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  .MaxRipple-root > .MaxRipple-child.exit > .MaxRipple-child-child {
    opacity: 0;
    animation: ${exitKeyframeName} ${ANIMATION_DURATION} ease-in-out;
  }

  .MaxRipple-root > .MaxRipple-child.pulsate > .MaxRipple-child-child {
    position: absolute;
    left: 0;
    top: 0;
    animation: ${pulsateKeyframeName} 2500ms ease-in-out 200ms infinite;
  }
`;
const textStyle = `
  .MaxButton-text {
    background-color: transparent;
    color: #1976d2;
  }

  .MaxButton-text:hover {
    background-color: rgba(25, 118, 210, 0.04);
  }

  .MaxButton-text.MaxButton-secondary {
    color: #9c27b0;
  }

  .MaxButton-text.MaxButton-secondary:hover {
    background-color: rgba(156, 39, 176, 0.04);
  }

  .MaxButton-text.MaxButton-success {
    color: #2e7d32;
  }

  .MaxButton-text.MaxButton-success:hover {
    background-color: rgba(46, 125, 50, 0.04);
  }

  .MaxButton-text.MaxButton-error {
    color: #d32f2f;
  }

  .MaxButton-text.MaxButton-error:hover {
    background-color: rgba(211, 47, 47, 0.04);
  }

  .MaxButton-text.MaxButton-warning {
    color: #ed6c02;
  }

  .MaxButton-text.MaxButton-warning:hover {
    background-color: rgba(237, 108, 2, 0.04);
  }

  .MaxButton-text.MaxButton-disabled {
    color: rgba(0, 0, 0, 0.26);
  }
`;
const containedStyle = `
  .MaxButton-contained {
    background-color: #1976d2;
    color: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);
  }

  .MaxButton-contained:hover {
    background-color: #1565c0;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  }

  .MaxButton-contained:active {
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12);
  }

  .MaxButton-contained.MaxButton-secondary {
    background-color: #9c27b0;
  }

  .MaxButton-contained.MaxButton-secondary:hover {
    background-color: #7b1fa2;
  }

  .MaxButton-contained.MaxButton-success {
    background-color: #2e7d32;
  }

  .MaxButton-contained.MaxButton-success:hover {
    background-color: #1b5e20;
  }

  .MaxButton-contained.MaxButton-success {
    background-color: #2e7d32;
  }

  .MaxButton-contained.MaxButton-success:hover {
    background-color: #1b5e20;
  }

  .MaxButton-contained.MaxButton-warning {
    background-color: #ed6c02;
  }

  .MaxButton-contained.MaxButton-warning:hover {
    background-color: #e65100;
  }

  .MaxButton-contained.MaxButton-disabled {
    color: rgba(0, 0, 0, 0.26);
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.12);
  }
`;
const outlinedStyle = `
  .MaxButton-outlined {
    border: 1px solid rgba(25, 118, 210, 0.5);
    color: #1976d2;
    background-color: transparent;
  }

  .MaxButton-outlined:hover {
    background-color: rgba(25, 118, 210, 0.04);
    border: 1px solid #1976d2;
  }

  .MaxButton-outlined.MaxButton-secondary {
    border: 1px solid rgba(156, 39, 176, 0.5);
    color: #9c27b0;
  }

  .MaxButton-outlined.MaxButton-secondary:hover {
    background-color: rgba(156, 39, 176, 0.04);
    border: 1px solid #9c27b0;
  }

  .MaxButton-outlined.MaxButton-success {
    border: 1px solid rgba(46, 125, 50, 0.5);
    color: #2e7d32;
  }

  .MaxButton-outlined.MaxButton-success:hover {
    background-color: rgba(46, 125, 50, 0.04);
    border: 1px solid #2e7d32;
  }

  .MaxButton-outlined.MaxButton-error {
    border: 1px solid rgba(211, 47, 47, 0.5);
    color: #d32f2f;
  }

  .MaxButton-outlined.MaxButton-error:hover {
    background-color: rgba(211, 47, 47, 0.04);
    border: 1px solid #d32f2f;
  }

  .MaxButton-outlined.MaxButton-warning {
    border: 1px solid rgba(237, 108, 2, 0.5);
    color: #ed6c02;
  }

  .MaxButton-outlined.MaxButton-warning:hover {
    background-color: rgba(237, 108, 2, 0.04);
    border: 1px solid #ed6c02;
  }

  .MaxButton-outlined.MaxButton-disabled {
    color: rgba(0, 0, 0, 0.26);
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
`;
const buttonStyle = `
  :host {
    display: inline-flex;
  }

  .MaxButton-root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 16px;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.75;
    min-width: 64px;
    margin: 0;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
    box-sizing: border-box;
    outline: none;
    appearance: none;
    user-select: none;
    color: inherit;
    background-color: transparent;
    transition-property: background-color, color, box-shadow, border-color;
    transition-duration: 0.25s;
  }

  .MaxButton-disabled {
    pointer-events: none;
    cursor: default;
  }

  ${textStyle}

  ${containedStyle}

  ${outlinedStyle}

  ${rippleStyle}
`;

class MaxButton extends HTMLElement {
    constructor() {
        super();
        this.rippleChildren = [];
        const color = this.getAttribute("color") || 'primary';
        const variant = this.getAttribute("variant") || 'contained';
        const disabled = this.getAttribute("disabled") !== null;
        const type = this.getAttribute("type") || "button";
        const tabindex = disabled ? -1 : 0;
        const html = `
      <style>
        ${buttonStyle}
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
        ${disabled ? '' : `<span class="MaxRipple-root"></span>`}
      </button>
    `;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = html;
        this.rippleRoot = shadowRoot.querySelector('.MaxButton-root > .MaxRipple-root');
        if (disabled) {
            this.style.pointerEvents = 'none';
        }
        if (this.rippleRoot) {
            this.addEventListener('mousedown', this.startRipple);
            this.addEventListener('focus', this.startRipple);
            this.addEventListener('mouseup', this.stopRipple);
            this.addEventListener('mouseleave', this.stopRipple);
            this.addEventListener('blur', this.stopRipple);
        }
    }
    createRippleChild(rect) {
        /**
         * 创建以下结构：
         * <span class="MaxRipple-child enter">
         *   <span class="MaxRipple-child-child"></span>
         * </span>
         */
        const rippleChild = document.createElement('span');
        rippleChild.classList.add('MaxRipple-child', 'enter');
        const rippleChildChild = document.createElement('span');
        rippleChildChild.classList.add('MaxRipple-child-child');
        rippleChild.appendChild(rippleChildChild);
        const { height, left, top, width } = rect;
        if (height)
            rippleChild.style.height = rect.height;
        if (width)
            rippleChild.style.width = rect.width;
        if (top)
            rippleChild.style.top = rect.top;
        if (left)
            rippleChild.style.left = rect.left;
        this.rippleChildren.push(rippleChild);
        return rippleChild;
    }
    startRipple(event) {
        const { left, top, width, height } = this.getBoundingClientRect();
        let rippleX, rippleY;
        let clientX = 0, clientY = 0;
        /**
         * 涟漪效果是否从节点的中心扩散，否则从鼠标点击的位置开始扩散
         * 使用 Tab 键移动焦点的时候，从节点的中心扩散
         */
        let center = false;
        let isFocusVisible = false;
        if (event instanceof FocusEvent) {
            const button = this.shadowRoot.querySelector('.MaxButton-root');
            if (!button || !button.matches(':focus-visible')) {
                return;
            }
            center = isFocusVisible = true;
        }
        else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        rippleX = center ? width / 2 : clientX - left;
        rippleY = center ? height / 2 : clientY - top;
        // 从鼠标点击的中心位置，构造一个能正好包围当前元素的圆
        const sizeX = Math.max(width - rippleX, rippleX) * 2;
        const sizeY = Math.max(height - rippleY, rippleY) * 2;
        const diagonal = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
        const rippleChild = this.createRippleChild({
            width: `${diagonal}px`,
            height: `${diagonal}px`,
            left: `${-diagonal / 2 + rippleX}px`,
            top: `${-diagonal / 2 + rippleY}px`,
        });
        if (isFocusVisible) {
            rippleChild.classList.add('pulsate');
        }
        this.rippleRoot.appendChild(rippleChild);
    }
    stopRipple() {
        const rippleChild = this.rippleChildren.shift();
        if (!rippleChild)
            return;
        rippleChild.addEventListener('animationend', (event) => {
            if (event.animationName === exitKeyframeName) {
                rippleChild.remove();
            }
        });
        rippleChild.classList.add('exit');
    }
}

window.customElements.define("max-button", MaxButton);
