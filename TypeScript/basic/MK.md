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








## 更多详细的类型知识

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

可以理解为, ES6 提供了 11 个内置的 值, 并把这些值存在了 Symbol 上, 这些值与 JS 内部使用的属性和方法同名(大多与对象数组有关)

这些内置的 Symbol 值就是保存在 Symbol 上的，你可以把Symbol.xxx看做一个 symbol 值。

**Symbol.hasInstance**

	对象的 Symbol.hasInstance 指向一个内部方法，
	当你 给一个对象A设置 以 Symbol.hasInstance 为属性名 的方法B 后，
	当 其他对象C 使用 instanceof 判断 是否为这个对象A的实例 时，
	会自动调用你定义的这个方法B，
	参数是其他的这个对象C

```
const objA = {
  [Symbol.hasInstance](otherObjC) { // function B 
    console.log(otherObjC);
  }
};
console.log({ a: "a" } instanceof objA); // false
// 注意：在TypeScript中这会报错，"instanceof" 表达式的右侧必须属于类型 "any"，或属于可分配给 "Function" 接口类型的类型。
// 是要求你instanceof操作符右侧的值只能是 构造函数或 者 类，或者类型是 any类型。这里你可以使用类型断言，将obj改为obj as any
```

	可以看到当我们使用 instanceof 判断{ a: ‘a’ }是否是 obj 创建的实例的时候，Symbol.hasInstance 这个方法被调用了。

**Symbol.isConcatSpreadable**

	这个值是一个可读写布尔值，其值默认是undefined，
	当一个 **数组** 的 Symbol.isConcatSpreadable 设为 true 或者 为默认的undefined 时，
	这个数组 在 数组自带的 concat 方法中 会被扁平化
	但如果 Symbol.isConcatSpreadable 设为 false
	这个数组 在 数组自带的 concat 方法中 不会被扁平化

```javascript
// 正常操作
let arr = [1, 2];
console.log([].concat(arr, [3, 4])); // 打印结果为[1, 2, 3, 4]，length为4

// 设置isConcatSpreadable后
let arr1 = ["a", "b"];
console.log(arr1[Symbol.isConcatSpreadable]); // undefined
arr1[Symbol.isConcatSpreadable] = false;
console.log(arr1[Symbol.isConcatSpreadable]); // false
console.log([].concat(arr1, [3, 4])); 

// 打印结果如下：
/*
 [ ["a", "b", Symbol(Symbol.isConcatSpreadable): false], 3, 4 ]
 最外层这个数组有三个元素，
 第一个是一个数组，因为我们设置了arr1[Symbol.isConcatSpreadable] = false
 所以第一个这个数组没有被扁平化(没有被展开)，

 第一个元素这个数组看似是有三个元素，但你在控制台可以看到这个数组的length为2
 因为Symbol(Symbol.isConcatSpreadable): false不是他的元素，而是他的属性，
 我们知道数组也是对象，所以我们可以给数组设置属性
 但属性不会被算在数组长度中

 你可以试试如下代码，然后看下打印出来的效果：
  let arr = [1, 2]
  arr.props = 'value'
  console.log(arr) // [1, 2, props: "value"]
  且 arr.length 为 2
 */
```

**Symbol.species**

	假设 C是对象B的一个实例
	让 由实例C衍生出来的实例A
	只是B的实例, 而不是同为BC的实例


```javascript
// 首先我们使用 class 定义一个类 C，
// 使用 extends 继承原生构造函数 Array，
// 那么类 C 创建的实例就能继承所有 Array 原型对象上的方法，比如 map、filter 等

class C extends Array {
  getName() {
    return "lison";
  }
}
const c = new C(1, 2, 3);
const a = c.map(item => item + 1);
console.log(a); // [2, 3, 4]
console.log(a instanceof C); // true
console.log(a instanceof Array); // true
console.log(a.getName()); // "lison"
```

	这个例子中，a 是由 c 通过 map 方法衍生出来的，
	我们也看到了，a 既是 C 的实例，也是 Array 的实例。
	但是如果我们想只让衍生的数组是 Array 的实例，就需要用 Symbol.species

```javascript
class C extends Array {
  // 使用 Symbol.species
  static get [Symbol.species]() {
    return Array;
  }
  getName() {
    return "lison";
  }
}
const c = new C(1, 2, 3);
const a = c.map(item => item + 1); // 此时自动调用Symbol.species命名的方法
console.log(a); // [2, 3, 4]
console.log(a instanceof C); // false
console.log(a instanceof Array); // true
console.log(a.getName()); // error a.getName is not a function
```

	就是给类 C 定义一个静态 get 存取器方法(访问实例时调用)，方法名为 Symbol.species，
	然后在这个方法中返回要构造衍生数组的构造函数。
	所以最后我们看到，a instanceof C为 false，也就是 a 不再是 C 的实例，也无法调用继承自 C 的方法。

