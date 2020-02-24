# 进阶部分

## 类型推论

在学习基础部分的章节时，我们讲过，在一些定义中如果你没有明确指定类型，编译器会自动推断出适合的类型；

```typescript
let name = "lison";
name = 123; // error 不能将类型“123”分配给类型“string”
```

我们看到，在定义变量 name 的时候我们并没有指定 name 的类型，而是直接给它赋一个字符串。

当我们再给 name 赋一个数值的时候，就会报错。

在这里，TypeScript 根据我们赋给 name 的值的类型，推断出我们的 name 的类型，

这里是 string 类型，当我们再给 string 类型的 name 赋其他类型值的时候就会报错。

这个是最基本的类型推论，根据右侧的值推断左侧变量的类型，接下来我们看两个更复杂的推论。

### 多类型联合

当我们定义一个数组或元组这种包含多个元素的值的时候，多个元素可以有不同的类型，

这种时候 TypeScript 会将多个类型合并起来，组成一个联合类型，来看例子：

```typescript
let arr = [1, "a"];
arr = ["b", 2, false]; // error 不能将类型“false”分配给类型“string | number”
```

可以看到，此时的 arr 的元素被推断为string | number，

也就是元素可以是 string 类型也可以是 number 类型，

除此两种类型外的类型是不可以的。

再来看个例子：

```typescript
let value = Math.random() * 10 > 5 ? 'abc' : 123
value = false // error 不能将类型“false”分配给类型“string | number”
```

这里我们给value赋值为一个三元操作符表达式，Math.random() * 10的值为0-10的随机数。

这里判断，如果这个随机值大于5，则赋给value的值为字符串’abc’，否则为数值123，

所以最后编译器推断出的类型为联合类型string | number，

当给它再赋值为false的时候就会报错。

### 上下文类型

我们上面讲的两个例子都是根据=符号右边值的类型，推断左侧值的类型。

现在要讲的上下文类型则相反，它是根据左侧的类型推断右侧的一些类型，先来看例子：

```typescript
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.a); // error 类型“MouseEvent”上不存在属性“a”
};
```

我们可以看到，表达式左侧是 window.onmousedown(鼠标按下时发生事件)，

`因此 TypeScript 会推断赋值表达式右侧函数的参数是事件对象，因为左侧是 mousedown 事件，`

`所以 TypeScript 推断 mouseEvent 的类型是 MouseEvent。`

在回调函数中使用 mouseEvent 的时候，你可以访问鼠标事件对象的所有属性和方法，当访问不存在属性的时候，就会报错。

以上便是我要讲的三种常见的类型推论。

在我们日常开发中，`必写的类型还是要明确指定的，这样我们才能更准确地得到类型信息和开发辅助。`

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc2n4tx5ztj318g07dwfp.jpg">

## 类型别名和字面量类型

本小节我们来学习类型别名和字面量类型。

类型别名我们之前在讲泛型的时候接触过，现在来详细学习下。

### 类型别名

类型别名就是给一种类型起个别的名字，之后只要使用这个类型的地方，都可以用这个名字作为类型代替，

但是它只是起了一个名字，并不是创建了一个新类型。

这种感觉就像 JS 中对象的赋值，你可以把一个对象赋给一个变量，使用这个对象的地方都可以用这个变量代替，

但你并不是创建了一个新对象，而是通过引用来使用这个对象。

我们来看下怎么定义类型别名，使用 `type` 关键字：

```typescript
type TypeString = string;    // 类型别名

let str: TypeString;
str = 123; // error Type '123' is not assignable to type 'string'
```

类型别名也可以使用泛型，来看例子：

```typescript
type PositionType<T> = { x: T; y: T };    // 类型别名

const position1: PositionType<number> = {
  x: 1,
  y: -1
};
const position2: PositionType<string> = {
  x: "right",
  y: "top"
};
```

使用类型别名时也可以在属性中引用自己：

```typescript
type Child<T> = {    // 类型别名
  current: T;
  child?: Child<T>;  // 引用自己
};
let ccc: Child<string> = {
  current: "first",
  child: {
    // error
    current: "second",
    child: {
      current: "third",
      child: "test" // 这个地方不符合type，造成最外层child处报错
    }
  }
};
```

但是要注意，只可以在`对象属性`中`引用自己的类型别名`，而不能直接使用，比如下面这样是不对的：

```typescript
type Child = Child[]; // error 类型别名“Child”循环引用自身
```

另外要注意，因为类型别名只是为其它类型起了个新名字来引用这个类型，

`所以当它为接口起别名时，不能使用 extends 和 implements 。`

接口和类型别名有时可以起到 同样作用，比如下面这个例子：

```typescript
type Alias = {
  num: number;
};
interface Interface {
  num: number;
}
let _alias: Alias = {
  num: 123
};
let _interface: Interface = {
  num: 321
};
_alias = _interface;
```

