
class Ripple extends HTMLElement {
  constructor() {
    super();
    const html = `
      <style>
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
          opacity: 0;
          background-color: transparent;
          z-index: 0;
          border-radius: inherit;
        }

        @keyframes enter {
          0% {
            opacity: 0.1;
            transform: scale(0);
          }

          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }

        .MaxRipple-root .MaxRipple-child {
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: currentColor;
          opacity: 1;
          border-radius: 50%;
          animation: enter 3s ease-in-out;
        }
      </style>
      <span class="MaxRipple-root">

      </span>
    `
    const childHtml = `
      <span class="MaxRipple-child"></span>
    `
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;
    
  }
}