**Symbol.match、Symbol.replace、Symbol.search 和 Symbol.split**

	这个 Symbol.match 值指向一个内部方法，当在字符串 str 上调用 match 方法时，会自动调用这个方法

```javascript
let obj = {
  [Symbol.match](string) {
    return string.length;
  }
};
console.log("abcde".match(obj)); // 5
```

	相同的还有 Symbol.replace、Symbol.search 和 Symbol.split，使用方法和 Symbol.match 是一样的。

**Symbol.iterator**

	数组的 Symbol.iterator 属性指向该数组的默认遍历器方法：

```javascript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator);           // Array Iterator {}
console.log(iterator.next());    // {value: 1, done: false}
console.log(iterator.next());    // {value: 2, done: false}
console.log(iterator.next());    // {value: 3, done: false}
console.log(iterator.next());    // {value: undefined, done: true}
```

	这个 Symbol.iterator 方法是可写的，我们可以自定义遍历器方法。

**Symbol.toPrimitive**

	对象的这个属性指向一个方法，
	当这个 对象 被转为 原始类型值(string,number等) 时会自动调用这个方法，
	也就是对象发生类型转换 (为原始类型值) 的时候调用
	这个方法有一个参数，是这个对象被转为的类型(目标类型)

```javascript
let obj = {
  [Symbol.toPrimitive](type) {
    console.log(type);
  }
};
// const b = obj++      // number
const a = `abc${obj}`;  // string
```

**Symbol.toStringTag**

	Symbol.toStringTag 和 Symbol.toPrimitive 相似，
	对象的这个属性的值可以是一个字符串，也可以是一个存取器 get 方法，
	当在对象上调用 toString 方法时自动调用这个方法，
	返回值将作为"[object xxx]"中 xxx 这个值(之前的返回值是[object object])

```javascript
// 值为字符串
let obj = {
  [Symbol.toStringTag]: "lison"
};
obj.toString(); // "[object lison]"

// 值为存取器 get 方法
let obj2 = {
  get [Symbol.toStringTag]() {
    return "haha";
  }
};
obj2.toString(); // "[object haha]"
```

**Symbol.unscopables**

	这个值和 with 命令有关，我们先来看下 with 怎么使用

```javascript
const obj = {
  a: "a",
  b: "b"
};

// 限制了内部变量的取值范围, 之前默认在window对象上取值, 现在在obj对象上取值
with (obj) {
  console.log(a); // "a"
  console.log(b); // "b"
}
// 如果是在TypeScript开发环境中，这段代码可能with会报错：不支持 "with" 语句，这是因为在严格模式下，是不允许使用with的。
```

	可以看到，使用 with 传入一个对象后，在代码块中访问对象的属性就不需要写对象了，直接就可以用它的属性。

	对象的 Symbol.unscopables 属性指向一个对象，
	该对象包含了当使用 with 关键字时，
	哪些属性被 with 环境过滤掉

	下面代码中显示为 xxx:true 的都是被过滤掉的属性, 也就是在with中无法访问到

```javascript
console.log(Array.prototype[Symbol.unscopables]);
/*
{
    copyWithin: true
    entries: true
    fill: true
    find: true
    findIndex: true
    includes: true
    keys: true
    values: true
}
*/

with(Array.prototype){
console.log(pop)
}
// ƒ pop() { [native code] }

with(Array.prototype){
	console.log(fill)
}
// Uncaught ReferenceError: fill is not defined
```

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
console.log(obj[key2]) // error 类型“symbol”不能作为索引类型使用, unique symbol才可以
```

### 枚举

枚举是 TypeScript 新增加的一种数据类型，这在其他很多语言中很常见，但是 JavaScript 却没有。

使用枚举，我们可以给一些难以理解的常量赋予一组具有意义的直观的名字，使其更为直观，

你可以理解枚举就是一个字典

枚举使用 enum 关键字定义，并且 TypeScript 支持数字和字符串的枚举。

#### 数字枚举

```typescript
enum Status {// 这里你的TSLint可能会报一个：枚举声明只能与命名空间或其他枚举声明合并
  Uploading,
  Success,
  Failed
}
console.log(Status.Uploading); // 0
console.log(Status["Success"]); // 1
console.log(Status.Failed); // 2
```

我们使用enum关键字定义了一个枚举值 Status，它包含三个字段，每个字段间用逗号隔开。

我们使用枚举值的元素值时，就像访问对象的属性一样，

你可以使用’.‘操作符和’[]'两种形式访问里面的值，这和对象一样。

再来看输出的结果，Status.Uploading 是 0，Status['Success']是 1，Status.Failed 是 2，

我们在定义枚举 Status 的时候，并没有指定索引号，是因为这是默认的编号，当然我们也可以自己指定

注意 数值索引 的值 是默认由 前一个索引值 递增的

```typescript
// 修改起始编号
enum Color {
  Red = 2,
  Blue,
  Yellow
}
console.log(Color.Red, Color.Blue, Color.Yellow); // 2 3 4

