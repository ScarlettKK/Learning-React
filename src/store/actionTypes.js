export const CHANGE_INPUT_VALUE = 'change_input_value'
export const ADD_TODO_ITEM = 'add_todo_item'
export const DELETE_TODO_ITEM = 'delete_todo_item'
export const INIT_LIST_ITEMS = 'init_list_items'
// 为何需要actionTypes？
// 当直接定义action的名字的时候，如果等于一个字符串，
// 那么如果这个组件里面的字符串，跟reducer里面的字符串有差距的话
//（如你不小心打错了某个字符）
// 不会出现报错，你也不好debug，只会一直没有对应的操作（连不上对应的reducer操作）

// 但是引入actionTypes列表之后，因为都定义成了变量名
// 一旦变量名不小心输错，会直接报错找不到这个变量，也方便debug