import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { 
  reducer as offline, 
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware 
} from 'redux-offline-queue'
 
import reducers from '../reducers';
import rootSaga from '../sagas'

const middlewares = []

const sagaMiddleware = createSagaMiddleware()

middlewares.push(offlineMiddleware())
middlewares.push(suspendSaga(sagaMiddleware))
middlewares.push(consumeActionMiddleware())

const store = createStore(
  reducers,
  applyMiddleware(...middlewares)
)

sagaMiddleware.run(rootSaga)

export default store