可以看到用类型别名和接口都可以定义一个只包含 num 属性的对象类型，而且类型是兼容的。

那么什么时候用类型别名，什么时候用接口呢？可以通过两点来选择：

	当你定义的类型要用于 拓展，即使用 implements 等修饰符时，用接口。
	当 无法通过接口，并且需要使用 联合类型 或 元组类型，用类型别名。

### 字面量类型

字面量类型其实比较基础，但是它又不适合放到基本类型里讲，

因为字符串字面量类型和字符串类型其实并不一样，所以接下来我们来学习两种字面量类型。

----------------------------
字符串字面量类型

字符串字面量类型其实就是字符串常量，与字符串类型不同的是 它是具体的值。

```typescript
type Name = "Lison";

const name1: Name = "test"; // error 不能将类型“"test"”分配给类型“"Lison"”
const name2: Name = "Lison";
```

你还可以使用联合类型来使用多个字符串：

```typescript
type Direction = "north" | "east" | "south" | "west";

function getDirectionFirstLetter(direction: Direction) {
  return direction.substr(0, 1);
}
getDirectionFirstLetter("test"); // error 类型“"test"”的参数不能赋给类型“Direction”的参数
getDirectionFirstLetter("east");
```

----------------------------
数字字面量类型

另一个字面量类型就是数字字面量类型，它和字符串字面量类型差不多，都是指定类型为具体的值。

```typescript
type Age = 18;

interface Info {
  name: string;
  age: Age;
}
const info: Info = {
  name: "Lison",
  age: 28 // error 不能将类型“28”分配给类型“18”
};
```

这里补充一个比较经典的逻辑错误，来看例子：

```typescript
function getValue(index: number) {
  if (index !== 0 || index !== 1) {
    // error This condition will always return 'true' since the types '0' and '1' have no overlap
    // ...
  }
}
```

这个例子中，在判断逻辑处使用了 || 符，

当 index !== 0 不成立时，说明 index 就是 0，则不应该再判断 index 是否不等于 1；

而如果 index !== 0 成立，那后面的判断也不会再执行；所以这个地方会报错。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc2og5lul0j318g0akdi2.jpg">

## 可辨识联合

使用可辨识联合并保证每个case都被处理

我们可以把单例类型、联合类型、类型保护和类型别名这几种类型进行合并，来创建一个叫做可辨识联合的高级类型，

它也可称作标签联合或代数数据类型。

	所谓单例类型，你可以理解为符合单例模式的数据类型，比如枚举成员类型，字面量类型。

可辨识联合要求具有两个要素：
	
	具有普通的单例类型属性（这个要作为辨识的特征，也是重要因素）。
	一个类型别名，包含了那些类型的联合（即把几个类型封装为联合类型，并起一个别名）。

来看例子：

```typescript
interface Square {
  kind: "square"; // 这个就是具有辨识性的属性
  size: number;
}
interface Rectangle {
  kind: "rectangle"; // 这个就是具有辨识性的属性
  height: number;
  width: number;
}
interface Circle {
  kind: "circle"; // 这个就是具有辨识性的属性
  radius: number;
}
type Shape = Square | Rectangle | Circle; 
// 这里使用三个接口组成一个联合类型，并赋给一个别名Shape，组成了一个可辨识联合。

function getArea(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
```

上面这个例子中，我们的 Shape 即可辨识联合，它是三个接口的联合，

而这三个接口都有一个 kind 属性，且每个接口的 kind 属性值都不相同，能够起到标识作用。

	这里有个 ES7 的新特性：** 运算符，两个*符号组成的这个运算符就是求幂运算符，2 ** 3 ==> 8

看了上面的例子，你可以看到我们的函数内应该包含联合类型中每一个接口的 case。

但是如果遗漏了，我们希望编译器应该给出提示。

所以我们来看下两种完整性检查的方法：

### 利用 strictNullChecks

我们给上面的例子加一种接口：

```typescript
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
interface Triangle {
  kind: "triangle";
  bottom: number;
  height: number;
}
type Shape = Square | Rectangle | Circle | Triangle; 
// 这里我们在联合类型中新增了一个接口，但是下面的case却没有处理Triangle的情况


function getArea(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
```

上面例子中，我们的 Shape 联合有四种接口，但函数的 switch 里只包含三个 case，这个时候编译器并没有提示任何错误，

因为当传入函数的是类型是 Triangle 时，没有任何一个 case 符合，则不会有 return 语句执行，

那么函数是默认返回 undefined。

所以我们可以利用这个特点，结合 strictNullChecks(详见3.4小节) 编译选项，我们可以开启 strictNullChecks，

然后让函数的返回值类型为 number，那么当返回 undefined 的时候，就会报错：

