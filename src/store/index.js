import { createStore, applyMiddleware, compose } from 'redux';//applyMiddleware 的引入使得我们可以使用redux-thunk这个中间件
import thunk from 'redux-thunk'; // 有了redux-thunk我们的AJAX请求就可以不用再放在componentDidMount里面了
import reducer from './reducer';

// composeEnhancers：同时引入thunk 和 REDUX_DEVTOOLS
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(
	reducer,// 什么时候可以使用【Redux】的中间件呢？使用redux创建store的时候就可以
	enhancer
	// applyMiddleware([thunk, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()])
							//chrome Redux调试工具需要添加这一行（REDUX_DEVTOOLS_EXTENSION也是一个Redux的中间件）
);

export default store;