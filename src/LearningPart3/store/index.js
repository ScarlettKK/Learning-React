import { createStore, applyMiddleware, compose } from 'redux';//applyMiddleware 的引入使得我们可以使用中间件
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga'
import todoSagas from "./saga"

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
);

const store = createStore(
	reducer,// 什么时候可以使用【Redux】的中间件呢？使用redux创建store的时候就可以
	enhancer
);

sagaMiddleware.run(todoSagas)

export default store;