```typescript
function getArea(s: Shape): number {
  // error Function lacks ending return statement and return type does not include 'undefined'
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
```

这种方法简单，但是对旧代码支持不好，

因为strictNullChecks这个配置项是2.0版本才加入的，如果你使用的是低于这个版本的，这个方法并不会有效。

### 使用 never 类型

我们在学习基本类型时学习过，当函数返回一个错误或者不可能有返回值的时候，返回值类型为 never。

所以我们可以给 switch 添加一个 default 流程，当前面的 case 都不符合的时候，会执行 default 后的逻辑：

```typescript
function assertNever(value: never): never {
  throw new Error("Unexpected object: " + value);
}

function getArea(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
      return assertNever(s); // error 类型“Triangle”的参数不能赋给类型“never”的参数
  }
}
```

采用这种方式，需要定义一个额外的 asserNever 函数，

但是这种方式不仅能够在编译阶段提示我们遗漏了判断条件，而且在运行时也会报错。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc2pc1jjzhj318g0a6wgo.jpg">

## This

在 JavaScript 中，this 可以用来获取对全局对象、类实例对象、构建函数实例等的引用，

`在 TypeScript 中，this 也是一种类型`，我们先来看个计算器 Counter 的例子：

```typescript
class Counter {
  constructor(public count: number = 0) {}
  add(value: number) { // 定义一个相加操作的方法
    this.count += value;
    return this;
  }
  subtract(value: number) { // 定义一个相减操作的方法
    this.count -= value;
    return this;
  }
}
let counter = new Counter(10);
console.log(counter.count); // 10
counter.add(5).subtract(2);
console.log(counter.count); // 13
```

我们给 Counter 类定义几个方法，每个方法都返回 this，

这个 this 即指向实例，这样我们就可以通过链式调用的形式来使用这些方法。

这个是没有问题的，

但是如果我们要通过类继承的形式丰富这个 Counter 类，添加一些方法，依然返回 this，然后采用链式调用的形式调用，

在过去版本的 TypeScript 中是有问题的，先来看我们继承的逻辑：

```typescript
class PowCounter extends Counter {
  constructor(public count: number = 0) {
    super(count);
  }
  pow(value: number) { // 定义一个幂运算操作的方法
    this.count = this.count ** value;
    return this;
  }
}

let powCounter = new PowCounter(2);
powCounter
  .pow(3)
  .subtract(3)
  .add(1);
console.log(powCounter.count); // 6
```

我们定义了 PowCounter 类，它继承 Counter 类，新增了 pow 方法用来求值的幂次方，这里我们使用了 ES7 新增的幂运算符`**`。

我们使用 PowCounter 创建了实例 powcounter，它的类型自然是 PowCounter，在该实例上调用继承来的 subtract 和 add 方法。

如果是在过去，就会报错，因为创建实例 powcounter 的类 PowCounter 没有定义这两个方法，所以会报没有这两个方法的错误。

但是在 1.7 版本中增加了 this 类型，TypeScript 会对方法返回的 this 进行判断，就不会报错了。

对于对象来说，对象的属性值可以是一个函数，那么这个函数也称为方法，

在方法内如果访问this，默认情况下是对这个对象的引用，this类型也就是这个对象的字面量类型，如下：

```typescript
let info = {
  name: 'Lison',
  getName () {
      return this.name // "Lison" 这里this的类型为 { name: string; getName(): string; }
  }
}
```

但是如果显式地指定了this的类型，那么this的类型就改变了，如下：

```typescript
let info = {
  name: "Lison",
  getName(this: { age: number }) {
    this; // 这里的this的类型是{ age: number }
  }
};
```

如果我们在 tsconfig.json 里将 noImplicitThis 设为 true，这时候有两种不同的情况：

	如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 
	tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。

1. 对象字面量具有 ThisType<T> 指定的类型，此时 this 的类型为 T，来看例子：

```typescript
type ObjectDescriptor<D, M> = { // 使用类型别名定义一个接口，这里用了泛型，两个泛型变量D和M
  data?: D; // 这里指定data为可选字段，类型为D
  // 这里指定methods为可选字段，类型为M和ThisType<D & M>组成的交叉类型；  
  // ThisType是一个内置的接口，用来在对象字面量中键入this，这里指定this的类型为D & M  
  methods?: M & ThisType<D & M>;  
}

// 这里定义一个mackObject函数，参数desc的类型为ObjectDescriptor<D, M>
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M { 
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  // 这里通过...操作符，将data和methods里的所有属性、方法都放到了同一个对象里返回，这个对象的类型自然就      是D & M，因为他同时包含D和M两个类型的字段  
  return { ...data, ...methods } as D & M; 
}

let obj = makeObject({
  data: { x: 0, y: 0 }, // 这里data的类型就是我们上面定义ObjectDescriptor<D, M>类型中的D
  methods: { // 这里methods的类型就是我们上面定义ObjectDescriptor<D, M>类型中的M
    moveBy(dx: number, dy: number) {
      this.x += dx;  // 所以这里的this是我们通过ThisType<D & M>指定的，this的类型就是D & M
      this.y += dy;
    }
  }
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
``` 

