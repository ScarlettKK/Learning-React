import React, {Component, Fragment} from 'react';
import './style.css';

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
				<div className={this.state.show ? 'show' : 'hide'}>hello</div>
				<button onClick={this.changeShowState}>toggle</button>
			</Fragment>
		)
	}

	changeShowState() {
		this.setState(() => ({show: this.state.show ? false : true}))
	}
}

export default App;