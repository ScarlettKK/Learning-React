import React, { Component } from 'react';
/*
 * [ES6解构赋值]第一行等价于
 * import React from 'react';
 * const Component = React.Component;
*/
import './style.css';
import TodoItem from './TodoItem'

class TodoList extends Component {
    constructor(props) {
      super(props);
      /*
       * 创建TodoList的时候
       * 需要调用一次其父类Component的构造函数
      */
      this.state = {
          inputValue: "",
          list: []
      }
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
              onChange={this.handleInputChange.bind(this)}
            />
            <button onClick={this.handleBtnClick.bind(this)}>submit</button>
          </div>
          <ul>
            {
              this.state.list.map((item, index) => {
                {/* 父组件向子组件传递信息content = {xx} */}
                return <TodoItem content = {item} key={index} index={index} 
                        handleItemDelete={this.handleItemDelete.bind(this)}/>
                      {/* 这里注意传递父组件方法之前需要先给父组件的方法绑定this，指向父组件 */}
              })
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

    handleInputChange(event){
      this.setState({
        inputValue: event.target.value
      })
    }

    handleBtnClick(){
      this.setState({
        list: [...this.state.list, this.state.inputValue],
        /*
         * 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
         * 参考链接：https://blog.csdn.net/astonishqft/article/details/82899965
        */
        inputValue: ""
      })
    }

    handleItemDelete(index){
      const list = [...this.state.list]
      /*
       * 这里为什么要用扩展运算符(...)？
       * 如果直接赋值，数组是引用类型，只会复制指针
       * 会导致this.state.list的值后面变化之后，forList的值也会变化
      */
      list.splice(index, 1)
      /*
       * 这里为什么不直接操作this.state.list？
       * 涉及到React中immutable(不可改变)的概念
       * state不允许我们做任何的改变，参考链接：https://www.cnblogs.com/3body/p/6224010.html
       * 原因是有利于后续性能优化
      */
      this.setState({
        list: list
      })
    }
}

export default TodoList;
