import data from '../public/data.json';

import { PAGES } from './constants';
import { Repository } from './repository';
import router from './router';
import watcher from './watcher';

const repository = new Repository(data);

const initialState = {
  page: PAGES.LIST,
  currentPerson: null,
  contacts: repository.getContactList(),
  contactsById: repository.getContactsById(),
  rankedPersonById: repository.getRankedPersonByIds(),
};

const state = watcher(initialState);

router(state);
