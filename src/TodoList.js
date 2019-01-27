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
          list: []
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
              <button>submit</button>
            </div>
            <ul>
              <li>learn English</li>
              <li>do homework</li>
            </ul>
          </div>
      );
    }

    handleInputChange(event){
      this.setState({
        inputValue: event.target.value
      })
    }
}

export default TodoList;
