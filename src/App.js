import React, {Component, Fragment} from 'react';
import './style.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			list: []
		}
		this.handleAddItem = this.handleAddItem.bind(this);
	}
	render(){
		// 这里引入Fragment的原因是，render的return只能返回一个JSX元素
		// 而Fragment在html中不会被渲染成任何标签
		return (
			<Fragment>
				<TransitionGroup>
					{/* TransitionGroup 配合 CSSTransition 来使用，
						可以达到同时控制多个 CSSTransition 的效果 */}
					{
						this.state.list.map((item, index) => {
							return (
								<CSSTransition
									timeout = {1000}
									classNames = 'fade'
									onEntered = {(el) => {el.style.color = 'blue'/*钩子函数，入场动画执行完成后执行*/}}
									appear = {true}
									key = {index}
								>
									<div>item</div>
								</CSSTransition>
							)
						})
					}
				</TransitionGroup>
				<button onClick={this.handleAddItem}>toggle</button>

			</Fragment>
		)
	}

	handleAddItem() {
		this.setState((prev) => {
			return {list: [...prev.list, "item"]}
		})
	}
}

export default App;