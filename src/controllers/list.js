import { PAGES } from '../constants';

const handlePersonClick = (state) => (evt) => {
  if (!evt.target.dataset.id) {
    return;
  }

  state.currentPersonId = Number(evt.target.dataset.id);
  state.page = PAGES.DETAILS;
};

export const addListHandlers = (state) => {
  const persons = document.querySelector('.persons');

  const onPersonClick = handlePersonClick(state);
  persons.addEventListener('click', onPersonClick);

  return () => {
    persons.removeEventListener('click', onPersonClick);
  };
};
