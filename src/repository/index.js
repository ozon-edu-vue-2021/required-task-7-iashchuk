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

  getContactList() {
    return this.data;
  }

  getNotFriends(person) {
    return this.personsIds.filter((id) => !person.friends.includes(id));
  }

  getContactsById() {
    return this.data.reduce((acc, person) => {
      acc[person.id] = { ...person, notFriends: this.getNotFriends(person) };

      return acc;
    }, {});
  }

  getRankedPersonByIds() {
    const groupedByRepeat = this.friendsIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(groupedByRepeat)
      .sort(([, firstCount], [, secondCount]) => secondCount - firstCount)
      .map(([id]) => id);
  }
}
