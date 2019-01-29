import React, { Component } from 'react';

class TodoItem extends Component {
		constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    render(){
    	/******************/
    	// 下面是代码优化部分
    	const {content} = this.props;
    	// 上面是代码优化部分
    	/******************/
    	/* 子组件接受父组件的信息this.props.content */
    	return <div onClick={this.handleClick}>{content}</div>
    }

    handleClick(){
    	/******************/
    	// 下面是代码优化部分
    	const {handleItemDelete,index} = this.props;
    	handleItemDelete(index)
    	// 上面是代码优化部分
    	/******************/
      // this.props.handleItemDelete(this.props.index);
      // 这里是子组件通过调用父组件的方法来修改父组件的数据，这里的第一个this已经指向父组件(通过父组件的强行bind this)
      // 这里的this.props.handleItemDelete相当于直接写this.handleItemDelete（见父组件传参赋值）
      // 但是这里子组件的this没有handleItemDelete方法，所以会报错
      // 需要将第一个this指向父组件，通过bind方法
    }
}

export default TodoItem;
