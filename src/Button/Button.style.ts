const ANIMATION_DURATION = '550ms'

export const enterKeyframeName = 'enterKeyframe'
export const exitKeyframeName = 'exitKeyframe'
const pulsateKeyframeName = 'pulsateKeyframe'

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
`

const exitKeyframe = `
  @keyframes ${exitKeyframeName} {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`

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
`

export default `
  ${enterKeyframe}
  ${exitKeyframe}
  ${pulsateKeyframe}

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

  .MaxButton-text {
    background-color: transparent;
    color: #1976d2;
  }

  .MaxButton-text:hover {
    background-color: rgba(25, 118, 210, 0.04);
  }

  .MaxButton-text.MaxButton-disabled {
    color: rgba(0, 0, 0, 0.26);
  }

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

  .MaxButton-contained.MaxButton-disabled {
    color: rgba(0, 0, 0, 0.26);
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.12);
  }

  .MaxButton-outlined {
    border: 1px solid rgba(25, 118, 210, 0.5);
    color: #1976d2;
    background-color: transparent;
  }

  .MaxButton-outlined:hover {
    background-color: rgba(25, 118, 210, 0.04);
    border: 1px solid #1976d2;
  }

  .MaxButton-outlined.MaxButton-disabled {
    color: rgba(0, 0, 0, 0.26);
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  /* ripple style */
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