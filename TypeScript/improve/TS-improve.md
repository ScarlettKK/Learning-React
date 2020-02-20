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


