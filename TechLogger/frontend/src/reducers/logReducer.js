import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS,
} from "../actions/types";

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((l) =>
          l.id === action.payload.id ? action.payload : l
        ),
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((l) => l.id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default logReducer;
