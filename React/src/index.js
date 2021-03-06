import React from 'react';
/*
 * 第一行为什么一定要引入React？
 * 针对JSX语法，编译成虚拟DOM
*/
import ReactDOM from 'react-dom';
import TodoList from './LearningPart/LearningPart4/TodoList';// 可以根据想要显示的learning part切换文件夹
// import App from './App';
import { Provider } from 'react-redux' // 帮助我们把store提供给内部的组件
// react-redux 的引入使得我们可以更方便地使用 redux
import store from './LearningPart/LearningPart4/store'// 可以根据想要显示的learning part切换文件夹

const App = (
	<Provider store = {store}> {/* 这个提供器可以连到store，那么这个Provider里面所有的组件都有能力可以获取到store里面的内容 */}
		<TodoList />
	</Provider>
)

ReactDOM.render(App, document.getElementById('root'));

/*
 * import * as serviceWorker from './serviceWorker';
 * serviceWorker.unregister();
 * serviceWorker: PWA(progressive web application 渐进式Web应用程序)
 * 以写网页的形式来写一些手机APP应用
 * 可以做到上传到https服务器上之后，客户端除了第一次加载需要联网以外，
 * 后面再想看到这个页面不需要联网，它会帮助你把页面存储在浏览器之内
*/
