import { all, takeEvery, put, call } from 'redux-saga/effects'
import Chat from '../models/chat';
import ChatMessage from '../models/chatMessage';
import api from '../services/api';

function* assyncLoadChats (action) {
  const { accountId, added, pageSize, pageOffset } = yield action.payload;
  try {
    const localChats = yield Chat.findAll({ accountId }, { 
      limit: pageSize, offset: pageOffset 
    })

    try {
      const { data: { value: data } } = yield api.get('/groups')

      if (data.length) {
        yield put({ type: 'SUCCESS_LOAD_CHATS', payload: { 
          chats: data,
          hasNextPage: true // has possible next page
        } })
      } 


    } catch(err) {
      if (!err.response) { // network error
        // procurar no db local
        console.log(err);
      } else { // http status code
        // não existe
        console.log('chats... ', err);
      }
    }


    if (localChats.length > 0) { 
      yield put({ type: 'SUCCESS_LOAD_CHATS', payload: { 
        added,
        chats: localChats,
        hasNextPage: true // has possible next page
      } })
    } else {
      yield put({ type: 'FAILURE_LOAD_CHATS', payload: { 
        error: ' ',
        hasNextPage: false // not has next page
      } });
    }
    
  } catch(err) {

    yield put({ type: 'FAILURE_LOAD_CHATS', payload: { 
      error: err + ' ',
      hasNextPage: true // has possible next page
    } });
  }
}

function* actionLoadChats() {
  yield takeEvery('REQUEST_LOAD_CHATS', assyncLoadChats);
}

function* assyncAddChat (action) {
  const { chat, sendTo, message, socket, user } = yield action.payload;
  try {
    
    const localChat = yield Chat.create(chat) 
    const localMessage = yield message ? ChatMessage.create({...message, chatId: localChat.id}) : null
    if (message) yield put({ type: 'SUCCESS_ADD_MESSAGE', payload: { 
      message: localMessage
    } })

    if (socket) {
      if (sendTo?.userId) yield socket.emit('callToJoinChatRoom', { 
        receiverId: sendTo?.userId,
        chat: { ...localChat, name: user.username, about: user.about},
        message: {...localMessage, originId: localMessage.id}
      })
    }
    
    yield put({ type: 'SUCCESS_ADD_CHAT', payload: { 
      chat: localChat
    } })
    
  } catch(err) {
    yield put({ type: 'FAILURE_ADD_CHAT', payload: { 
      error: err + ' ',
    } });
  }
}

function* actionAddChat() {
  yield takeEvery('REQUEST_ADD_CHAT', assyncAddChat);
}

export default function* actionChat() {
  yield all([
    actionLoadChats(),
    actionAddChat(),
  ]) 
}

