import onChange from 'on-change';

import router from './router';

export default (state) => onChange(state, function handler() {
  router(this);
});