2. 不包含 ThisType<T> 指定的上下文类型，那么此时 this 具有上下文类型，也就是普通的情况。

	你可以试着把上面使用了 ThisType<T> 的例子中，ObjectDescriptor<D, M>类型中指定methods的类型中的 & ThisType<D & M> 去掉，

	你会发现 moveBy 方法中 this.x 和 this.y 报错了，因为此时 this 的类型是methods 这个对象字面量的类型。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc435p12nyj318g088taj.jpg">

## 索引类型

我们这里要讲的，可不是前面讲接口的时候讲的索引类型。

在学习接口内容的时候，我们讲过可以指定索引的类型。

而本小节我们讲的索引类型包含两个内容：索引类型查询和索引访问操作符。

### 索引类型查询操作符

keyof操作符，连接一个类型，会返回一个由这个类型的所有属性名组成的联合类型。

来看例子：

```typescript
interface Info {
  name: string;
  age: number;
}
let infoProp: keyof Info;
infoProp = "name";
infoProp = "age";
infoProp = "no"; // error 不能将类型“"no"”分配给类型“"name" | "age"”
```

通过例子可以看到，这里的keyof Info其实相当于"name" | “age”。

通过和泛型结合使用，TS 就可以检查使用了动态属性名的代码：

```typescript
function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] { 

	// 这里使用泛型，并且约束泛型变量K的类型是"keyof T"，也就是类型T的所有字段名组成的联合类型

  return names.map(n => obj[n]); // 指定getValue的返回值类型为T[K][]，即类型为T的值的属性值组成的数组
}
const info = {
  name: "lison",
  age: 18
};
let values: string[] = getValue(info, ["name"]);
values = getValue(info, ["age"]); // error 不能将类型“number[]”分配给类型“string[]”
```

### 索引访问操作符

索引访问操作符也就是[]，其实和我们访问对象的某个属性值是一样的语法，

但是在 TS 中它可以用来访问某个属性的类型：

```typescript
interface Info {
  name: string;
  age: number;
}
type NameType = Info["name"];
let name: NameType = 123; // error 不能将类型“123”分配给类型“string”
```

再来看个例子：

```typescript
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}
```

这个函数中，两个参数的类型分别为泛型 T 和 K，而函数的返回值类型为T[K]，

只要函数的返回值也是这种形式，即访问参数 o 的参数 name 属性，即可。

最后我们来看个结合接口的例子：

```typescript
interface Obj<T> {
  [key: number]: T;
}
const key: keyof Obj<number>; // keys的类型为number
```

这里需要注意，在讲接口一节时，讲索引类型的时候我们讲过，如果索引类型为 number，那么实现该接口的对象的属性名必须是 number 类型；

但是如果接口的索引类型是 string 类型，那么实现该接口的对象的属性名设置为数值类型的值也是可以的，因为数值最后还是会先转换为字符串。

这里一样，如果接口的索引类型设置为 string 的话，keyof Obj`<number>`等同于类型`number | string`：

```typescript
interface Obj<T> {
  [key: string]: T;
}
let key: keyof Obj<number>; // keys的类型为number | string
key = 123; // right
```

也可以使用访问操作符，获取索引签名的类型：

```typescript
interface Obj<T> {
  [key: string]: T;
}
const obj: Obj<number> = {
  age: 18
};
let value: Obj<number>["age"]; // value的类型是number，也就是name的属性值18的类型
```

还有一点，我们在讲后面知识的时候会遇到，

就是`当tsconfig.json里strictNullChecks设为false时，通过Type[keyof Type]获取到的，`

`是除去never & undefined & null这三个类型之后的字段值类型组成的联合类型`，来看例子：

```typescript
interface Type {
  a: never;
  b: never;
  c: string;
  d: number;
  e: undefined;
  f: null;
  g: object;
}
type test = Type[keyof Type];
// test的类型是string | number | object
```

这个例子中接口 Type 有几个属性，通过索引访问操作符和索引类型查询操作符可以选出类型不为 never & undefined & null 的类型。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc453kf8r7j318g08c0uj.jpg">

## 映射类型

TS 提供了借助旧类型创建一个新类型的方式，也就是映射类型，

它可以用相同的形式去转换旧类型中每个属性。

```typescript
interface Info {
  age: number;
}
```

我们可以使用这个接口实现一个有且仅有一个 age 属性的对象，

但如果我们想再创建一个只读版本的同款对象，那我们可能需要再重新定义一个接口，然后让 age 属性 readonly。

