// UI组件专门做视图的渲染
// 又叫傻瓜组件，只负责页面的显示，不管逻辑
// import React, { Component } from 'react';
import React from 'react';
import { Input, Button, List } from 'antd';

// 当一个组件只有render函数的时候，我们也可以将其替换为无状态组件
// 无状态组件的定义是：一个普通的函数，接收props，返回一段JSX代码
// 无状态组件的优势是性能会比较高，因为它本质就是一个普通的函数，而Component里面除了render还要执行一些生命周期函数，远比普通函数的内容多得多
// 一般的UI组件都可以用无状态组件去定义
const TodoListUI = (props) => {
	return (
		<div>
          <Input 
            value={props.inputValue} 
            placeholder="Todo Info" 
            style={{width:'300px', margin:'10px'}}
            onChange={props.handleInputChange}
          />
          <Button type="primary" onClick={props.handleBtnClick}>Submit</Button>
          <List
            style={{width:'500px', margin:'10px'}}
            bordered
            dataSource={props.list}
            renderItem={(item, index) => (<List.Item onClick={(index)=>{props.handleDeleteItem(index)}}>{item}</List.Item>)}
          />
          {/* 当我们想传递父组件的方法【这里注意是传递函数，不是调用函数】，但同时又要向这个方法传递参数，不能用bind，怎么办？外面包一层函数，接收参数，直接在该函数里面去调用父组件的方法【见20行】 */}
          {/* renderItem这里可以传入index参数，方便我们后续操作 */}
        </div>
	)
}
// class TodoListUI extends Component {
// 	render() {
//       return (
//         <div>
//           <Input 
//             value={this.props.inputValue} 
//             placeholder="Todo Info" 
//             style={{width:'300px', margin:'10px'}}
//             onChange={this.props.handleInputChange}
//           />
//           <Button type="primary" onClick={this.props.handleBtnClick}>Submit</Button>
//           <List
//             style={{width:'500px', margin:'10px'}}
//             bordered
//             dataSource={this.props.list}
//             renderItem={(item, index) => (<List.Item onClick={(index)=>{this.props.handleDeleteItem(index)}}>{item}</List.Item>)}
//           />
//           {/* 当我们想传递父组件的方法【这里注意是传递函数，不是调用函数】，但同时又要向这个方法传递参数，不能用bind，怎么办？外面包一层函数，接收参数，直接在该函数里面去调用父组件的方法【见20行】 */}
//           {/* renderItem这里可以传入index参数，方便我们后续操作 */}
//         </div>
//       )
//     }
// }
export default TodoListUI;