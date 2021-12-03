export class Repository {
  constructor(data) {
    this.data = data;
  }

  get personsIds() {
    return this.data.map((person) => person.id);
  }

  get friendsIds() {
    return this.data.reduce((acc, { friends }) => {
      acc.push(...friends);
      return acc;
    }, []);
  }

  get contactList() {
    return this.data;
  }

  get contactsById() {
    return this.data.reduce((acc, person) => {
      acc[person.id] = { ...person, notFriends: this.getNotFriends(person) };

      return acc;
    }, {});
  }

  get rankedPersonsByFriends() {
    const groupedByRepeat = this.friendsIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(groupedByRepeat)
      .sort(([firstId, firstCount], [secondId, secondCount]) => {
        const compare = secondCount - firstCount;

        if (compare) {
          return compare;
        }

        const firstName = this.getContactById(firstId)?.name || '';
        const secondName = this.getContactById(secondId)?.name || '';

        return firstName.localeCompare(secondName);

      })
      .map(([id]) => id);
  }

  getNotFriends(person) {
    return this.personsIds.filter((id) => !person.friends.includes(id));
  }

  getContactById(id) {
    return this.contactsById[id]
  }
}
