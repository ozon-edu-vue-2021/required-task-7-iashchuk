import { PAGES } from './constants';

import { renderListView, renderDetailsView, renderNotFound } from './views';
import { addListHandlers, addDetailsHandlers, addNotFoundHandlers } from './controllers';

let beforeUnmount = () => {};

export default (state) => {
  const { page } = state;

  beforeUnmount();

  if (page === PAGES.LIST) {
    renderListView(state);
    beforeUnmount = addListHandlers(state);
    return;
  }

  if (page === PAGES.DETAILS) {
    const person = state.contactsDictionary[state.currentPersonId];

    if (person) {
      renderDetailsView({ ...state, person });
      beforeUnmount = addDetailsHandlers(state);
      return;
    }
  }

  renderNotFound();
  beforeUnmount = addNotFoundHandlers(state);
};
