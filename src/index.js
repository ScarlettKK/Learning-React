import React from 'react';
/*
 * 第一行为什么一定要引入React？
 * 针对JSX语法，编译成虚拟DOM
*/
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

ReactDOM.render(<TodoList />, document.getElementById('root'));

/*
 * import * as serviceWorker from './serviceWorker';
 * serviceWorker.unregister();
 * serviceWorker: PWA(progressive web application 渐进式Web应用程序)
 * 以写网页的形式来写一些手机APP应用
 * 可以做到上传到https服务器上之后，客户端除了第一次加载需要联网以外，
 * 后面再想看到这个页面不需要联网，它会帮助你把页面存储在浏览器之内
*/
