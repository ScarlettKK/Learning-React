import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ITEMS, GET_INIT_LIST} from './actionTypes'
// import axios from 'axios'

export const getInputChangeAction = (value) => ({
		type: CHANGE_INPUT_VALUE,
	    value
	})

export const getAddItemAction = () => ({
		type: ADD_TODO_ITEM
	})

export const getDeleteItemAction = (index) => ({
		type: DELETE_TODO_ITEM,
		index
	})
export const initListItems = (list) => ({
		type: INIT_LIST_ITEMS,
		list
	})

export const getInitList = () => ({
		type: GET_INIT_LIST
	})

// 提高代码的可维护性
// 方便自动化测试
// 图中actionCreaters的部分（“我要借什么书”这句话）

// 使用了redux-thunk之后，我们的actionCreaters的返回值可以不再是一个对象，可以是一个函数
// 注意只有使用redux-thunk，actionCreaters的返回值为函数才有效！
// export const getTodoList = () => {
// 		return (dispatch) => { // store.dispatch action的时候，会将store的dispatch方法传入action（action为函数的时候）
// 			axios.get('http://localhost:8889/list.json').then((res) => {
// 		        const data = res.data
// 		        const action = initListItems(data)
// 		        dispatch(action)// 这里直接调用dispatch方法即可
// 		      })
// 		}
// 	}