# React初探

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

	setState方法为何要设置成为异步？

	这样当多次setState，且setState时间间隔较小的时候

	React会将多次setState的内容合并成一次，再去比对虚拟DOM，再去渲染，大大提升了性能

<img src="https://img2018.cnblogs.com/blog/1147701/201902/1147701-20190211131007205-1820127467.jpg">
	
	Diff算法

	同级比对

	如果第一层（根节点）就已经不同，那么第一层下面的所有内容都会被替换（不管下面的内容有没有被修改）

	这样节省了比对的时间

<img src="https://img2018.cnblogs.com/blog/1147701/201902/1147701-20190211131023014-1974271781.jpg">

	diff算法中每个节点为何需要key？

	要确立节点与节点之间的关系（哪些节点是同一个？）

	循环二层再去比对节点之间的关系更耗性能

	为何不能用数组下标当key？

	old key和new key要保持一一对应的关系（eg：旧key为'a', 新key保持不变的前提下，也为'a'），当数组中间被插入元素之后，数组后面的元素下标就改了

	就是key值不稳定，每个相同元素的key值会变

	最好用循环的内容当key值（除非内容变key值才会变）
	
<img src="https://img2018.cnblogs.com/blog/1147701/201902/1147701-20190211131030663-1615787024.jpg">

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

生命周期函数指 在某一个时刻 组件会自动调用执行的函数

初始化过程：初始化数据（props state）getDefaultProps、getInitialState

挂载过程（Mounting组件第一次被放到页面的时候）：componentWillMount、render、componentDidMount

更新过程（updating）：componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate

删除组件过程（Unmounting）：componentWillUnmount

<img src="https://img2018.cnblogs.com/blog/1147701/201902/1147701-20190214221634781-646778669.jpg">

生命周期函数是针对每一个组件的，意味着每一个组件都带有这些生命周期函数，无论父子。

一个组件中必须带有render函数，其他生命周期函数可以没有。为什么？

	React中所有的组件都继承自Component对象，Component中自带有其他生命周期函数，唯独render没有被自带，所以render必须在组件中定义。


### (小结)React如何优化性能？

1. 在constructor中绑定所有函数的指向

2. 将setState设置为异步函数，合并多次对state的改变

3. 虚拟DOM，同层比对，key值

4. shouldComponentUpdate

### （小插件）使用Charles实现本地数据Mock

[Charles教程](https://www.cnblogs.com/jiayuchn-test/p/8875105.html)

[注意！]启动 Charles 后，第一次 Charles 会询问你是否要把Charles设置为系统的代理，如果此时你忽略了这个询问窗口，你可以在后期再进行设置；

将 Charles 设置成系统代理：选择菜单中的 “Proxy” -> “Mac OS X Proxy/windows proxy”，如果Mac下有管理密码，则需要输入密码后方可进行。

然后再点击Tools->Map Local进行本地文件服务器代理设置

<img src="https://img2018.cnblogs.com/blog/1147701/201902/1147701-20190215225311759-1419816144.jpg" width="500px">

<img src="https://img2018.cnblogs.com/blog/1147701/201902/1147701-20190215225304032-532317280.jpg" width="500px">

### React CSS过渡动画

实现方法：

1. css transition

2. css animation + keyframes

3. react-transition-group
	
	这里主要涉及到[CSSTransition](https://reactcommunity.org/react-transition-group/css-transition)，另外[transition](https://reactcommunity.org/react-transition-group/transition)部分的实现要比CSSTransition更为底层一些，如果遇到了CSSTransition不能实现的效果可以借助transition

	并且react-transition-group向我们提供了一些钩子函数，借助这些函数我们可以完成一些特定的功能

	[TransitionGroup](https://reactcommunity.org/react-transition-group/transition-group) 配合 CSSTransition 来使用，可以达到同时控制多个 CSSTransition 的效果

## Redux

如上所述， React框架只负责视图层部分的实现，以及父子组件之间简单的通信

涉及到复杂的跨组件通信，需要借助Redux等数据层框架实现

Redux原理：

<img src="https://img2018.cnblogs.com/blog/1147701/201902/1147701-20190218205339787-94429163.jpg">

类似Angular的Service，大家都把鸡蛋放在同一个篮子里，一个人改了篮子里的内容，篮子会自动通知其他人。

Redux = Reducer + Flux

Flux：Redux的雏形，但不是很好用，存在数据依赖等问题，Redux是它的升级版

### Redux Work Flow

工作原理：

<img src="https://img2018.cnblogs.com/blog/1147701/201902/1147701-20190218211708195-665575091.png">

### Redux 知识点复习

#### Redux 使用原则

1. store 必须是唯一的，整个项目都用这一个store公共存储空间

2. 只有store能够改变自己的内容（state），reducer是不能直接修改store的state的，只能去return一个newState，然后让store自己去改

3. reducer必须是纯函数，也就是说给定固定的输入，就一定会有固定的输出（不纯函数如：给某输出变量赋值new Date()、或者带有AJAX请求），而且不会有任何副作用（如对接收的参数state作了修改）

#### Redux核心API

1. createStore 创建一个store

2. store.dispatch 向store传递一个action

3. store.getState 获取store当前的state

4. store.subscribe 订阅store的改变

## Ant Design

[Ant Design](https://ant.design/index-cn)是蚂蚁金服开发的一款开源样式框架

更加适用于后端管理界面的开发

## Redux 中间件

原理：

<img src="https://img2018.cnblogs.com/blog/1147701/201903/1147701-20190301222737304-1175233829.png">

举例：

<img src="https://img2018.cnblogs.com/blog/1147701/201903/1147701-20190301223926506-784867368.png">
