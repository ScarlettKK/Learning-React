import React, { Component } from 'react';
/*
 * [ES6解构赋值]第一行等价于
 * import React from 'react';
 * const Component = React.Component;
*/
// import './style.css';
import TodoItem from './TodoItem'
/******************/
// 下面是代码优化部分
// css的引入应该放于js后面
import './style.css';
// 上面是代码优化部分
/******************/

class TodoList extends Component {
    constructor(props) {
      super(props);
      /*
       * 创建TodoList的时候
       * 需要调用一次其父类Component的构造函数
      */
      // 当组件的state（自带属性）或者props（从父组件传递过来属性）发生改变的时候，Component的render函数就会重新执行，重新渲染页面，我们所看到的页面就会发生改变
      this.state = {
          inputValue: "",
          list: []
      }
      /******************/
      // 下面是代码优化部分
      // 提前bind好所有函数的this指向，后面不需要重复bind
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleBtnClick = this.handleBtnClick.bind(this);
      this.handleItemDelete = this.handleItemDelete.bind(this);
      this.getTodoItem = this.getTodoItem.bind(this);
      // 上面是代码优化部分
      /******************/
    }

    // 在组件即将被挂载到页面的时刻执行
    componentWillMount(){
      console.log("componentWillMount")
    }

    render() {
      return (
        /*
         * 在JSX中，大写字母开头的都是JSX自定义组件
         * 如<Fragment>
        */
        <div>
          {/* JSX内部注释范例1 */}
          {
            // JSX内部注释范例2
          }
          <div>
            {/* 注意JSX内部不要用for来定义当label被点击后应该高亮的输入框，应该用htmlFor */}
            <label htmlFor="textArea">输入内容</label>
            {/* 注意JSX内部不要用class="xxx"来定义css样式，应该用className */}
            <input
              id = "textArea"
              className = "input"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              ref={(input)=>{this.input = input}}
            />
            <button 
              onClick={this.handleBtnClick}
            >submit</button>
          </div>
          <ul>
            {
              /******************/
              // 下面是代码优化部分
              // 将js逻辑部分（循环）单独抽取出来成为函数，精简JSX部分的代码
              // 以下是代码拆分的一种形式
              this.getTodoItem()
              // 上面是代码优化部分
              /******************/
            }
          </ul>
          {/*return <li 
                  key={index} 
                  onClick={this.handleItemDelete.bind(this, index)}
                  dangerouslySetInnerHTML = {{__html: item}}>
                  {
                    // dangerouslySetInnerHTML = {{__html: item}}
                    /* dangerouslySetInnerHTML可以用于禁止html转义，
                    如输入“<h1>header</h1>”会直接生成大标题header而不是转义成简单字符串“<h1>header</h1>”
                    如此提供了一些便利，但也增加了被XSS攻击的概率 
                  }
                 </li>
          /*
           * 当在React中循环渲染的时候，需要给渲染出来的每一项增加一个key值
           * 这个key值在每一项中都不同，是唯一的，作为这一项的标识符
          */}
        </div>
      );
    }

    /******************/
    // 下面是代码优化部分
    // 将js逻辑部分（循环）单独抽取出来成为函数，精简JSX部分的代码
    getTodoItem(){
      return this.state.list.map((item, index) => {
              {/* 父组件向子组件传递信息content = {xx} */}
              return <TodoItem 
                      content = {item} 
                      key={index} 
                      index={index} 
                      handleItemDelete={this.handleItemDelete}/>
                    {/* 这里注意传递父组件方法之前需要先给父组件的方法绑定this，指向父组件 */}
      })
    }
    // 上面是代码优化部分
    /******************/

    handleInputChange(){
      /******************/
      // 下面是代码优化部分
      // 新版react中setState已经开始接收一个函数作参数了
      // 这样会让setState的执行处于异步状态，但是会提升性能
      // 当然这时候访问event.target会出现一些问题，所以需要一个变量把当前的event.target值保存起来
      // const value = event.target.value;
      /*********** ref(59行) ***********/
      /* 这里的event.target就是获取当前的DOM元素 */
      /* 在React中，通过ref，我们也可以获取到指定的DOM元素(ref绑定在哪个上就拿哪个) */
      /* 当然最好在非必要情况下，不要老是操作DOM */
      /***** ref的一个坑 *****/
      /* 当使用ref并同时使用setState的时候，要注意setState是异步的，会导致当前获取到的DOM元素内容还未被更新 */
      /* 这里需要将对ref的获取放在setState的回调函数里面（setState更新完才调用），才能获取到最新的DOM元素 */
      /*********** ref(59行) ***********/
      const value = this.input.value;
      this.setState(() => ({
          inputValue: value
      }))
      // 上面是代码优化部分
      /******************/
      // this.setState({
      //   inputValue: event.target.value
      // })
    }

    handleBtnClick(){
      /******************/
      // 下面是代码优化部分
      // 新版react中setState已经开始接收一个函数作参数了
      // 这样会让setState的执行处于异步状态，但是会提升性能
      // 这里的setState传入函数会传入一个prevState参数，这个参数相当于之前的this.state
      // 所以这里用prevState.xxx也可以替代this.state.xxx的功能，可以防止开发人员误改this.state
      this.setState((prevState) => ({
        list: [...prevState.list, prevState.inputValue],
        inputValue: ""
      }))
      // 上面是代码优化部分
      /******************/
      // this.setState({
        // list: [...this.state.list, this.state.inputValue],
        /*
         * 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
         * 参考链接：https://blog.csdn.net/astonishqft/article/details/82899965
        */
        // inputValue: ""
      // })
    }

    handleItemDelete(index){
      // const list = [...this.state.list]
      /*
       * 这里为什么要用扩展运算符(...)？
       * 如果直接赋值，数组是引用类型，只会复制指针
       * 会导致this.state.list的值后面变化之后，forList的值也会变化
      */
      // list.splice(index, 1)
      /*
       * 这里为什么不直接操作this.state.list？
       * 涉及到React中immutable(不可改变)的概念
       * state不允许我们做任何的改变，参考链接：https://www.cnblogs.com/3body/p/6224010.html
       * 原因是有利于后续性能优化
      */
      /******************/
      // 下面是代码优化部分
      // 新版react中setState已经开始接收一个函数作参数了
      // 这样会让setState的执行处于异步状态，但是会提升性能
      // 这里的setState传入函数会传入一个prevState参数，这个参数相当于之前的this.state
      // 所以这里用prevState.xxx也可以替代this.state.xxx的功能，可以防止开发人员误改this.state
      this.setState((prevState) => {
        const list = [...prevState.list]
        list.splice(index, 1)
        return {list}
      })
      // 上面是代码优化部分
      /******************/
      // this.setState({
      //   list: list
      // })
    }
}

export default TodoList;
