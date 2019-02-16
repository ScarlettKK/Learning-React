import React, {Component, Fragment} from 'react';
import './style.css';
import { CSSTransition } from 'react-transition-group';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			show: true
		}
		this.changeShowState = this.changeShowState.bind(this);
	}
	render(){
		// 这里引入Fragment的原因是，render的return只能返回一个JSX元素
		// 而Fragment在html中不会被渲染成任何标签
		return (
			<Fragment>
				<CSSTransition
					in = {this.state.show}
					timeout = {1000}
					classNames = 'fade'
					onEntered = {(el) => {el.style.color = 'blue'/*钩子函数，入场动画执行完成后执行*/}}
					appear = {true}
				>
				{/* CSSTransition 这里可以添加 unmountOnExit 属性，当出场动画执行完成之后，删除DOM节点 */}
				{/* CSSTransition 的appear属性设置为true，意为页面第一次加载该DOM元素的时候就带动画效果 */}
					<div>hello</div>
				</CSSTransition>
				<button onClick={this.changeShowState}>toggle</button>

			</Fragment>
		)
	}

	changeShowState() {
		this.setState(() => ({show: this.state.show ? false : true}))
	}
}

export default App;