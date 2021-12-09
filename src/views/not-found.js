const renderView = () => `
    <div class="notfound-view">
        <div class="background">
            <div class="arrow"></div>
        </div>
        <p class="notfound__text">Ничего не найдено</p>
    </div>
`;

export const renderNotFound = () => {
  const container = document.querySelector('.container');

  container.innerHTML = renderView();
};
