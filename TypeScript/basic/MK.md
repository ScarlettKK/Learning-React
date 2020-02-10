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

## TS 与 JS 类似的类型

### number

TypeScript 和 JavaScript 一样，所有数字都是浮点数，所以`只有一个number类型，而没有int或者float类型`。

而且 TypeScript 还支持 ES6 中新增的二进制和八进制数字字面量，所以` TypeScript 中共支持二、八、十和十六四种进制的数值`。

### string

另外还有个和字符串相关的类型：`字符串字面量类型`。

即把一个字符串字面量作为一种类型(如下面把字符串放在了类型)，比如上面的字符串"Lison"，当你把一个变量指定为这个字符串类型的时候，就不能再赋值为其他字符串值了，如：

```typescript
let str: 'Lison'
str = 'haha' // error 不能将类型“"haha"”分配给类型“"Lison"”let num: number = 123
```

### 数组

在 TypeScript 中有两种定义数组的方式：

```typescript
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

第一种形式通过number[]的形式来指定这个类型元素均为number类型的数组类型，这种写法是`推荐的写法`

当你使用第二种形式定义时，tslint 可能会警告让你使用第一种形式定义，如果你就是想用第二种形式，可以通过在 tslint.json 的 rules 中加入"array-type": [false]关闭 tslint 对这条的检测。

如果你要指定一个数组里的元素既可以是数值也可以是字符串，那么你可以使用这种方式：number|string[],也就是联合类型

### null / undefined

默认情况下 undefined 和 null 可以赋值给任意类型的值，也就是说你可以把 undefined 赋值给 void 类型，也可以赋值给 number 类型。

当你在 tsconfig.json 的"compilerOptions"里设置了"strictNullChecks": true时，必须严格对待。undefined 和 null 将只能赋值给它们自身和 void 类型。

### obj

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

## TS 中的新增的类型

### 元组

元组可以看做是数组的拓展，它表示已知元素数量和类型的数组。确切地说，是已知数组中每一个位置上的元素的类型，来看例子：

```typescript
let tuple: [string, number, boolean];
tuple = ["a", 2, false];
tuple = [2, "a", false]; // error 不能将类型“number”分配给类型“string”。 不能将类型“string”分配给类型“number”。
tuple = ["a", 2]; // error Property '2' is missing in type '[string, number]' but required in type '[string, number, boolean]'
```

可以看到，上面我们定义了一个元组 tuple，它包含三个元素，且每个元素的类型是固定的。

当我们为 tuple 赋值时：`各个位置上的元素类型都要对应，元素个数也要一致。`

在 2.6 及之前版本中，超出规定个数的元素称作越界元素，但是只要越界元素的类型是定义的类型中的一种即可。

比如我们定义的类型有两种：string 和 number，越界的元素是 string 类型，属于联合类型 string | number，所以没问题。

`在 2.6 之后的版本，去掉了这个越界元素是联合类型的子类型即可的条件，要求元组赋值必须类型和个数都对应。`

### 枚举

enum类型在 C++这些语言中比较常见，TypeScript 在 ES 原有类型基础上加入枚举类型，使我们在 TypeScript 中也可以给一组数值赋予名字，这样对开发者来说较为友好。

比如我们要定义一组角色，每一个角色用一个数字代表，就可以使用枚举类型来定义：

```typescript
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}
```

上面定义的枚举类型 Roles 里面有三个值，TypeScript 会为它们每个值分配编号，默认从 0 开始，依次排列，所以它们对应的值是：

```typescript
enum Roles {
  SUPER_ADMIN = 0,
  ADMIN = 1,
  USER = 2
}
```

当我们使用的时候，就可以使用名字而不需要记数字和名称的对照关系了：

```typescript
const superAdmin = Roles.SUPER_ADMIN;
console.log(superAdmin); // 0
```

你也可以修改这个数值，比如你想让这个编码从 1 开始而不是 0，可以如下定义：

```typescript
cenum Roles {
  SUPER_ADMIN = 1,
  ADMIN,
  USER
}
```

这样当你访问Roles.ADMIN时，它的值就是 2 了。

你也可以为每个值都赋予不同的、不按顺序排列的值：

```typescript
cenum Roles {
  SUPER_ADMIN = 1,
  ADMIN = 3,
  USER = 7
}
```

通过名字 Roles.SUPER_ADMIN 可以获取到它对应的值 1，同时你也可以通过值获取到它的名字，以上面任意数值这个例子为前提：

```typescript
console.log(Roles[3]); // 'ADMIN'
```

### Any

JavaScript 的类型是灵活的，程序有时也是多变的。有时，我们在编写代码的时候，并不能清楚地知道一个值到底是什么类型，这时就需要用到 any 类型，即任意类型。

`但是请注意，不要滥用 any，如果任何值都指定为 any 类型，那么 TypeScript 将失去它的意义。`


### void

void 和 any 相反，any 是表示任意类型，而 void 是表示没有任意类型，就是什么类型都不是，这在我们定义函数，函数没有返回值时会用到：

```typescript
const consoleText = (text: string): void => {
  console.log(text);
};
```

这个函数没有返回任何的值，所以它的返回类型为 void。

`void 类型的变量只能赋值为 undefined 和 null，其他类型不能赋值给 void 类型的变量。`

### never

never 类型指那些`永不存在的值的类型`，它是那些`总会抛出异常或根本不会有返回值的函数表达式的返回值类型`，

当变量被永不为真的类型保护（后面章节会详细介绍）所约束时，该变量也是 never 类型。

这个类型比较难理解，我们先来看几个例子：

```typescript
const errorFunc = (message: string): never => {
  throw new Error(message);
};
```

这个 errorFunc 函数总是会抛出异常，所以它的返回值类型是 never，用来表明`它的返回值是永不存在的`。

```typescript
const infiniteFunc = (): never => {
  while (true) {}
};
```

infiniteFunc也是`根本不会有返回值的函数`，

它和之前讲 void 类型时的consoleText函数不同，consoleText函数没有返回值，是我们在定义函数的时候没有给它返回值，

而infiniteFunc是死循环是根本不会返回值的，所以它们二者还是有区别的。

never 类型是任何类型的子类型，所以它可以赋值给任何类型；而没有类型是 never 的子类型，所以除了它自身没有任何类型可以赋值给 never 类型，any 类型也不能赋值给 never 类型。

### unknown

unknown类型是TypeScript在3.0版本新增的类型，它表示未知的类型，这样看来它貌似和any很像，但是还是有区别的，也就是所谓的“`unknown相对于any是安全的`”。

怎么理解呢？我们知道当一个值我们不能确定它的类型的时候，可以指定它是any类型；

但是当指定了any类型之后，这个值基本上是“废”了，你可以随意对它进行属性方法的访问，不管有的还是没有的，可以把它当做任意类型的值来使用，这往往会产生问题，如下：

```typescript
let value: any
console.log(value.name)
console.log(value.toFixed())
console.log(value.length)
```

上面这些语句都不会报错，因为value是any类型，所以后面三个操作都有合法的情况

而当你指定值为unknown类型的时候，如果没有通过基于控制流的类型断言来缩小范围的话，是不能对它进行任何操作的

### 拓展阅读

#### 交叉类型

交叉类型就是取多个类型的并集，使用 & 符号定义，被&符链接的多个类型构成一个交叉类型，表示这个类型同时具备这几个连接起来的类型的特点

```typescript
const merge = <T, U>(arg1: T, arg2: U): T & U => {
  let res = <T & U>{}; // 这里指定返回值的类型兼备T和U两个类型变量代表的类型的特点
  res = Object.assign(arg1, arg2); // 这里使用Object.assign方法，返回一个合并后的对象；
                                   // 关于该方法，请在例子下面补充中学习
  return res;
};
const info1 = {
  name: "lison"
};
const info2 = {
  age: 18
};
const lisonInfo = merge(info1, info2);