如果接口就这么简单，你确实可以这么做，但是如果属性多了，而且这个结构以后会变，那就比较麻烦了。

这种情况我们可以使用映射类型，下面来看例子：

```typescript
interface Info {
  age: number;
}

type ReadonlyType<T> = { readonly [P in keyof T]: T[P] }; // 这里定义了一个ReadonlyType<T>映射类型,相当于一个映射函数,传入类型后返回一个属性只读的新类型

type ReadonlyInfo = ReadonlyType<Info>; // 创建映射类型的 真实指定类型Info

let info: ReadonlyInfo = {  // 用真实指定类型 创建实例
  age: 18
};
info.age = 28; // error Cannot assign to 'age' because it is a constant or a read-only property
```

这个例子展示了如何通过一个普通的接口创建一个每个属性都只读的接口，

这个过程有点像定义了一个函数，这个函数会遍历传入对象的每个属性并做处理。

同理你也可以创建一个每个属性都是可选属性的接口：

```typescript
interface Info {
  age: number;
}

type ReadonlyType<T> = { readonly [P in keyof T]?: T[P] };

type ReadonlyInfo = ReadonlyType<Info>;
let info: ReadonlyInfo = {};
```

注意了，我们在这里用到了一个新的操作符 in，TS 内部使用了 for … in，定义映射类型，这里涉及到三个部分：

	类型变量，也就是上例中的 P，它就像 for…in 循环中定义的变量，用来在每次遍历中绑定当前遍历到的属性名；
	属性名联合，也就是上例中keyof T，它返回对象 T 的属性名联合；
	属性的结果类型，也就是 T[P]。
	(对象 T, 对象的某一个属性名P, 对象的某一个属性值T[P])

因为这两个需求较为常用，所以 TS `内置了这两种映射类型`，无需定义即可使用，

它们分别是Readonly和Partial。

还有两个内置的映射类型分别是Pick和Record，它们的实现如下：

```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Record<K extends keyof any, T> = { [P in K]: T };
```

先来使用一下 Pick，官方文档的例子并不完整，我们来看完整的例子：

```typescript
interface Info { // 接口
  name: string;
  age: number;
  address: string;
}
const info: Info = { // 接口实体
  name: "lison",
  age: 18,
  address: "beijing"
};

// 也就是从现有的对象所有的属性值中pick几个值
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> { 
  // 这里我们定义一个pick函数，用来返回一个对象中指定字段的值组成的对象
  let res = {} as Pick<T, K>;
  keys.forEach(key => {
    res[key] = obj[key];
  });
  return res;
}
const nameAndAddress = pick(info, ["name", "address"]); // { name: 'lison', address: 'beijing' }
```

另外一个就是 Record，它适用于将一个对象中的每一个属性转换为其他值的场景，来看例子：

```typescript
function mapObject<K extends string | number, T, U>(
  obj: Record<K, T>, // 期望形成的新对象
  f: (x: T) => U // 形成新对象的操作函数
): Record<K, U> {
  let res = {} as Record<K, U>;
  for (const key in obj) {
    res[key] = f(obj[key]); // 一波操作
  }
  return res;
}

const names = { 0: "hello", 1: "world", 2: "bye" };
const lengths = mapObject(names, s => s.length); // { 0: 5, 1: 5, 2: 3 }
// 这里返回了对象中每个属性值有多长
```

我们输入的对象属性值为字符串类型，输出的对象属性值为数值类型。

讲完这四个内置的映射类型之后，我们需要讲一个概念——`同态`。

同态在维基百科的解释是：两个相同类型的代数结构之间的结构保持映射。

这四个内置映射类型中，Readonly、Partial 和 Pick 是同态的，

而 Record 不是，因为 Record 映射出的对象属性值是新的，和输入的值的属性值不同。

### 由映射类型进行推断

我们学习了使用映射类型包装一个类型的属性后，也可以进行逆向操作，也就是拆包，

先来看我们的包装操作：

```typescript
type Proxy<T> = { // 这里定义一个映射类型，他将一个属性拆分成get/set方法
  get(): T;
  set(value: T): void;
};
type Proxify<T> = { [P in keyof T]: Proxy<T[P]> }; 
// 这里再定义一个映射类型，将一个对象的所有属性值类型都变为Proxy<T>处理之后的类型

function proxify<T>(obj: T): Proxify<T> { // 这里定义一个proxify函数，用来将对象中所有属性的属性值改为一个包含get和set方法的对象
  let result = {} as Proxify<T>;
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: value => (obj[key] = value)
    };
  }
  return result;
}


let props = {
  name: "lison",
  age: 18
};
let proxyProps = proxify(props);
console.log(proxyProps.name.get()); // "lison"
proxyProps.name.set("li");
```

