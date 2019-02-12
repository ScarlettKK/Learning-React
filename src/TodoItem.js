import React, { Component } from 'react';
// prop-types能够对父组件传递过来的值（属性）的类型进行校验
import PropTypes from 'prop-types';

class TodoItem extends Component {
		constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    // 当父组件的render函数被运行的时候，它的子组件的render函数都将被重新运行一次
    render(){
    	/******************/
    	// 下面是代码优化部分
    	const { content, test } = this.props;
    	// 上面是代码优化部分
    	/******************/
    	/* 子组件接受父组件的信息this.props.content */
    	return <div onClick={this.handleClick}>{test} - {content}</div>
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

// 下面是对父组件传递过来的值（属性）的类型进行【校验】，限制父组件传递过来的值是某一种数据类型
TodoItem.propTypes = {
	test: PropTypes.string.isRequired,  //表示这个属性不能不传，不能为空
  // arrayOf表示content应为一个数组，数组的组成内容可以为数字或者是string
	content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 表示这个属性可以是个number【或者】可以是个string
	handleItemDelete: PropTypes.func,
	index: PropTypes.number
}

// 下面是对父组件传递过来的属性进行【默认值设置】
TodoItem.defaultProps = {
	test: 'hello world'  //当父组件没有传递该属性的时候，该属性的值赋值为默认值
}

export default TodoItem;