// 指定任意字段的索引值
enum Status {
  Success = 200,
  NotFound = 404,
  Error = 500
}
console.log(Status.Success, Status.NotFound, Status.Error); // 200 404 500

// 指定部分字段，其他使用默认递增索引
enum Status {
  Ok = 200,
  Created,
  Accepted,
  BadRequest = 400,
  Unauthorized
}
console.log(Status.Created, Status.Accepted, Status.Unauthorized); // 201 202 401
```

数字枚举在定义值的时候，可以使用计算值和常量。

但是要注意，如果某个字段使用了计算值或常量，

那么该字段后面紧接着的字段`必须设置初始值`，

因为从这里以后不能使用默认的递增值了

```typescript
const getValue = () => {
  return 0;
};
enum ErrorIndex {
  a = getValue(),
  b, // error 枚举成员必须具有初始化的值
  c
}
enum RightIndex {
  a = getValue(),
  b = 1,
  c
}
const Start = 1;
enum Index {
  a = Start,
  b, // error 枚举成员必须具有初始化的值
  c
}
```

#### 反向映射

我们定义一个枚举值的时候，可以通过 Enum[‘key’]或者 Enum.key 的形式获取到对应的值 value。

TypeScript 还支持反向映射，但是反向映射只支持数字枚举，字符串枚举是不支持的。

```typescript
enum Status {
  Success = 200,
  NotFound = 404,
  Error = 500
}
console.log(Status["Success"]); // 200
console.log(Status[200]); // 'Success'
console.log(Status[Status["Success"]]); // 'Success'
```

TypeScript 中定义的`枚举，编译之后其实是对象`，我们来看下上面这个例子中的枚举值 Status 编译后的样子：

```javascript
{
	// 枚举值的字段名 分别作为 对象的属性名 和 值
    200: "Success",
    404: "NotFound",
    500: "Error",
	
	// 枚举值的字段值 分别作为 对象的值 和 属性名
    Error: 500,
    NotFound: 404,
    Success: 200
}
```

可以看到，TypeScript 会把我们定义的 枚举值的字段名 分别作为 对象的属性名 和 值，

把 枚举值的字段值 分别作为 对象的值 和 属性名，

同时添加到对象中。

这样我们既可以通过枚举值的字段名得到值，也可以通过枚举值的值得到字段名。

#### 字符串枚举

TypeScript2.4 版本新增了字符串枚举，

字符串枚举值要求 每个字段的值 都必须是 字符串字面量，

或者是 该枚举值中 另一个字符串枚举成员

```typescript
enum Message {
  Error = "Sorry, error",
  Success = "Hoho, success"
}
console.log(Message.Error); // 'Sorry, error'
```

再来看我们使用枚举值中其他枚举成员的例子

```typescript
enum Message {
  Error = "error message",
  ServerError = Error,
  ClientError = Error
}
console.log(Message.Error); // 'error message'
console.log(Message.ServerError); // 'error message'
```

`注意`，这里的 其他枚举成员 指的是 同一个枚举值中的 枚举成员，

因为字符串枚举不能使用常量或者计算值，

所以也不能使用其他枚举值中的成员。

也就是只能跟自己组里面的成员发生关联, 不能使用到其他组里面的成员

#### 异构枚举

简单来说异构枚举就是枚举值中成员值既有数字类型又有字符串类型

```typescript
enum Result {
  Faild = 0,
  Success = "Success"
}
```

但是这种如果不是真的需要，不建议使用。

因为往往我们将一类值整理为一个枚举值的时候，它们的特点是相似的。

比如我们在做接口请求时的返回状态码，如果是状态码都是数值，如果是提示信息，都是字符串，

所以在使用枚举的时候，往往是可以避免使用异构枚举的，重点是做好类型的整理。

#### 枚举成员类型和联合枚举类型(作为一个类型来使用)

如果枚举值里 所有成员的值 都是 字面量类型的值，那么这个枚举的 每个成员 和 枚举值本身 都可以作为类型来使用

但这个枚举值需要满足以下条件:

	不带初始值的枚举成员，例如enum E { A }
	值为字符串字面量，例如enum E { A = ‘a’ }
	值为数值字面量，或者带有-符号的数值字面量，例如enum E { A = 1 }、enum E { A = -1 }

当我们的枚举值的 所有成员的值 都是 上面这三种情况 的时候，枚举值 和 成员 就可以作为 类型 来用

(就是枚举值的所有成员都得是 字面量 , 不能是 计算值 或者是 常量const, 或者是 另一个字符串枚举成员 ?)

**枚举成员类型**

我们可以把 符合条件的枚举值的成员 作为类型来使用

```typescript
enum Animal {
  Dog = 1,
  Cat = 2
}

