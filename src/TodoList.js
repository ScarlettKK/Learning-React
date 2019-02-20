import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import { Input, Button, List } from 'antd';
import store from './store/index'

class TodoList extends Component {
    constructor(props){
      super(props)
      this.state = store.getState();
      console.log(store.getState())
    }
    
    render() {
      return (
        <div>
          <Input value={this.state.inputValue} placeholder="Todo Info" style={{width:'300px', margin:'10px'}}/>
          <Button type="primary">Submit</Button>
          <List
            style={{width:'500px', margin:'10px'}}
            bordered
            dataSource={this.state.list}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
      )
    }
}

export default TodoList;
