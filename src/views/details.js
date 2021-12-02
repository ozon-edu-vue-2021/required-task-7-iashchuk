import { MAX_PERSON_IN_SUBLIST } from '../constants';

const getRenderPerson = (contacts) => (personId) => {
  const value = contacts[personId];

  if (!value) {
    return '';
  }

  return `
    <li class="contacts__item"}>
        <i class="fa fa-male contacts__icon"></i>
        <span>${value.name}</span>
    </li>
`;
};

const renderView = ({
  name, friends, notFriends, popular,
}) => `
    <div class="details-view">
        <div class="background details__background">
          <div class="arrow details__arrow"></div>
          <div class="avatar details__avatar"></div>
          <div class="details__name">${name}</div>
        </div>
        <ul class="contacts">
            <li class="contacts__item contacts__item_title">Друзья</li>
            ${friends.join('')}
            <li class="contacts__item contacts__item_title">Не в друзьях</li>
            ${notFriends.join('')}
            <li class="contacts__item contacts__item_title">Популярные люди</li>
            ${popular.join('')}
        </ul>
    </div>
`;

export const renderDetailsView = ({ person, contactsById, rankedPersonById }) => {
  const container = document.querySelector('.container');

  const renderPerson = getRenderPerson(contactsById);

  const friends = person.friends.slice(0, MAX_PERSON_IN_SUBLIST).map(renderPerson);
  const notFriends = person.notFriends.slice(0, MAX_PERSON_IN_SUBLIST).map(renderPerson);
  const popular = rankedPersonById.slice(0, MAX_PERSON_IN_SUBLIST).map(renderPerson);

  container.innerHTML = renderView({
    name: person.name, friends, notFriends, popular,
  });
};
