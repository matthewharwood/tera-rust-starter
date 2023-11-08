import { createShadowRoot } from '../create-shadow-root.js';
import { queryShadowRoot } from '../query-shadow-root.js';
import { updateSlotContent } from '../update-slot-content.js';

class MhRunningHeader extends HTMLElement {
  static Interests = [
    { name: 'the future' },
    { name: 'architecture' },
    { name: 'my work' },
    { name: 'your work' },
    { name: 'collaboration' },
    { name: 'dank memes' },
    { name: 'OOP vs. Functional' },
    { name: 'design' },
    { name: 'guitar' },
    { name: 'inspirational people' },
    { name: 'love' },
    { name: 'travel' },
    { name: 'singularity' },
    { name: 'creativity' },
    { name: 'coding' },
    { name: 'mixed, virtual, augmented reality' },
    { name: 'art' },
    { name: 'imagination' },
    { name: 'installation art' },
    { name: 'problem solving' },
    { name: 'space' },
    { name: 'cooking' },
    { name: 'FOMO' },
    { name: 'ontological design' },
    { name: 'flow state' },
    { name: 'foreign languages' },
    { name: 'streaming on the internet' },
    { name: 'video games' },
    { name: 'coffee' },
    { name: 'crypto currency' },
    { name: 'javascript fatigue' },
    { name: 'framework wars' },
    { name: 'blockchain' },
    { name: 'smart contracts' },
    { name: 'just emailing me' },
    { name: 'wasm' },
    { name: 'rust lang' },
    { name: 'ethereum' },
    { name: 'university' },
    { name: 'engineering software' },
    { name: 'game development' },
    { name: 'sound design' },
    { name: 'lofi hiphop' },
  ];

  constructor() {
    super();
    createShadowRoot(this, 'mh-running-header', 'open', true);
    this.slotCount = queryShadowRoot(this, 'running-header-value');
    this.styles = this.shadowRoot.querySelector(`style`);
    this.tick = 0;
    this.intervalState = 'PLAY';
    this.intervalId = null;
  }

  enterHandler() {
    this.intervalState = 'PAUSED';
    this.style.setProperty('--visibility', 'visible');
  }

  leaveHandler() {
    this.intervalState = 'PLAY';
    this.style.setProperty('--visibility', 'hidden');
  }

  connectedCallback() {
    this.intervalId = setInterval(() => {
      if (this.intervalState === 'PLAY') {
        this.tick = this.tick + 1;
        let len = MhRunningHeader.Interests.length;
        let index = this.tick % len;
        updateSlotContent(
          this.slotCount,
          MhRunningHeader.Interests[index]?.name
        );
        this.tick = this.tick + 1;
      }
    }, 1000);

    this.addEventListener('mouseenter', this.enterHandler);
    this.addEventListener('mouseleave', this.leaveHandler);
  }

  disconnectedCallback() {
    window.clearInterval(this.intervalId);
    this.removeEventListener('mouseenter', this.enterHandler);
    this.removeEventListener('mouseleave', this.leaveHandler);
  }
}

export { MhRunningHeader };