我们来看下这个例子，这个例子我们定义了一个函数，

这个函数可以把传入的对象的 每个属性的值 替换为一个包含 get 和 set 两个方法的对象。

最后我们获取某个值的时候，比如 name，就使用 proxyProps.name.get()方法获取它的值，

使用 proxyProps.name.set()方法修改 name 的值。

接下来我们来看如何进行拆包：

```typescript
function unproxify<T>(t: Proxify<T>): T { 
  // 这里我们定义一个拆包函数，其实就是利用每个属性的get方法获取到当前属性值，然后将原本是包含get和set方法的对象改为这个属性值

  let result = {} as T;
  for (const k in t) {
    result[k] = t[k].get(); // 这里通过调用属性值这个对象的get方法获取到属性值，然后赋给这个属性，替换掉这个对象
  }
  return result;
}
let originalProps = unproxify(proxyProps);
```

### 增加或移除特定修饰符

TS 在 2.8 版本为映射类型增加了`增加或移除特定修饰符的能力`，使用+和-符号作为前缀来指定增加还是删除修饰符。

首先来看我们如何通过映射类型为一个接口的每个属性增加修饰符，我们这里使用+前缀：

```typescript
interface Info {
  name: string;
  age: number;
}
type ReadonlyInfo<T> = { +readonly [P in keyof T]+?: T[P] }; 
// 添加readonly修饰符

let info: ReadonlyInfo<Info> = {
  name: "lison"
};
info.name = ""; // error
```

这个例子中，经过 ReadonlyInfo 创建的接口类型，属性是可选的，所以我们在定义 info 的时候没有写 age 属性也没问题，

同时每个属性是只读的，所以我们修改 name 的值的时候报错。

我们通过+前缀增加了 readonly 和?修饰符。

当然，增加的时候，这个+前缀可以省略，也就是说，上面的写法和`type ReadonlyInfo = { readonly [P in keyof T]?: T[P] }`是一样的。

我们再来看下怎么删除修饰符：

```typescript
interface Info {
  name: string;
  age: number;
}
type RemoveModifier<T> = { -readonly [P in keyof T]-?: T[p] };
type InfoType = RemoveModifier<Readonly<Partial<Info>>>;
let info1: InfoType = {
  // error missing "age"
  name: "lison"
};
let info2: InfoType = {
  name: "lison",
  age: 18
};
info2.name = ""; // right, can edit
```

这个例子我们定义了去掉修饰符的映射类型 RemoveModifier，

Readonly<Partial<Info>>则是返回一个 既属性可选 又 只读的 接口类型，所以 InfoType 类型则表示属性必含而且非只读。

TS 内置了一个映射类型Required<T>，使用它可以去掉 T 所有属性的?修饰符。

### keyof 和映射类型在 2.9 的升级

TS 在 2.9 版本中，keyof 和映射类型支持用 number 和 symbol 命名的属性，我们先来看 keyof 的例子：

```typescript
const stringIndex = "a";
const numberIndex = 1;
const symbolIndex = Symbol();
type Obj = {
  [stringIndex]: string;  // 意思为 'a'(属性): string(类型),不过这里是带变量的写法
  [numberIndex]: number;
  [symbolIndex]: symbol;
};
type keys = keyof Obj;
let key: keys = 2; // error
let key: keys = 1; // right
let key: keys = "b"; // error
let key: keys = "a"; // right
let key: keys = Symbol(); // error
let key: keys = symbolIndex; // right
```

再来看个映射类型的例子：

```typescript
const stringIndex = "a";
const numberIndex = 1;
const symbolIndex = Symbol();
type Obj = {
  [stringIndex]: string;
  [numberIndex]: number;
  [symbolIndex]: symbol;
};


type ReadonlyType<T> = { readonly [P in keyof T]?: T[P] };
let obj: ReadonlyType<Obj> = {
  a: "aa",
  1: 11,
  [symbolIndex]: Symbol()
};


obj.a = "bb"; // error Cannot assign to 'a' because it is a read-only property
obj[1] = 22; // error Cannot assign to '1' because it is a read-only property
obj[symbolIndex] = Symbol(); // error Cannot assign to '[symbolIndex]' because it is a read-only property
```

### 元组和数组上的映射类型

TS 在 3.1 版本中，在元组和数组上的映射类型会生成新的元组和数组，并不会创建一个新的类型，

这个类型上会具有 push、pop 等数组方法和数组属性。来看例子：

```typescript
type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };
type Tuple = [number, string, boolean];  // 与下面返回参数类型一一对应
type promiseTuple = MapToPromise<Tuple>;

let tuple: promiseTuple = [ // 在元组和数组上的映射类型会生成新的元组和数组
  new Promise((resolve, reject) => resolve(1)),
  new Promise((resolve, reject) => resolve("a")),
  new Promise((resolve, reject) => resolve(false))
];
```