interface Dog {
  type: Animal.Dog; // 这里使用Animal.Dog作为类型，指定接口Dog的必须有一个type字段，且类型为Animal.Dog
}
interface Cat {
  type: Animal.Cat; // 这里同上
}

let cat1: Cat = {
  type: Animal.Dog // error [ts] 不能将类型“Animal.Dog”分配给类型“Animal.Cat”
};
let dog: Dog = {
  type: Animal.Dog
};
```

**联合枚举类型**

当我们的 枚举值 符合条件时，这个 枚举值 就可以看做是一个 包含所有成员的 联合类型

	联合类型在前面课时中几次提到，现在我们来看一下。
	联合类型实际是几个类型的结合，但是和交叉类型不同，
	联合类型是要求只要符合联合类型中任意一种类型即可，它使用 | 符号定义。

```typescript
enum Status {
  Off,
  On
}
interface Light {
  status: Status;
}

enum Animal {
  Dog = 1,
  Cat = 2
}
const light1: Light = {
  status: Animal.Dog // error 不能将类型“Animal.Dog”分配给类型“Status”
};


const light2: Light = {
  status: Status.Off
};
const light3: Light = {
  status: Status.On
};
```

上面例子定义接口 Light 的 status 字段的类型为枚举值 Status，

那么此时 status 的属性值必须为 Status.Off 和 Status.On 中的一个，

也就是相当于status: `Status.Off | Status.On`。

#### 运行时的枚举

枚举在编译成 JavaScript 之后实际是一个对象。

这个我们前面讲过了，既然是对象，那么就可以当成对象来使用

```typescript
enum E {
  A,
  B
}
const getIndex = (enumObj: { A: number }): number => {
  return enumObj.A;
};
console.log(getIndex(E)); // 0
```

上面这个例子要求 getIndex 的参数为一个对象，

且必须包含一个属性名为’A’的属性，其值为数值类型，

只要有这个属性即可。

当我们调用这个函数，把枚举值 E 作为实参传入是可以的，

因为它在运行的时候是一个对象，包含’A’这个属性，因为它在运行的时候相当于下面这个对象：

```javascript
{
    0: "A",
    1: "B",
    A: 0,
    B: 1
}
```

#### const enum

我们定义了枚举值之后，编译成 JavaScript 的代码会创建一个对应的对象，这个对象我们可以在程序运行的时候使用。

但是如果我们使用枚举只是为了让程序可读性好，并不需要编译后的对象呢？

这样会增加一些编译后的代码量。

所以 TypeScript 在 1.4 新增 const enum*(完全嵌入的枚举)*，在之前讲的定义枚举的语句之前加上const关键字，

这样编译后的代码不会创建这个对象，只是会从枚举里拿到相应的值进行替换

```typescript
enum Status {
  Off,
  On
}
const status = Status.On;

const enum Animal {
  Dog,
  Cat
}
const animal = Animal.Dog;
```

上面的例子编译成 JavaScript 之后是这样的：

```javascript
var Status;
(function(Status) {
  Status[(Status["Off"] = 0)] = "Off";
  Status[(Status["On"] = 1)] = "On";
})(Status || (Status = {}));
var status = Status.On;

var animal = 0; /* Dog */
```

我们来看下 Status 的处理，

先是定义一个变量 Status，

然后定义一个立即执行函数，在函数内给 Status 添加对应属性，

首先Status[“Off”] = 0是给Status对象设置Off属性，并且值设为 0，这个赋值表达式的返回值是等号右边的值，也就是 0，所以Status[Status[“Off”] = 0] = "Off"相当于Status[0] = “Off”。

这样我们就获得了{"off":0, 0:"off"}这样属性的对象

创建了这个对象之后，将 Status 的 On 属性值赋值给 status；

------------------------

再来看下 animal 的处理，

我们看到编译后的代码并没有像Status创建一个Animal对象，

而是直接把Animal.Dog的值0替换到了const animal = Animal.Dog表达式的Animal.Dog位置，

这就是const enum的用法了。

#### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbtglt1hybj318g06675g.jpg">