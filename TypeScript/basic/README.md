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
