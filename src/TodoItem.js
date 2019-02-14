import React, { Component } from 'react';
// prop-types能够对父组件传递过来的值（属性）的类型进行校验
import PropTypes from 'prop-types';

class TodoItem extends Component {
		constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    // 当一个组件从父组件接收了参数
    // 只有父组件的render函数被重新执行了，子组件的这个生命周期函数才会被执行
    // 每次父组件render函数被执行的时候，子组件的componentWillReceiveProps都会被执行
    // 如果这个组件第一次存在于父组件中，不会执行
    // ---为什么？子组件第一次存在，走的是挂载过程，不会调用componentWillReceiveProps（Mounting过程不含这个函数）
    // 当子组件已经存在于父组件之中的时候，走的才是更新过程，才会涉及到componentWillReceiveProps
    // 这个组件已经存在于父组件之中，才会执行
    // componentWillReceiveProps() {
    //   console.log("child componentWillReceiveProps")
    // }
    // // 当这个组件即将从页面移除的时候，会被执行
    // componentWillUnmount() {
    //   console.log("child componentWillUnmount")
    // }
    // // 在组件即将被挂载到页面的时刻执行
    // componentWillMount(){
    //   console.log("child componentWillMount")
    // }
    // // 在组件被挂载到页面之后执行
    // componentDidMount(){
    //   console.log("child componentDidMount")
    // }
    shouldComponentUpdate(nextProps, nextState){
      // 此函数可以传入两个参数，即下一个要被更新的状态
      // 我的下一个要被更新的props是什么？下一个即将被更新的state是什么？
      if(nextProps.content !== this.props.content)
        return true; // 说明子组件参数被更新了，需要更新子组件
      return false;
    }
    // 当父组件的render函数被运行的时候，它的子组件的render函数都将被重新运行一次
    // 但其实在某些情况下这样是很耗费性能的
    // 所以这里可以用到shouldComponentUpdate来帮组判断是否要更新子组件
    // 也就是说，返回为false的时候，子组件只有第一次被挂载的过程，后续父组件的更新与它无关，提升了性能
    render(){
      console.log("child render")
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
