import React, { Component } from 'react';

class TodoItem extends Component {
		constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    render(){
    	{/* 子组件接受父组件的信息this.props.content */}
    	return <div onClick={this.handleClick}>{this.props.content}</div>
    }

    handleClick(){
      this.props.handleItemDelete(this.props.index);
      // 这里是子组件通过调用父组件的方法来修改父组件的数据
    }
}

export default TodoItem;
