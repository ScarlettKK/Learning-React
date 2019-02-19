import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import { Input, Button, List } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class TodoList extends Component {
    
    render() {
      return (
        <div>
          <Input placeholder="Todo Info" style={{width:'300px', margin:'10px'}}/>
          <Button type="primary">Submit</Button>
          <List
            style={{width:'500px', margin:'10px'}}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
      )
    }
}

export default TodoList;
