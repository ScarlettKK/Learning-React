import React from 'react';
import { connect } from 'react-redux';

// 这时候 TodoList 就变成了一个纯UI组件，不涉及逻辑的部分
// class TodoList extends Component {
// 	render() {
// 		// 代码优化：解构赋值
// 		const { inputValue, list, handleInputValueChange, handleClick, handleDeleteItem } = this.props;

// 		return (
// 			<div>
// 				<div>
// 					<input value={inputValue} onChange = {handleInputValueChange}/>
// 					<button onClick={handleClick}>提交</button>
// 				</div>
// 				<ul>
// 					{
// 						list.map((item, index) => {
// 							return <li key={index} onClick={() => {
// 								handleDeleteItem(index)
// 							}}>{item}</li>
// 						})
// 					}
// 				</ul>
// 			</div>
// 		)
// 	}
	
// }

//  将其重构为一个无状态组件，提升性能
const TodoList = (props) => {
	const { inputValue, list, handleInputValueChange, handleClick, handleDeleteItem } = props;
	return (
		<div>
			<div>
				<input value={inputValue} onChange = {handleInputValueChange}/>
				<button onClick={handleClick}>提交</button>
			</div>
			<ul>
				{
					list.map((item, index) => {
						return <li key={index} onClick={() => {
							handleDeleteItem(index)
						}}>{item}</li>
					})
				}
			</ul>
		</div>
	)
}

const mapStateToProps = (state) => {// 把store里面的数据，映射给组件，变成组件的【props】
						// 这里传入的state就是store里面的数据
	return {
		inputValue: state.inputValue,
		list: state.list
	}
}

// store.dispatch 映射到 props 上
const mapDispatchToProps = (dispatch) => {
	return {
		handleInputValueChange(e){
			const action = {
				type: 'change_input_value',
				value: e.target.value
			}
			dispatch(action)
		},
		handleClick () {
			const action = {
				type: 'btn_clicked'
			}
			dispatch(action)
		},
		handleDeleteItem(index) {
			const action = {
				type: 'item_delete',
				index
			}
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
// connect 让 TodoList这个组件和store做连接，
// 连接规则（映射关系）为mapStateToProps，
// 组件对store的修改规则，以及和dispatch的关联规则为mapDispatchToProps


/* 总结：

TodoList是一个UI组件
但是connect方法 把UI组件和业务逻辑相结合
结果返回了一个容器组件（含业务逻辑的组件）

*/


