import data from '../public/data.json';

import { MAX_PERSON_IN_SUBLIST, PAGES } from './constants';

import { Repository } from './repository';
import router from './router';
import watcher from './watcher';

const repository = new Repository(data);

const { contacts, contactsDictionary, rankedPersonsByFriends } = repository.getContactsData(MAX_PERSON_IN_SUBLIST)

const initialState = {
  page: PAGES.LIST,
  currentPersonId: null,
  contacts,
  contactsDictionary,
  rankedPersonsByFriends,
};

const state = watcher(initialState);

router(state);
