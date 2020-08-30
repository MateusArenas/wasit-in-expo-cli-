import { markActionsOffline } from 'redux-offline-queue';
import { createActions, createReducer } from 'reduxsauce';

interface messageI {
  id?: number
  content?: string
  self?: boolean
  createdAt?: number
  userId?: number
  chatId?: number
  messageId?: number
  readDate?: string 
  accountId?: number
}

const INITIAL_STATE = {
  data: [] as Array<messageI>,
  loading: false,
  error: null,
}

export const { Types, Creators } = createActions({
  requestLoadMessages: ['message'],
  successLoadMessages: ['message'],
  failureLoadMessages: ['message'],
  requestAddMessage: ['message'],
  successAddMessage: ['message'],
  failureAddMessage: ['message'],
  requestUpdateMessage: ['message'],
  successUpdateMessage: ['message'],
  failureUpdateMessage: ['message'],
});

markActionsOffline(Creators, ['successAddMessage', 'successUpdateMessage']);

const requestLoad = (state = INITIAL_STATE,  action) => ({
  ...state,
  loading: true,
  hasNextPage: true
});

const successLoad = (state = INITIAL_STATE,  action) => ({
  data: action.payload?.added ? [ 
    ...state.data, ...action.payload?.messages]
    : [...action.payload?.messages], 
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
    self: action.payload?.self,
    type: 'ADD'
});

const successAdd = (state = INITIAL_STATE,  action) => ({
    data: [action.payload?.message, ...state.data],
    loading: false,
    error: null,
    self: action.payload?.self,
    type: 'ADD'
  })

const failureAdd = (state = INITIAL_STATE,  action) => ({
  data: state.data, 
  loading: false, 
  error: action.payload.error,
  self: action.payload?.self,
  type: 'ADD'
})

const requestUpdate = (state = INITIAL_STATE,  action) => ({
  ...state,
  loading: true,
  type: 'UPDATE'
});

const successUpdate = (state = INITIAL_STATE,  action) => ({
  data: state.data.map(currentMessage => {
    if (currentMessage?.id === action.payload?.message?.id) return action.payload?.message
    return currentMessage
  }),
  loading: false,
  error: null,
  type: 'UPDATE'
})

const failureUpdate = (state = INITIAL_STATE,  action) => ({
  data: state.data, 
  loading: false, 
  error: action.payload.error,
  type: 'UPDATE'
})

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_LOAD_MESSAGES]: requestLoad,
  [Types.SUCCESS_LOAD_MESSAGES]: successLoad,
  [Types.FAILURE_LOAD_MESSAGES]: failureLoad,
  [Types.REQUEST_ADD_MESSAGE]: requestAdd,
  [Types.SUCCESS_ADD_MESSAGE]: successAdd,
  [Types.FAILURE_ADD_MESSAGE]: failureAdd,
  [Types.REQUEST_UPDATE_MESSAGE]: requestUpdate,
  [Types.SUCCESS_UPDATE_MESSAGE]: successUpdate,
  [Types.FAILURE_UPDATE_MESSAGE]: failureUpdate,
})