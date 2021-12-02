const renderPerson = (person) => `
    <li class="persons__item" data-id=${person.id}>
        <strong>${person.name}</strong>
    </li>
`;

const renderView = (markup) => `
    <div class="list-view">
        <div class="background"></div>
        <ul class="persons">
            ${markup.join('')}
        </ul>
    </div>
`;

export const renderListView = ({ contacts }) => {
  const container = document.querySelector('.container');
  const personsMarkup = contacts.map(renderPerson);

  container.innerHTML = renderView(personsMarkup);
};
