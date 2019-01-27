import React, { Component } from 'react';
/*
 * [ES6解构赋值]第一行等价于
 * import React from 'react';
 * const Component = React.Component;
*/

class TodoList extends Component {
    constructor(props) {
      super(props);
      /*
       * 创建TodoList的时候
       * 需要调用一次其父类Component的构造函数
      */
      this.state = {
          inputValue: "",
          list: ["learn English"]
      }
    }

    render() {
      return (
          <div>
            <div>
              <input
                value={this.state.inputValue}
                onChange={this.handleInputChange.bind(this)}
              />
              <button onClick={this.handleBtnClick.bind(this)}>submit</button>
            </div>
            <ul>
              {
                this.state.list.map((item, index) => {
                  return <li 
                          key={index} 
                          onClick={this.handleItemDelete.bind(this, index)}>
                            {item}
                         </li>
                  /*
                   * 当在React中循环渲染的时候，需要给渲染出来的每一项增加一个key值
                   * 这个key值在每一项中都不同，是唯一的，作为这一项的标识符
                  */
                })
              }
            </ul>
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