这个例子中定义了一个MapToPromise映射类型。

它返回一个将传入的类型的所有字段的值转为Promise，且Promise的resolve回调函数的参数类型为这个字段类型。

我们定义了一个元组Tuple，元素类型分别为number、string和boolean，

使用MapToPromise映射类型将这个元组类型传入，并且返回一个promiseTuple类型。

当我们指定变量tuple的类型为promiseTuple后，它的三个元素类型都是一个Promise，且resolve的参数类型依次为number、string和boolean。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc7iw70yfcj318g0ewju9.jpg">

## unkown类型

学习完交叉类型、联合类型、类型断言、映射类型、索引后，我们就可以补充一个基础类型中没有讲的知识了，就是 TS 在 3.0 版本新增的顶级类型 unknown。

它相对于 any 来说是安全的。

关于 unknown 类型，有如下几点需要注意，我们来逐个讲解和举例学习：

1. 任何类型的值都可以赋值给 unknown 类型：

```typescript
let value1: unknown;
value1 = "a";
value1 = 123;
```

2. 如果`没有 类型断言 或 基于控制流的类型细化 时` unknown `不可以赋值给其它类型`，此时它只能赋值给 unknown 和 any 类型：

```typescript
let value2: unknown;
let value3: string = value2; // error 不能将类型“unknown”分配给类型“string”
value1 = value2;
```

3. 如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作：

```typescript
let value4: unknown;
value4 += 1; // error 对象的类型为 "unknown"
```

4. unknown 与任何其它类型组成的交叉类型，最后都等于其它类型：

```typescript
type type1 = unknown & string; // type1 => string
type type2 = number & unknown; // type2 => number
type type3 = unknown & unknown; // type3 => unknown
type type4 = unknown & string[]; // type4 => string[]
```

5. unknown 与任何其它类型组成的`联合类型`，都等于 unknown 类型，但只有any例外，unknown与any组成的联合类型等于any)：

```typescript
type type5 = string | unknown; // type5 => unknown
type type6 = any | unknown; // type6 => any
type type7 = number[] | unknown; // type7 => unknown
```

6. never 类型是 unknown 的子类型：

```typescript
type type8 = never extends unknown ? true : false; // type8 => true
```

7. keyof unknown 等于类型 never：

```typescript
type type9 = keyof unknown; // type9 => never
```

8. 只能对 unknown 进行等或不等操作，不能进行其它操作：

```typescript
value1 === value2;
value1 !== value2;
value1 += value2; // error
```

9. unknown 类型的值不能访问其属性、作为函数调用和作为类创建实例：

```typescript
let value5: unknown;
value5.age; // error
value5(); // error
new value5(); // error
```

10. 使用映射类型时如果遍历的是 unknown 类型，则不会映射任何属性：

```typescript
type Types<T> = { [P in keyof T]: number };
type type10 = Types<any>; // type10 => { [x: string]: number }
type type11 = Types<unknown>; // type10 => {}
```

我们在实际使用中，如果有类型无法确定的情况，要尽量避免使用 any，

`因为 any 会丢失类型信息，一旦一个类型被指定为 any，那么在它上面进行任何操作都是合法的，所以会有意想不到的情况发生。(跟js没差)`

因此如果遇到无法确定类型的情况，要先考虑使用 unknown。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc7jb92oztj318g0cyjts.jpg">

## 条件类型

条件类型是 TS2.8 引入的，从语法上看它像是三元操作符。

它会以一个条件表达式进行类型关系检测，然后在后面两种类型中选择一个，先来看它怎么写：

```typescript
T extends U ? X : Y
```

这个表达式的意思是，如果 T 可以赋值给 U 类型，则是 X 类型，否则是 Y 类型。来看个实际例子：

```typescript
type Type<T> = T extends string ? string : number
let index: Type<'a'> // index的类型为string
let index2: Type<false> // index2的类型为number
```

### 分布式条件类型

当待检测的类型是联合类型，则该条件类型被称为“分布式条件类型”，在实例化时会自动分发成联合类型，来看例子：

```typescript
type TypeName<T> = T extends any ? T : never;
type Type1 = TypeName<string | number>; // Type1的类型是string|number
```

你可能会说，既然想指定 Type1 的类型为 string|number，为什么不直接指定，而要使用条件类型？

其实这只是简单的示范，条件类型可以增加灵活性，再来看个复杂点的例子，这是官方文档的例子：

```typescript
type TypeName<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends undefined
  ? undefined
  : T extends Function
  ? Function
  : object;
type Type1 = TypeName<() => void>; // Type1的类型是Function
type Type2 = TypeName<string[]>; // Type2的类型是object
type Type3 = TypeName<(() => void) | string[]>; // Type3的类型是object | Function
```

