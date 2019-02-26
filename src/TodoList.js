import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import store from './store/index'
import {getInputChangeAction,getAddItemAction,getDeleteItemAction} from './store/actionCreaters'
//import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './store/actionTypes'
import TodoListUI from './TodoListUI'

// 下面的组件（之前所写的普通组件）写法是将UI与逻辑放在一起，这样是比较混乱的，维护起来也比较困难
// Redux进阶：对组件进行一个拆分，UI组件专门做视图的渲染，容器组件处理逻辑
// 下面就变成了一个容器组件（聪明组件），只管逻辑，不管页面长啥样
class TodoList extends Component {
    constructor(props){
      super(props)
      this.state = store.getState();
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleStoreChange = this.handleStoreChange.bind(this);
      this.handleBtnClick = this.handleBtnClick.bind(this);
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
      store.subscribe(this.handleStoreChange)
      //这里需要订阅store的改变，这样reducer的state改变之后才会更新到组件
      //store一旦改变就会调用this.handleStoreChange方法
    }
    
    render() {
      return <TodoListUI 
              inputValue={this.state.inputValue} 
              handleInputChange={this.handleInputChange}
              handleBtnClick={this.handleBtnClick} 
              list={this.state.list}
              handleDeleteItem={this.handleDeleteItem}
             />
    }

    handleInputChange(e) {
      // const action = {
      //   type: CHANGE_INPUT_VALUE,
      //   value: e.target.value
      // }// 创建一个 
      // 其实action不应该在组件里面这么直接定义
      // 这样复用性会比较差，程序复杂起来会不方便页面的测试和管理
      // 我们一般使用一个action creater来管理页面的action
      // 这是一个比较正规的流程
      const action = getInputChangeAction(e.target.value);
      store.dispatch(action) // 将要借书的这句话传递给store，store会转发给reducer
    }

    handleStoreChange(){
      this.setState(store.getState())//更新当前组件的state
    }

    handleBtnClick() {
      // const action = {
      //   type: ADD_TODO_ITEM
      // }// 创建一个 action（借书的那句话）
      const action = getAddItemAction();
      store.dispatch(action) // 将要借书的这句话传递给store，store会转发给reducer
    }

    handleDeleteItem(index){
      // const action = {
      //   type: DELETE_TODO_ITEM,
      //   index
      // }// 创建一个 action（借书的那句话）
      const action =getDeleteItemAction(index)
      store.dispatch(action) // 将要借书的这句话传递给store，store会转发给reducer
    }
}

export default TodoList;
