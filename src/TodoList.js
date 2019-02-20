import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import { Input, Button, List } from 'antd';
import store from './store/index'

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
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
      )
    }

    handleInputChange(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }// 创建一个 action（借书的那句话）
      store.dispatch(action) // 将要借书的这句话传递给store，store会转发给reducer
    }

    handleStoreChange(){
      this.setState(store.getState())//更新当前组件的state
    }

    handleBtnClick() {
      const action = {
        type: 'add_todo_item'
      }// 创建一个 action（借书的那句话）
      store.dispatch(action) // 将要借书的这句话传递给store，store会转发给reducer
    }
}

export default TodoList;
