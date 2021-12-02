import { PAGES } from '../constants';

const handleArrowClick = (state) => () => {
  state.page = PAGES.LIST;
};

export const addNotFoundHandlers = (state) => {
  const arrow = document.querySelector('.arrow');

  const onArrowClick = handleArrowClick(state);
  arrow.addEventListener('click', onArrowClick);

  return () => {
    arrow.removeEventListener('click', onArrowClick);
  };
};
