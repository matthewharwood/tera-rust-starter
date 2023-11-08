import { createShadowRoot } from '../create-shadow-root.js';
import { queryShadowRoot } from '../query-shadow-root.js';
import { updateSlotContent } from '../update-slot-content.js';
import { getAge } from '../utils/get-age.js';
import { getRange } from '../utils/get-range.js';

class MhDateTicker extends HTMLElement {
  static BIRTH_YEAR = '1985-09-03';

  constructor() {
    super();
    createShadowRoot(this, 'mh-date-ticker', 'open', true);
    this.slotContent = queryShadowRoot(this, 'year');
    this.count = 0;
    this.intervalState = 'PLAY';
    this.intervalId = null;
    this.mattAge = getAge(MhDateTicker.BIRTH_YEAR);
    this.years = getRange(
      this.mattAge + 1,
      new Date().getFullYear() - this.mattAge
    );
  }

  enterHandler() {
    this.intervalState = 'PAUSED';
    this.style.setProperty('--visibility', 'visible');
  }

  leaveHandler() {
    this.intervalState = 'PLAY';
    this.style.setProperty('--visibility', 'hidden');
  }

  keydownHandler({ key }) {
    if (this.intervalState === 'PAUSED') {
      if (key === 'ArrowUp' || key === 'w' || key === 'W') {
        if (this.count >= this.years.length - 1) {
          return;
        }
        this.updateDate(1);
      }

      if (key === 'ArrowDown' || key === 's' || key === 'S') {
        if (this.count === 0) {
          return;
        }
        this.updateDate(-1);
      }
    }
  }

  updateDate(count) {
    const len = this.years.length - 1;
    const next = this.count + count;
    this.count = Math.min(next, len);
    updateSlotContent(this.slotContent, this.years[this.count]);
  }

  connectedCallback() {
    this.intervalId = setInterval(() => {
      if (this.intervalState === 'PLAY') {
        this.updateDate(1);
      }
    }, 80);
    console.log('hey');
    this.addEventListener('mouseenter', this.enterHandler);
    this.addEventListener('mouseleave', this.leaveHandler);
    document.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  disconnectedCallback() {
    window.clearInterval(this.intervalId);
    this.removeEventListener('mouseenter', this.enterHandler);
    this.removeEventListener('mouseleave', this.leaveHandler);
    this.removeEventListener('click', this.clickHandler);
    document.removeEventListener('keydown', this.keydownHandler);
  }
}

export { MhDateTicker };
