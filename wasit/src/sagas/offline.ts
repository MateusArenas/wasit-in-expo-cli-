import { put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import NetInfo from "@react-native-community/netinfo";
import { OFFLINE, ONLINE } from 'redux-offline-queue'

export default function* startWatchingNetworkConnectivity() {
  const channel = eventChannel(emitter => {
    const unsubscribe = NetInfo.addEventListener(emitter);
    return () => { 
      unsubscribe() 
    };
  });

  try {
    while (true) {
      const { isConnected } = yield take(channel);
      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}