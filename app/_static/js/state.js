import { signal } from './vendor/signals-core.module.js';

const State = {
  count: 0,
  activeNavHover: signal(''),
};

export { State };
