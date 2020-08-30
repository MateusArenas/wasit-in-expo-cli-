import { all, takeEvery, put, call } from 'redux-saga/effects'
import Message from '../models/chatMessage';

function* assyncLoadMessages (action) {
  const { accountId, chatIds, added, pageSize, pageOffset } = yield action.payload;
  try {
    console.log('in assyncLoadMessages');
    
    const localMessages = yield Message.findAll({ accountId, chatIds }, { 
      limit: pageSize, offset: pageOffset 
    })

    console.log('localmessages...', localMessages);
    

    if (localMessages.length > 0) { 
      yield put({ type: 'SUCCESS_LOAD_MESSAGES', payload: { 
        added,
        messages: localMessages,
        hasNextPage: true // has possible next page
      } })
    } else {
      yield put({ type: 'FAILURE_LOAD_MESSAGES', payload: { 
        error: ' ',
        hasNextPage: false // not has next page
      } });
    }
    
  } catch(err) {
    yield put({ type: 'FAILURE_LOAD_MESSAGES', payload: { 
      error: err + ' ',
      hasNextPage: true // has possible next page
    } });
  }
}

function* actionLoadMessages() {
  yield takeEvery('REQUEST_LOAD_MESSAGES', assyncLoadMessages);
}

function* assyncAddMessage (action) {
  const { message, self, socket } = yield action.payload;
  try {
    const localMessage = yield Message.create(message) 

    yield put({ type: 'SUCCESS_ADD_MESSAGE', payload: { 
      message: localMessage,
      self
    } })
    
    if (self && socket) {
      yield socket.emit('sendMessage', {...localMessage, messageId: localMessage.id })
    }
    
  } catch(err) {
    yield put({ type: 'FAILURE_ADD_MESSAGE', payload: { 
      error: err + ' ',
    } });
  }
}

function* actionAddMessage() {
  yield takeEvery('REQUEST_ADD_MESSAGE', assyncAddMessage);
}

function* assyncUpdateMessage (action) {
  const { id, body } = yield action.payload; //where só permite um attr
  try {
    const localUpdateMessage = yield Message.findAndUpdate(id, body)  as any
    
    yield put({ type: 'SUCCESS_UPDATE_MESSAGE', payload: { 
      message: localUpdateMessage
    } })
  } catch(err) {
    yield put({ type: 'FAILURE_UPDATE_MESSAGE', payload: { 
      error: err + ' ',
    } });
  }
}

function* actionUpdateMessage() {
  yield takeEvery('REQUEST_UPDATE_MESSAGE', assyncUpdateMessage);
}

export default function* actionMessage() {
  yield all([
    actionLoadMessages(),
    actionAddMessage(),
    actionUpdateMessage()
  ]) 
}

