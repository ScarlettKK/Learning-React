import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import { Input, Button, List } from 'antd';
import store from './store/index'
import {getInputChangeAction,getAddItemAction,getDeleteItemAction} from './store/actionCreaters'
//import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './store/actionTypes'

class TodoList extends Component {
    constructor(props){
      super(props)
      this.state = store.getState();
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleStoreChange = this.handleStoreChange.bind(this);
      this.handleBtnClick = this.handleBtnClick.bind(this);
      store.subscribe(this.handleStoreChange)
      //这里需要订阅store的改变，这样reducer的state改变之后才会更新到组件
      //store一旦改变就会调用this.handleStoreChange方法
    }
    
    render() {
      return (
        <div>
          <Input 
            value={this.state.inputValue} 
            placeholder="Todo Info" 
            style={{width:'300px', margin:'10px'}}
            onChange={this.handleInputChange}
          />
          <Button type="primary" onClick={this.handleBtnClick}>Submit</Button>
          <List
            style={{width:'500px', margin:'10px'}}
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (<List.Item onClick={this.handleDeleteItem.bind(this, index)}>{item}</List.Item>)}
          />
          {/* renderItem这里可以传入index参数，方便我们后续操作 */}
        </div>
      )
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
