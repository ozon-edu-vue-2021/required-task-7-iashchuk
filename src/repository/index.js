export class Repository {
  constructor(data) {
    this._data = data;
  }

  _getNotFriends(personId, count) {
    const result = [];

    for (const person of this._data) {
      const notFriends = person.friends.filter(item => item !== personId);
      result.push(...notFriends)

      if (result.length >= count) {
        return result.length > count ? result.slice(0, count) : result;
      }
    };
  }

  _getRankedPersonsByFriends = (contactsDictionary, friendsIds, count) => {
    const groupedByRepeat = friendsIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(groupedByRepeat)
      .sort(([firstId, firstCount], [secondId, secondCount]) => {
        const compare = secondCount - firstCount;

        if (compare) {
          return compare;
        }

        const firstName = contactsDictionary[firstId]?.name || '';
        const secondName = contactsDictionary[secondId]?.name || '';

        return firstName.localeCompare(secondName);

      })
      .slice(0, count)
      .map(([id]) => id);
  }

  getContactsData(countInSublist) {
    const friendsIds = [];

    const contactsDictionary = this._data.reduce((acc, person) => {
      acc[person.id] = {
        ...person, notFriends: this._getNotFriends(person.id, countInSublist)
      };

      friendsIds.push(...person.friends)

      return acc;
    }, {});

    return {
      contacts: this._data,
      contactsDictionary,
      rankedPersonsByFriends: this._getRankedPersonsByFriends(contactsDictionary, friendsIds, countInSublist)
    }
  }

}
