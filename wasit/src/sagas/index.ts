import { all, spawn } from 'redux-saga/effects'
import startWatchingNetworkConnectivity from './offline';

import actionMessage from './message';
import actionChat from './chat';

export default function* root () {
  yield all([
    spawn(startWatchingNetworkConnectivity),
    actionMessage(),
    actionChat(),
  ]);
}