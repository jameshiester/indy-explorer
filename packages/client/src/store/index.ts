import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import NodeReducer from './node/reducer';

const initialState = {
  node: {
    nodes: [],
  },
};

const reducer = combineReducers({
  node: NodeReducer,
});

const logger = createLogger({
  collapsed: true,
});

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    thunk,
    logger // NOTE: logger _must_ be last in middleware chain
  )
);

export default store;
