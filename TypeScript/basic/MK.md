# TS basic

参考链接: http://www.imooc.com/read/35/article/341

对另一个内容的补充

为一个变量指定类型的语法是使用"变量: 类型"的形式，如下：

```typescript
let num: number = 123
```

这里还有一点要注意，就是`number`和`Number`的区别：

TS中指定类型的时候要用`number`，这个是TypeScript的类型`关键字`。

而`Number`为JavaScript的`原生构造函数`，用它来创建数值类型的值，它俩是不一样的。

包括你后面见到的string、boolean等都是TypeScript的类型关键字，不是JavaScript语法，这点要区分开。

## number

TypeScript 和 JavaScript 一样，所有数字都是浮点数，所以`只有一个number类型，而没有int或者float类型`。

而且 TypeScript 还支持 ES6 中新增的二进制和八进制数字字面量，所以` TypeScript 中共支持二、八、十和十六四种进制的数值`。

## string

另外还有个和字符串相关的类型：`字符串字面量类型`。

即把一个字符串字面量作为一种类型(如下面把字符串放在了类型)，比如上面的字符串"Lison"，当你把一个变量指定为这个字符串类型的时候，就不能再赋值为其他字符串值了，如：

```typescript
let str: 'Lison'
str = 'haha' // error 不能将类型“"haha"”分配给类型“"Lison"”let num: number = 123
```

## 数组

在 TypeScript 中有两种定义数组的方式：

```typescript
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

第一种形式通过number[]的形式来指定这个类型元素均为number类型的数组类型，这种写法是`推荐的写法`

当你使用第二种形式定义时，tslint 可能会警告让你使用第一种形式定义，如果你就是想用第二种形式，可以通过在 tslint.json 的 rules 中加入"array-type": [false]关闭 tslint 对这条的检测。

如果你要指定一个数组里的元素既可以是数值也可以是字符串，那么你可以使用这种方式：number|string[],也就是联合类型

## null / undefined

默认情况下 undefined 和 null 可以赋值给任意类型的值，也就是说你可以把 undefined 赋值给 void 类型，也可以赋值给 number 类型。

当你在 tsconfig.json 的"compilerOptions"里设置了"strictNullChecks": true时，必须严格对待。undefined 和 null 将只能赋值给它们自身和 void 类型。

## obj

这里有一点要注意了，你可能会想到给 obj 指定类型为 object 对象类型，然后给它赋值一个对象，

后面通过属性访问操作符访问这个对象的某个属性，实际操作一下你就会发现会报错：

```typescript
let obj: object
obj = { name: 'Lison' }
console.log(obj.name) // error 类型“object”上不存在属性“name”
```

这里报错说类型 object 上没有 name 这个属性。

如果你想要达到这种需求你应该使用我们后面章节要讲到的接口，

那 object 类型适合什么时候使用呢？

我们前面说了，`当你希望一个值必须是对象而不是数值等类型`时，比如我们定义一个函数，参数必须是对象，这个时候就用到object类型了：

```typescript
function getKeys (obj: object) {
    return Object.keys(obj) // 会以列表的形式返回obj中的值
}
getKeys({ a: 'a' }) // ['a']
getKeys(123) // error 类型“123”的参数不能赋给类型“object”的参数
```

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbqf9v1xrij318g0rqwid.jpg">






