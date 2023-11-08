import { effect } from '../vendor/signals-core.module.js';
import { State } from '../state.js';

class MhLogo extends HTMLElement {
  constructor() {
    super();
    this.el = this.querySelector('.hp-logo-inner');
    this.elVideo = [...this.querySelectorAll('.hp-logo-video')];
    console.log(this.elVideo);
    this.elVideoSrc = this.querySelector('.hp-logo-video-src');
    this.dispose = null;
    this.videoList = {
      'route-work': 'route-work',
      'route-lab': 'route-lab',
      'route-profile': 'route-profile',
    };
    this._init();
  }

  connectedCallback() {
    this.dispose = effect(() => {
      if (State.activeNavHover.value.length) {
        this.el.classList.add('active');
        this.elVideo.map((vid) => {
          console.log(
            vid.dataset.route,
            this.videoList[State.activeNavHover.value]
          );
          if (
            vid.dataset.route === this.videoList[State.activeNavHover.value]
          ) {
            vid.classList.add('active');
          }
        });
      } else {
        this.el.classList.remove('active');
        this.elVideo.map((vid) => {
          vid.classList.remove('active');
        });
      }
    });
  }

  disconnectedCallback() {
    this.dispose();
  }

  _init() {
    const isNotPortrait = window?.innerWidth / window?.innerHeight >= 1;
    const rotateZValue = isNotPortrait
      ? -((Math.atan(window?.innerHeight / window?.innerWidth) * 180) / Math.PI)
      : -30;

    anime({
      targets: this.el,
      transformOrigin: ['0 50%', '50% 50%'],
      scaleX: [
        { value: 0, duration: 0 },
        { value: 1, duration: 1000 },
      ],
      rotateZ: [
        { value: 0, duration: 0, delay: 800 },
        {
          value: rotateZValue,
          duration: 2000,
          delay: 800,
          easing: 'spring(1, 100, 5, 5)',
        },
      ],
      duration: 4000,
      easing: 'easeInOutSine',
    });
  }
}

export { MhLogo };
