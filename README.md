# Blog-React之React初探

## React特性

### 声明式开发

与原生DOM、JQuery等命令式编程不同

不通过指令来控制视图变化，是面向数据的编程

通过控制数据，改动数据的方式控制视图的变化，DOM的部分React会帮你自动构建

### 可以与其他框架并存

`ReactDOM.render(<TodoList />, document.getElementById('root'));`

如上，React只控制index.html中id=root部分dom的渲染，其他部分不作控制

可被兼容到其他框架中（只要其他框架不影响它）

### 组件化

每一个ReactJS文件都是一个组件，含视图、逻辑操作、数据

组件可以被嵌套到其他组件之中

注意组件声明需要首字母大写，如`<TodoList />`

### 单向数据流

子组件对于父组件传递过来的数据是【只读】的

子组件直接不可修改父组件中的数据，只能通过调用父组件传递过来的方法，来间接修改父组件的数据

形成了单向清晰的数据流

防止了当一个父组件的变量被传递到多个子组件中时，一旦该变量被修改，所有传递到子组件的变量都会被修改的问题

这样出现bug调试会比较困难，因为不清楚到底是哪个子组件改的

把对父组件的bug调试控制在父组件之中

### 视图层框架

React框架只负责视图层部分的实现，以及父子组件之间简单的通信

涉及到复杂的跨组件通信，需要借助Redux等数据层框架实现

这样为搭建小项目提供了简易性，为搭建大项目提供了灵活性

### 函数式编程

每个功能都是一个小函数，函数大了还可以继续拆分，维护起来比较容易

提高了代码可读性，为后续自动化测试提供了便利


## React高级内容

### React调试插件

工欲善其事，必先利其器。下面是react框架开发调试专用的chrome插件--react-developer-tools的介绍与安装使用博客：

[react-developer-tools](https://www.cnblogs.com/luffa/p/10350014.html)

### propTypes(类型校验) 与 defaultProps(默认参数值)

见React官方文档[Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

### props, state与render函数

当组件的state（自带属性）或者props（从父组件传递过来属性）发生改变的时候，Component的render函数就会重新执行，重新渲染页面，我们所看到的页面就会发生改变

当父组件的render函数被运行的时候，它的子组件的render函数都将被重新运行一次

### 虚拟DOM

#### 粗暴的初步实现步骤：

1.定义state，state含数据

2.JSX模版（render函数）

3.数据 + 模版结合，生成真实的DOM，来显示

4.state发生改变

5.数据 + 模版结合，生成真实的DOM，替换原始的DOM【DOM操作十分耗费性能】

#### 缺陷：

第一次生成了一个完整的DOM片段

第二次生成了一个完整的DOM片段

第二次生成的DOM替换第一次的DOM，非常耗费性能

#### 改良：

1.定义state，state含数据

2.JSX模版（render函数）

3.数据 + 模版结合，生成真实的DOM，来显示

4.state发生改变

5.数据 + 模版结合，生成真实的DOM，并不直接替换原始的DOM

6.新的DOM（Document Fragment 并没有真实挂载到页面） 和原始的DOM做比对，找差异（diff算法）

7.找到对应发生变化的地方

8.只用新的DOM中更新的地方，替换掉老的DOM中变化的地方

#### 缺陷：

性能的提升可能并不明显

#### 二次改良：

1.定义state，state含数据

2.JSX模版（render函数）

3.生成虚拟DOM（就是一个虚拟对象，用它来描述真实DOM）【js对象->js对象损耗性能小】

	`{'div', {id: 'abc'}, ['hello world']}`

4.用虚拟DOM生成真实的DOM，来显示

5.state发生改变

6.数据 + 模版生成新的虚拟DOM【极大地提升了性能】

	`{'div', {id: 'abc'}, ['cat']}`

7.比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是div中的text【极大地提升了性能】

8.直接操作DOM，改变div中的内容（只改变更新了的部分，其他保持不变）



JSX -> creatElement -> 虚拟DOM(JS对象) -> 真实的DOM

使用`React.creatElement('div', {}, React.creatElement(...))`方法进行转化

JSX的存在是为了方便开发人员写代码

#### 优点

1.提升了性能

2.使得跨端应用得以实现（React Native）

	网页应用：JS对象->DOM

	手机应用：JS对象->原生应用的组件

	JS对象是最方便转化的

### React生命周期函数

### React CSS过渡动画
