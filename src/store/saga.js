// redux-saga对大型项目比较友好，可以把很多复杂的逻辑都单独拆分出来（不管异步不异步），API较多功能强大，但入门需要一定的代价
// 而redux-thunk相对来说没啥接口，只是允许dispatch一个函数而已，但比较简单入手快
import { takeEvery, put } from 'redux-saga/effects'
import {GET_INIT_LIST} from './actionTypes'
import axios from 'axios'
import {initListItems} from './actionCreaters'

function* getInitList() {
	//通过调用这里，可以实现我们把异步逻辑完全拆分出来的需求
	try {// 这里如果res没返回数据会报错并抛出异常，最好用try-catch封装
		const res = yield axios.get('http://localhost:8889/list.json')
	  const data = res.data
	  const action = initListItems(data)
	  // store.dispatch(action)
	  yield put(action)// 这里通过put方法代替dispatch
	} catch(e) {
		console.log("network error")
	}
	
}

//generator 函数
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
  // 使用redux-saga之后，现在每一次 store dispatch GET_INIT_LIST action的时候，不仅reducer能接收到，这里也会接收到，然后调用第二个参数传进去的方法
}

export default mySaga;