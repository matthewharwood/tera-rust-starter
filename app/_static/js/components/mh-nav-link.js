import { State } from '../state.js';

class MhNavLink extends HTMLElement {
  constructor() {
    super();
  }

  enterHandler() {
    State.activeNavHover.value = this.getAttribute('route');
  }

  leaveHandler() {
    State.activeNavHover.value = '';
  }

  connectedCallback() {
    this.addEventListener('mouseenter', this.enterHandler);
    this.addEventListener('mouseleave', this.leaveHandler);
  }

  disconnectedCallback() {
    this.removeEventListener('mouseenter', this.enterHandler);
    this.removeEventListener('mouseleave', this.leaveHandler);
  }
}

export { MhNavLink };
