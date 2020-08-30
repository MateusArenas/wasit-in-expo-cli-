import { combineReducers } from 'redux';

import messages from './message';
import chats from './chat';
import { reducer as offline } from 'redux-offline-queue';

export default combineReducers({
  offline,
  messages,
  chats,
});