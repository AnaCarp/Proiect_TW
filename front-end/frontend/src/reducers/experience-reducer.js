const INITIAL_STATE = {
  experiencesList : [],
  error : null,
  fetching : false,
  fetched : false
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'GET_EXPERIENCES_PENDING':
    case 'ADD_EXPERIENCES_PENDING':
    case 'UPDATE_EXPERIENCES_PENDING':
    case 'DELETE_EXPERIENCES_PENDING':
      return  { ...state, error: null, fetching: true, fetched: false }           
    case 'GET_EXPERIENCES_FULFILLED':
    case 'ADD_EXPERIENCES_FULFILLED':
    case 'UPDATE_EXPERIENCES_FULFILLED':
    case 'DELETE_EXPERIENCES_FULFILLED':     
      return { ...state, bookList: action.payload, error: null, fetched: true, fetching: false }
    case 'GET_EXPERIENCES_REJECTED':
    case 'ADD_EXPERIENCES_REJECTED':
    case 'UPDATE_EXPERIENCES_REJECTED':
    case 'DELETE_EXPERIENCES_REJECTED':  
      return { ...state, error: action.payload, fetching: false, fetched: false }
    default:
      break
  }
  return state
}