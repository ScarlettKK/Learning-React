import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './actionTypes'

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

// 提高代码的可维护性
// 方便自动化测试
// 图中actionCreaters的部分（“我要借什么书”这句话）

