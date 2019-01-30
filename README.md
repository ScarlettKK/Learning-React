This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# React初探总结

## 声明式开发

与原生DOM、JQuery等命令式编程不同

不通过指令来控制视图变化，是面向数据的编程

通过控制数据，改动数据的方式控制视图的变化，DOM的部分React会帮你自动构建

## 可以与其他框架并存

`ReactDOM.render(<TodoList />, document.getElementById('root'));`

如上，React只控制index.html中id=root部分dom的渲染，其他部分不作控制

可被兼容到其他框架中（只要其他框架不影响它）

## 组件化

每一个ReactJS文件都是一个组件，含视图、逻辑操作、数据

组件可以被嵌套到其他组件之中

注意组件声明需要首字母大写，如`<TodoList />`

## 单向数据流

子组件对于父组件传递过来的数据是【只读】的

子组件直接不可修改父组件中的数据，只能通过调用父组件传递过来的方法，来间接修改父组件的数据

形成了单向清晰的数据流

防止了当一个父组件的变量被传递到多个子组件中时，一旦该变量被修改，所有传递到子组件的变量都会被修改的问题

这样出现bug调试会比较困难，因为不清楚到底是哪个子组件改的

把对父组件的bug调试控制在父组件之中

## 视图层框架

React框架只负责视图层部分的实现，以及父子组件之间简单的通信

涉及到复杂的跨组件通信，需要借助Redux等数据层框架实现

这样为搭建小项目提供了简易性，为搭建大项目提供了灵活性

## 函数式编程

每个功能都是一个小函数，函数大了还可以继续拆分，维护起来比较容易

提高了代码可读性，为后续自动化测试提供了便利
