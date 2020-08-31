import { markActionsOffline } from 'redux-offline-queue';
import { createActions, createReducer } from 'reduxsauce';

interface chatI {
  id?: number
  group?: boolean
  name?: string
  about?: string 
  accountId?: number
  createdAt?: string
  directId?: number
}

const INITIAL_STATE = {
  data: [] as Array<chatI>,
  loading: false,
  error: null,
}

export const { Types, Creators } = createActions({
  requestLoadChats: ['chat'],
  successLoadChats: ['chat'],
  failureLoadChats: ['chat'],
  requestAddChat: ['chat'],
  successAddChat: ['chat'],
  failureAddChat: ['chat'],
});

markActionsOffline(Creators, ['successAddChat']);

const requestLoad = (state = INITIAL_STATE,  action) => ({
  ...state,
  loading: true,
});

const successLoad = (state = INITIAL_STATE,  action) => ({
  data: action.payload?.added ? [ 
    ...state.data, ...action.payload?.chats]
    : [...action.payload?.chats], 
  loading: false,
  error: null,
  hasNextPage: action.payload?.hasNextPage
})

const failureLoad = (state = INITIAL_STATE,  action) => ({
  data: state.data, 
  loading: false, 
  error: action.payload.error,
  hasNextPage: action.payload?.hasNextPage
})

const requestAdd = (state = INITIAL_STATE,  action) => ({
    ...state,
    loading: true,
});

const successAdd = (state = INITIAL_STATE,  action) => ({
    data: state.data.find(chat => chat.id === action.payload?.chat.id) ?
          state.data.map(chat => 
            chat.id === action.payload?.chat.id ? action.payload?.chat : chat )
          : [...state.data, action.payload?.chat],
    loading: false,
    error: null,
  })

const failureAdd = (state = INITIAL_STATE,  action) => ({
  data: state.data, loading: false, error: action.payload.error
})

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_LOAD_CHATS]: requestLoad,
  [Types.SUCCESS_LOAD_CHATS]: successLoad,
  [Types.FAILURE_LOAD_CHATS]: failureLoad,
  [Types.REQUEST_ADD_CHAT]: requestAdd,
  [Types.SUCCESS_ADD_CHAT]: successAdd,
  [Types.FAILURE_ADD_CHAT]: failureAdd,
})