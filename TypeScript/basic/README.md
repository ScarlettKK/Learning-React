#TS basic

参考链接:https://ts.xcatliu.com/basics

## 数据类型

JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。

原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。

### 原始数据类型（Primitive data types）

这里主要描述的是 TS与JS不同的 数据类型点

`TS是这样定义变量的(与JS不同): let/var 变量名:变量类型 = 值;`

#### 布尔值

`这里的重点是TS中 boolean 、 new Boolean() 与 Boolean() 的区别`

在 TypeScript 中，使用 boolean 定义布尔值类型:

```typescript
let isDone: boolean = false;
```

注意，使用构造函数 new Boolean() 创造的对象不是布尔值：

```typescript
let createdByNewBoolean: boolean = new Boolean(1);
// 报错: Type 'Boolean' is not assignable to type 'boolean'.
```

事实上 new Boolean() 返回的是一个 Boolean 对象：

```typescript
let createdByNewBoolean: Boolean = new Boolean(1);
// 返回一个 Boolean 对象
```

而直接调用 Boolean() 才可以返回一个 boolean 类型

```typescript
let createdByBoolean: boolean = Boolean(1);
```

在 TypeScript 中，`boolean` 是 JavaScript 中的`基本类型`，而 `Boolean` 是 JavaScript 中的`构造函数`。

其他基本类型（除了 null 和 undefined) 与 boolean 性质写法一样，这里不再赘述

#### 数值

`这里的重点是数值的 x进制 表示法`

```typescript
let decLiteral: number = 6;

// ES6 中的十六进制表示法
let hexLiteral: number = 0xf00d;

// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;

// ES6 中的八进制表示法
let octalLiteral: number = 0o744;

let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

编译结果:

```javascript
var decLiteral = 6;

// ES6 中的十六进制表示法
var hexLiteral = 0xf00d;

// ES6 中的二进制表示法
var binaryLiteral = 10;

// ES6 中的八进制表示法
var octalLiteral = 484;

var notANumber = NaN;
var infinityNumber = Infinity;
```

其中 0b1010 和 0o744 是 ES6 中的`二进制`和`八进制`表示法，`它们会被编译为十进制数字`。

#### 字符串

`这里的重点是 ES6 的 模版字符串`

```typescript
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

编译结果:

```javascript
var myName = 'Tom';
var myAge = 25;

// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
```

其中 \` 用于定义 ES6 中的模板字符串，`${expr}` 用来在模板字符串中嵌入表达式。

#### 空值

`这里的重点是 在TS中才有的 void 概念`

JavaScript 中没有空值（Void）的概念，

而在 TypeScript 中，可以用 void 表示没有任何返回值的函数(常用)：

```typescript
function alertName(): void {
    alert('My name is Tom');
}
```

void 也可以用于声明变量(不常用,没啥用)

```typescript
let unusable: void = undefined;
```

但声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null

#### Null 和 Undefined

`这里的重点是 null 和 undefined 与 void 的区别`

在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

```typescript
let u: undefined = undefined;
let n: null = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。

也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

```typescript
// 这样不会报错
let num: number = undefined;

// 这样也不会报错
let u: undefined;
let num: number = u;
```

而 void 类型的变量不能赋值给 number 类型的变量：

```typescript
let u: void;
let num: number = u;

// 报错: Type 'void' is not assignable to type 'number'.
```

#### Symbol

多用于创建 对象 中 key:value 中的 `key` 值

这样当在同一个对象中创建两个'相同'值的key时, 它们不会互相影响

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1gbmrqawe7ij30vy0esqf1.jpg">

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1gbmse9ufh0j30vg0gigv7.jpg">

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1gbmsfvlh0ej30vg08mwit.jpg">

`应用场景1：使用Symbol来作为对象属性名(key)`

```javascript
let id1 = Symbol('id');
let id2 = Symbol('id');

var obj = {
	[id1] : 1
}
// {Symbol(id): 1}

obj[id2] = 2; // {Symbol(id): 1, Symbol(id): 2}

obj[id2] = 3; // {Symbol(id): 1, Symbol(id): 3}

// obj[id1] 1
// obj[id2] 3
```

`应用场景2：使用Symbol来替代常量const`

我们经常定义一组常量来代表一种业务逻辑下的几个不同类型，我们通常希望这几个常量之间是唯一的关系，为了保证这一点，我们需要为常量赋一个唯一的值.

有的时候这个唯一的值是没有意义的,仅用于标注不同的变量.

常量少的时候还算好，但是常量一多，你可能还得花点脑子好好为他们取个好点的名字.

现在有了Symbol，我们大可不必这么麻烦了：

```javascript
const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()
```

这样定义，直接就保证了三个常量的值是唯一的了！是不是挺方便的呢.

`应用场景3：使用Symbol定义类的私有属性/方法`

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbnqxaq5nij30vu0nkgp2.jpg">

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbnr54dww2j30vg0iidrw.jpg">

### 任意值

任意值（Any）用来表示允许赋值为任意类型。

如果是一个普通类型，在赋值过程中改变类型是不被允许的：

```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// 报错 index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

但如果是 any 类型，则允许被赋值为任意类型, 也就是可以随时更改变量的类型, 给它赋上不同的值

****疑惑片段****

在任意值上访问任何属性都是允许的：

```typescript
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

也允许调用任何方法：

```typescript
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
```

可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

其他类型不允许吗? setName是自带的方法?

****疑惑片段****

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

```typescript
let something;
something = 'seven';
something = 7;

something.setName('Tom');
```

等价于:

```typescript
let something: any;
something = 'seven';
something = 7;

something.setName('Tom');
```

也就是说,在ts中按照js的方式来声明变量(并且声明的同时没有给它赋值),这个变量就是默认为any类型

### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

以下代码虽然没有指定类型，但是会在编译的时候报错：

```typescript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// 报错 index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

因为其等价于:

```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// 报错 index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。(条件是声明变量的同时给这个变量赋值了)

`如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查`


