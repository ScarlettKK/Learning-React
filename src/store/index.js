import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//chrome Redux调试工具需要添加这一行
);

export default store;