我们来看一个分布式条件类型的实际应用：

```typescript
type Diff<T, U> = T extends U ? never : T;
type Test = Diff<string | number | boolean, undefined | number>;
// Test的类型为string | boolean
```

这个例子定义的条件类型的作用就是，找出从 T 中出去 U 中存在的类型，得到剩下的类型。

不过这个条件类型已经内置在 TS 中了，只不过它不叫 Diff，叫 Exclude，我们待会儿会讲到。

来看一个条件类型和映射类型结合的例子：

```typescript
type Type<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type Test = Type<Part>; // Test的类型为"updatePart"
```

来看一下，这个例子中，接口 Part 有四个字段，

其中 updatePart 的值是函数，也就是 Function 类型。

Type的定义中，涉及到映射类型、条件类型、索引访问类型和索引类型。

首先[K in keyof T]用于遍历 T 的所有属性名，

值使用了条件类型，T[K]是当前属性名的属性值，T

[K] extends Function ? K : never表示如果属性值为 Function 类型，则值为属性名字面量类型，否则为 never 类型。

接下来使用keyof T获取 T 的属性名，最后通过索引访问类型[keyof T]获取不为 never 的类型。

(使用映射类型时如果遍历的是 unknown 类型，则不会映射任何属性)

### 条件类型的类型推断-infer

条件类型提供一个infer关键字用来推断类型，我们先来看个例子。

我们想定义一个条件类型，如果传入的类型是一个数组，则返回它元素的类型；

如果是一个普通类型，则直接返回这个类型。

来看下不使用 infer 的话，怎么写：

```typescript
type Type<T> = T extends any[] ? T[number] : T;

type test = Type<string[]>; // test的类型为string
type test2 = Type<string>; // test2的类型为string
```

这个例子中，如果传入 Type 的是一个数组类型，那么返回的类型为T[number]，也就是该数组的元素类型

如果不是数组，则直接返回这个类型。

这里我们是自己通过索引访问类型T[number]来获取类型的，

如果使用 infer 关键字则无需自己手动获取，我们来看下怎么使用 infer：

```typescript
type Type<T> = T extends Array<infer U> ? U : T;
type test = Type<string[]>; // test的类型为string
type test2 = Type<string>; // test2的类型为string
```

这里 infer 能够推断出 U 的类型，并且供后面使用，你可以理解为这里定义了一个变量 U 来接收数组元素的类型。

### TS 预定义条件类型

TS 在 2.8 版本增加了一些`预定义`的有条件类型，来看一下：

Exclude<T, U>，从 T 中去掉可以赋值给 U 的类型：

```typescript
type Type = Exclude<"a" | "b" | "c", "a" | "b">;
// Type => 'c'
type Type2 = Exclude<string | number | boolean, string | number>;
// Type2 => boolean
```

Extract<T, U>，选取 T 中可以赋值给 U 的类型：

```typescript
type Type = Extract<"a" | "b" | "c", "a" | "c" | "f">;
// Type => 'a' | 'c'
type Type2 = Extract<number | string | boolean, string | boolean>;
// Type2 => string | boolean
```

NonNullable，从 T 中去掉 null 和 undefined：

```typescript
type Type = Extract<string | number | undefined | null>;
// Type => string | number
```

ReturnType，获取函数类型返回值类型：

```typescript
type Type = ReturnType<() => string)>
// Type => string
type Type2 = ReturnType<(arg: number) => void)>
// Type2 => void
```

InstanceType，获取构造函数类型的实例类型：

InstanceType直接看例子可能不好理解，所以我们先来看下它的实现：

```typescript
type InstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : any;
```
InstanceType 条件类型要求泛型变量 T 类型是创建实例为 any 类型的构造函数，

而它本身则通过判断 T 是否是构造函数类型来确定返回的类型。

如果是构造函数，使用 infer 可以自动推断出 R 的类型，即实例类型；否则返回的是 any 类型。

看过 InstanceType 的实现后，我们来看怎么使用：

```typescript
class A {
  constructor() {}
}
type T1 = InstanceType<typeof A>; // T1的类型为A
type T2 = InstanceType<any>; // T2的类型为any
type T3 = InstanceType<never>; // T3的类型为never
type T4 = InstanceType<string>; // error
```

上面例子中，T1 的定义中，typeof A返回的的是类 A 的类型，也就是 A，

这里不能使用 A 因为它是值不是类型，类型 A 是构造函数，所以 T1 是 A 构造函数的实例类型，也就是 A；

T2 传入的类型为 any，因为 any 是任何类型的子类型，

所以它满足T extends new (…args: any[]) => infer R，这里 infer 推断的 R 为 any；

传入 never 和 any 同理。

传入 string 时因为 string 不能不给构造函数类型，所以报错。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc7jutj75rj318g0eb416.jpg">



