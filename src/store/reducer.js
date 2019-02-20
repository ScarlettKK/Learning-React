const defaultState = {
	inputValue: '123',
	list: [1, 2]
}

// reducer可以接收state，但绝不能改变state
export default (state = defaultState, action) => {
	// state：老的state值  action：事件类别（必须有），以及传递过来的state的某个属性的新值(可为空)
	if(action.type === 'change_input_value') {
		const newState = JSON.parse(JSON.stringify(state)); //深拷贝的骚操作
		newState.inputValue = action.value;//复制一份当前state之后，将state里面的值替换成最新值
		return newState;// 最后返回
	}
	if(action.type === 'add_todo_item') {
		const newState = JSON.parse(JSON.stringify(state)); //深拷贝的骚操作
		if(newState.inputValue !== '')
			newState.list.push(newState.inputValue);
		newState.inputValue = '';
		return newState;// 最后返回
	}
	return state;
	// state：整个store仓库里面存储的数据
}