console.log(lisonInfo.address); // error 类型“{ name: string; } & { age: number; }”上不存在属性“address”
```

可以看到，传入的两个参数分别是带有属性 name 和 age 的两个对象，所以它俩的交叉类型要求返回的对象既有 name 属性又有 age 属性。

	补充阅读：Object.assign方法可以合并多个对象，将多个对象的属性添加到一个对象中并返回，有一点要注意的是，如果属性值是对象或者数组这种保存的是内存引用的引用类型，会保持这个引用，也就是如果在Object.assign返回的的对象中修改某个对象属性值，原来用来合并的对象也会受到影响。

#### 联合类型

联合类型在前面课时中几次提到，现在我们来看一下。联合类型实际是几个类型的结合，但是和交叉类型不同，联合类型是要求只要符合联合类型中任意一种类型即可，它使用 | 符号定义。当我们的程序具有多样性，元素类型不唯一时，即使用联合类型。

#### 其他

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbqh3xz0vjj317n0u0afy.jpg">

### symbol

#### js 中的 symbol

symbol是 ES6 新增的一种基本数据类型，它和 number、string、boolean、undefined 和 null 是同类型的，object 是引用类型。它用来表示独一无二的值，通过 Symbol 函数生成。

```javascript
const s = Symbol();
typeof s; // 'symbol'
```

`注意`：Symbol 前面不能加new关键字，直接调用即可创建一个独一无二的 symbol 类型的值。

...

我们可以在使用 Symbol 方法创建 symbol 类型值的时候传入一个参数，这个参数需要是字符串类型的。

如果传入的参数不是字符串，会先调用传入参数的 toString 方法转为字符串。

就算传入相同的字符串,创造出来的值并不是全等的

你可以理解为我们每一个人都是独一无二的，虽然可以有相同的名字，但是名字只是用来方便我们区分的，名字相同但是人还是不同的。

`Symbol 方法传入的这个字符串，就是方便我们在控制台或程序中用来区分 symbol 值的。`

...

我们可以调用 symbol 值的toString方法将它转为字符串

你可以简单地理解 symbol 值为字符串类型的值，

但是它和字符串有很大的区别，它不可以和其他类型的值进行运算，

但是可以转为字符串和布尔类型值：

```javascript
let s = Symbol("lison");
console.log(s.toString()); // 'Symbol(lison)'
console.log(Boolean(s)); // true
console.log(!s); // false
```

通过上面的例子可以看出，symbol 类型值和对象相似，本身转为布尔值为 true，取反为 false。

...

其他功能:

作为属性名

属性名的遍历

...

Symbol 包含两个静态方法，`for` 和 `keyFor`

```javascript
const s1 = Symbol("lison");
const s2 = Symbol("lison");
const s3 = Symbol.for("lison");
const s4 = Symbol.for("lison");
s3 === s4; // true
s1 === s3; // false
// 这里还是会报错误：This condition will always return 'false' since the types 'unique symbol' and 'unique symbol' have no overlap.还是我们说过的，因为这里的表达式始终是true和false，所以编译器会提示我们
```

直接使用 Symbol 方法，即便传入的字符串是一样的，创建的 symbol 值也是互不相等的。

**而使用 Symbol.for方法传入字符串，会先检查有没有使用该字符串调用 Symbol.for 方法创建的 symbol 值(注意是用Symbol.for 方法创建的,而不是symbol方法创建)，如果有，返回该值，如果没有，则使用该字符串新创建一个。**

使用该方法创建 symbol 值后会在全局范围进行注册。

`注意`：这个注册的范围包括当前页面和页面中包含的 iframe，以及 service sorker

Symbol.keyFor() 该方法传入一个 symbol 值，返回该值在全局注册的键名：

```javascript
const sym = Symbol.for("lison");
console.log(Symbol.keyFor(sym)); // 'lison'
```
...

`11 个内置 symbol 值`

`ES6 提供了 11 个内置的 Symbol 值`，指向 JS 内部使用的属性和方法。

这些内置的 Symbol 值就是保存在 Symbol 上的，你可以把Symbol.xxx看做一个 symbol 值。

Symbol.hasInstance

Symbol.isConcatSpreadable

Symbol.species

Symbol.match、Symbol.replace、Symbol.search 和 Symbol.split

Symbol.iterator

Symbol.toPrimitive

Symbol.toStringTag

Symbol.unscopables

#### 在TypeScript中使用symbol类型

学习完ES6标准中Symbol的所有内容后，我们来看下在TypeScript中使用symbol类型值，很简单。就是制定一个值的类型为symbol类型：

```javascript
let sym: symbol = Symbol()
```

TypeScript在2.7版本对Symbol做了补充，增加了`unique symbol`这种类型，他是symbols的子类型，

`这种类型的值只能由Symbol()或Symbol.for()创建`，或者通过指定类型来指定一个值是这种类型。

这种类型的值`仅可用于常量的定义和用于属性名`。

另外还有一点要注意，`定义unique symbol类型的值，必须用const不能用let`。

```typescript
const key1: unique symbol = Symbol()
let key2: symbol = Symbol()
const obj = {
    [key1]: 'value1',
    [key2]: 'value2'
}
console.log(obj[key1])
console.log(obj[key2]) // error 类型“symbol”不能作为索引类型使用。
```

