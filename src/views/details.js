const getRenderPerson = (contactsDictionary) => (personId) => {
  const value = contactsDictionary[personId];

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

export const renderDetailsView = ({ person, contactsDictionary, rankedPersonsByFriends }) => {
  const container = document.querySelector('.container');

  const renderPerson = getRenderPerson(contactsDictionary);
  const friends = person.friends.map(renderPerson);
  const notFriends = person.notFriends.map(renderPerson);
  const popular = rankedPersonsByFriends.map(renderPerson);

  container.innerHTML = renderView({
    name: person.name, friends, notFriends, popular,
  });
};
