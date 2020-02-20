# TS basic

参考链接: http://www.imooc.com/read/35/article/341

## 类型断言

虽然 TypeScript 很强大，但有时它还是不如我们了解一个值的类型，

这时候我们更希望 TypeScript 不要帮我们进行类型检查，而是交给我们自己来，所以就用到了类型断言。

类型断言有点像是一种类型转换，它把某个值强行指定为特定类型

```javascript
const getLength = target => {
  if (target.length) {
    return target.length;
  } else {
    return target.toString().length;
  }
};
```

这个函数能够接收一个参数，并返回它的长度，

我们可以传入字符串、数组或数值等类型的值。

如果有 length 属性，说明参数是数组或字符串类型，

如果是数值类型, 它是没有 length 属性的，所以需要把数值类型转为字符串然后再获取 length 值。

---------------------------------------------

现在我们限定传入的值只能是字符串或数值类型的值：

```typescript
const getLength = (target: string | number): number => {
  if (target.length) { // error 报错信息看下方
    return target.length; // error 报错信息看下方
  } else {
    return target.toString().length;
  }
};
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，

我们只能访问此联合类型的所有类型里`共有的属性或方法`，

所以现在加了对参数target和返回值的类型定义之后就会报错：

	// 类型"string | number"上不存在属性"length"
	// 类型"number"上不存在属性"length"

很显然，我们是要做判断的，我们判断如果 target.length 不为 undefined， 说明它是有 length 属性的，

但我们的参数是string | number联合类型，所以在我们开始做判断的时候就会报错。

这个时候就要用类型断言，将tagrget的类型断言成string类型。

它有两种写法，一种是`<type>value`，一种是`value as type`，下面例子中我们用两种形式都写出来：

```typescript
const getStrLength = (target: string | number): number => {
  if ((<string>target).length) { // 这种形式在JSX代码中不可以使用，而且也是TSLint不建议的写法
    return (target as string).length; // 这种形式是没有任何问题的写法，所以建议大家始终使用这种形式
  } else {
    return target.toString().length;
  }
};
```

例子的函数体用到了三次target，

前两次都是访问了 target.length 属性，所以都要用类型断言来表明这个地方是 string 类型；

而最后的 target 调用了 toString方法，因为 number 和 string 类型的值都有 toString 方法，所以没有报错。

	这样虽然没问题了，但是每一处不同值会有不同情况的地方都需要用类型断言，
	后面讲到高级类型的时候会讲如何使用自定义类型保护来简化这里。

注意了，这两种写法都可以，但是 tslint 推荐使用as关键字，而且在 JSX 中只能使用as这种写法。

小结:

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbthteut8lj318g06gmyk.jpg">

也就是说, 当我们不知道一个函数的参数A是什么类型的时候

我们往往需要调用这个参数的自带方法(而非共有)来对其进行辅助判断

但在TS中我们需要使用 联合类型 来对参数A可能的类型范围进行一个限定

但因为 联合类型 限定只能调用这些类型中共有的方法, 而不能调用各自有的方法

我们就需要使用类型断言(`<type> value`，或`value as type`)

使得我们可以调用这个参数自带的方法(而非共有)而不会报错

## 接口

### 基本用法

本小节我们来学习接口，正如题目所说的，你可以使用接口定义几乎任意结构，本小节我们先来学习下接口的基本使用方法。

#### Why Interface?

我们需要定义这样一个函数，

参数是一个对象，

里面包含两个字段：firstName 和 lastName，也就是英文的名和姓，

然后返回一个拼接后的完整名字。

```javascript
// 注：这段代码为纯JavaScript代码，请在JavaScript开发环境编写下面代码，在TypeScript环境会报一些类型错误
const getFullName = ({ firstName, lastName }) => {
  return `${firstName} ${lastName}`;
};

// 使用时传入参数：
getFullName({
  firstName: "Lison",
  lastName: "Li"
}); // => 'Lison Li'
```

目前这里看起来没有问题，我们得到了拼接后的完整名字，

但是使用这个函数的人如果传入一些不是很理想的参数时，就会导致各种结果：

```javascript
getFullName(); // Uncaught TypeError: Cannot destructure property `a` of 'undefined' or 'null'.
getFullName({ age: 18, phone: "13312345678" }); // 'undefined undefined'
getFullName({ firstName: "Lison" }); // 'Lison undefined'
```

这些都是我们不想要的，在开发时难免会传入错误的参数，

所以 TypeScript 能够帮我们在编译阶段就检测到这些错误

```typescript
const getFullName = ({
  firstName,
  lastName,
}: {                      // 指定这个参数的类型，因为他是一个对象，所以这里来指定对象中每个字段的类型
  firstName: string;      // 指定属性名为firstName和lastName的字段的属性值必须为string类型
  lastName: string;
}) => {
  return `${firstName} ${lastName}`;
};
```

我们通过对象字面量的形式去限定我们传入的这个对象的结构，现在再来看下之前的错误调用会出现什么提示：

```typescript
getFullName();                                  // 应有1个参数，但获得0个
getFullName({ age: 18, phone: 123456789 });     // 类型“{ age: number; phone: number; }”
                                                //的参数不能赋给类型“{ firstName: string; lastName: string; }”的参数。
getFullName({ firstName: "Lison" });            // 缺少必要属性lastName
```

这些都是在我们编写代码的时候 TypeScript 提示给我们的错误信息，

这样就避免了在使用函数的时候传入不正确的参数。

但是形如上面 `{
  firstName,
  lastName,
}: {                      // 指定这个参数的类型，因为他是一个对象，所以这里来指定对象中每个字段的类型
  firstName: string;      // 指定属性名为firstName和lastName的字段的属性值必须为string类型
  lastName: string;
}`的写法是十分冗余的

我们需要借助interface来帮助我们做到这一点

减少代码冗余, 提高复用性

#### Rules of Interface

接下来我们用这节课要讲的接口来书写上面的规则，我们使用interface来定义接口：

```typescript
interface Info {
  firstName: string;
  lastName: string;
}
const getFullName = ({ firstName, lastName }: Info) =>
  `${firstName} ${lastName}`;
```

注意在定义接口的时候，你`不要把它理解为是在定义一个对象`，

而要理解为{}括号包裹的是一个代码块，里面是一条条`声明语句`，只不过声明的不是变量的值而是类型。

`声明也不用等号赋值，而是冒号指定类型。`

每条声明之前用换行分隔即可，或者也可以使用分号或者逗号，都是可以的。

----------------------------------

当我们定义一些结构的时候，一些结构对于某些字段的要求是可选的，

有这个字段就做处理，没有就忽略，

所以针对这种情况，typescript为我们提供了可选属性。

我们先定义一个描述传入蔬菜信息的句子的函数：

```typescript
const getVegetables = ({ color, type }) => {
  return `A ${color ? color + " " : ""}${type}`;
};
```

我们可以看到这个函数中根据传入对象中的 color 和 type 来进行描述返回一句话，

color 是可选的，所以我们可以给接口设置可选属性，在属性名后面加个?即可：

```typescript
interface Vegetables {
  color?: string;
  type: string;
}
```

	这里可能 tslint 会报一个警告，告诉我们接口应该以大写的i开头，如果你想关闭这条规则，可以在 tslint.json 的 rules 里添加"interface-name": [true, “never-prefix”]来关闭。

----------------------------------

如果对上面的 getVegetables 函数进行以下调用:

```typescript
getVegetables({
  type: "tomato",
  size: "big" // 'size'不在类型'Vegetables'中
});
```

我们看到，传入的参数没有 color 属性，但也没有错误，因为它是可选属性。

但是我们多传入了一个 size 属性，这同样会报错，TypeScript 会告诉你，接口上不存在你多余的这个属性。

只要接口中没有定义这个属性，就会报错，

但如果你定义了可选属性 size，那么上面的例子就不会报错。

	这里可能 tslint 会报一个警告，告诉我们属性名没有按开头字母顺序排列属性列表，如果你想关闭这条规则，可以在 tslint.json 的 rules 里添加"object-literal-sort-keys": [false]来关闭。

----------------------------------

有时我们并不希望 TypeScript 这么严格地对我们的数据进行检查，

比如我们只需要保证传入getVegetables的对象有type属性就可以了，

至于实际使用的时候传入对象有没有多余的属性，多余属性的属性值是什么类型，这些都无所谓，

那就需要绕开多余属性检查，有如下三个方法：

**使用类型断言**

我们在基础类型中讲过，类型断言就是用来明确告诉 TypeScript，

我们已经自行进行了检查，确保这个类型没有问题，

希望 TypeScript 对此不进行检查，

所以最简单的方式就是使用类型断言：

```typescript
interface Vegetables {
  color?: string;
  type: string;
}
const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};
getVegetables({
  type: "tomato",
  size: 12,
  price: 1.2
} as Vegetables); // 使用类型断言
```

**添加索引签名**

更好的方式是添加字符串索引签名，索引签名我们会在后面讲解，先来看怎么实现：

```typescript
interface Vegetables {
  color: string;
  type: string;
  [prop: string]: any; // 字符串索引签名
}
const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};
getVegetables({
  color: "red",
  type: "tomato",
  size: 12,
  price: 1.2
});
```

**利用类型兼容性**

这种方法现在还不是很好理解，也是不推荐使用的，先来看写法：

```typescript
interface Vegetables {
  type: string;
}
const getVegetables = ({ type }: Vegetables) => {
  return `A ${type}`;
};

const option = { type: "tomato", size: 12 };   // 设置一个中间变量来接受对象
getVegetables(option);                         // 而不是直接把对象传入函数中
```

上面这种方法完美通过检查，

我们将对象字面量赋给一个变量option，然后getVegetables传入 option，这时没有报错。

是因为`直接将对象字面量传入函数`，和`先赋给变量再将变量传入函数`，这两种检查机制是不一样的，

后者是因为类型兼容性, 我们后面会有专门一节来讲类型兼容性。

简单地来说：如果 b 要赋值给 a，那要求 b 至少需要与 a 有相同的属性，多了无所谓。

---------------------------------

接口也可以设置只读属性，如下：

```typescript
interface Role {
  readonly 0: string;
  readonly 1: string;
}
```

这里我们定义了一个角色字典，有 0 和 1 两种角色 id。

下面我们定义一个实际的角色 数据，然后来试图修改一下它的值：

```typescript
const role: Role = {
  0: "super_admin",
  1: "admin"
};
role[1] = "super_admin"; // Cannot assign to '0' because it is a read-only property
```

我们看到 TypeScript 告诉我们不能分配给索引0，因为它是只读属性。

设置一个值只读，我们是否想到ES6里定义常量的关键字const？

使用const定义的常量定义之后不能再修改，这有点只读的意思。

那readonly和const在使用时该如何选择呢？

这主要看你这个值的用途，如果是定义一个`常量`，那用`const`，

如果这个值是作为`对象的属性`，那请用`readonly`。

```typescript
// const 
const NAME: string = "Lison";
NAME = "Haha"; // Uncaught TypeError: Assignment to constant variable

const obj = {
  name: "lison"
};
obj.name = "Haha";

// readonly
interface Info {
  readonly name: string;
}
const info: Info = {
  name: "Lison"
};
info["name"] = "Haha"; // Cannot assign to 'name' because it is a read-only property
```

我们可以看到上面使用const定义的常量NAME定义之后再修改会报错，

但是如果使用const定义一个对象，然后修改对象里属性的值是不会报错的。

所以如果我们要保证对象的属性值不可修改，需要使用readonly。

---------------------------------

接口可以描述普通对象，还可以描述函数类型，我们先看写法：

```typescript
interface AddFunc {
  (num1: number, num2: number): number;
}
```

这里我们定义了一个AddFunc结构，

这个结构要求实现这个结构的值，必须包含一个和结构里定义的函数`一样参数`、`一样返回值`的方法，

或者这个值就是符合这个函数要求的函数。

我们管花括号里包着的内容为调用签名，它由带有参数类型的参数列表和返回值类型组成。

后面学到类型别名一节时我们还会学习其他写法。

```typescript
// 如何使用函数
const add: AddFunc = (n1, n2) => n1 + n2;
const join: AddFunc = (n1, n2) => `${n1} ${n2}`; // 报错: 不能将类型'string'分配给类型'number'
add("a", 2); // 报错: 类型'string'的参数不能赋给类型'number'的参数
```

上面我们定义的add函数接收两个数值类型的参数，返回的结果也是数值类型，所以没有问题。

而join函数参数类型没错，但是返回的是字符串，所以会报错。

而当我们调用add函数时，传入的参数如果和接口定义的类型不一致，也会报错。

你应该注意到了，实际定义函数的时候，名字是无需和接口中参数名相同的，只需要位置对应即可。

小结:

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbumwz67bvj318g0msae1.jpg">


### 高阶用法

---------------------------------

索引类型

我们可以使用 接口描述`索引的类型` 和 通过索引得到的`值的类型`，

比如一个数组[‘a’, ‘b’]，数字索引0对应的通过索引得到的值为’a’。

我们可以 同时给 索引 和 值 都设置类型

```typescript
interface RoleDic {
  [id: number]: string;  // 我们可以 同时给 索引 和 值 都设置类型
}
const role1: RoleDic = {
  0: "super_admin",
  1: "admin"
};
const role2: RoleDic = {
  s: "super_admin",  // error 不能将类型"{ s: string; a: string; }"分配给类型"RoleDic"。
  a: "admin"
};
const role3: RoleDic = ["super_admin", "admin"];
```

上面的例子中 role3 定义了一个数组，索引为数值类型，值为字符串类型。

你也可以给索引设置`readonly`，从而防止索引返回值被修改。

```typescript
interface RoleDic {
  readonly [id: number]: string;
}
const role: RoleDic = {
  0: "super_admin"
};
role[0] = "admin"; // error 类型"RoleDic"中的索引签名仅允许读取
```

这里有的点需要注意，你可以设置索引类型为 number。

但是这样如果你将属性名设置为字符串类型，则会报错；

但是如果你设置索引类型为`字符串类型`，那么即便你的属性名设置的是`数值类型，也没问题`。

因为 JS 在访问属性值的时候，`如果属性名是数值类型，会先将数值类型转为字符串，然后再去访问。(自动类型转换)`

```javascript
const obj = {
  123: "a", // 这里定义一个数值类型的123这个属性
  "123": "b" // 这里在定义一个字符串类型的123这个属性，(ts中这里会报错：标识符“"123"”重复?)。
};

// 数值类型 被转换为 字符串类型
console.log(obj); // { '123': 'b' }
```

如果数值类型的属性名不会转为字符串类型，那么这里数值123和字符串'123'是不同的两个值，则最后对象obj应该同时有这两个属性；

但是实际打印出来的obj只有一个属性，属性名为字符串"123"，而且值为"b"，

说明数值类型属性名123被覆盖掉了，就是因为它被转为了字符串类型属性名"123"；

又因为一个对象中多个相同属性名的属性，定义在后面的会覆盖前面的，

所以结果就是obj只保留了后面定义的属性值。

---------------------------------

继承接口

接口可以继承，这和类一样，这提高了接口的可复用性。

下面我们定义一个Vegetables接口，它会对color属性进行限制。

再定义两个接口，一个为Tomato，一个为Carrot，这两个类都需要对color进行限制，

而各自又有各自独有的属性限制

```typescript
interface Vegetables {
  color: string;
}
interface Tomato {
  color: string;
  radius: number;
}
interface Carrot {
  color: string;
  length: number;
}
```

三个接口中都有对color的定义，但是这样写很繁琐，所以我们可以用继承来改写：

```typescript
interface Vegetables {
  color: string;
}
interface Tomato extends Vegetables {  // 继承
  radius: number;
}
interface Carrot extends Vegetables {  // 继承
  length: number;
}


const tomato: Tomato = {
  radius: 1.2 // error  Property 'color' is missing in type '{ radius: number; }'
};
const carrot: Carrot = {
  color: "orange",
  length: 20
};
```

上面定义的 tomato 变量因为缺少了从Vegetables接口继承来的 color 属性，从而报错。

一个接口可以被多个接口继承，同样，`一个接口也可以继承多个接口`，多个接口用逗号隔开。

比如我们再定义一个Food接口，Tomato 也可以继承 Food：

```typescript
nterface Vegetables {
  color: string;
}
interface Food {
  type: string;
}

interface Tomato extends Food, Vegetables { // 一个接口也可以继承多个接口
  radius: number;
}

const tomato: Tomato = {
  type: "vegetables",
  color: "red",
  radius: 1.2
};  // 在定义tomato变量时将继承过来的color和type属性同时声明
```

---------------------------------

混合类型接口

JS 的类型是灵活的。

在 JS 中，函数是对象类型。

对象可以有属性，所以有时我们的一个对象，它既是一个函数，也包含一些属性。

比如我们要实现一个计数器函数，比较直接的做法是定义一个函数和一个全局变量：

```javascript
let count = 0;
const countUp = () => count++;
```

但是这种方法需要在函数外面定义一个变量，更优一点的方法是使用闭包：

```javascript
// javascript
const countUp = (() => {
  let count = 0;
  return () => {
    return ++count;
  };
})();
console.log(countUp()); // 1
console.log(countUp()); // 2
```

在 TypeScript3.1 版本之前，我们需要借助命名空间来实现。

但是在 3.1 版本，TypeScript 支持直接给函数添加属性，虽然这在 JS 中早就支持了：

```javascript
// javascript
let countUp = () => {
  return ++countUp.count;
};
countUp.count = 0;      // 直接给函数添加属性
console.log(countUp()); // 1
console.log(countUp()); // 2
```

我们可以看到，我们把一个函数赋值给countUp，

又给它绑定了一个属性count，我们的计数保存在这个 count 属性中。

我们可以在TS中使用混合类型接口来指定上面例子中 countUp 的类型：

```typescript
interface Counter {
  (): void; // 这里定义Counter这个结构必须包含一个函数，函数的要求是无参数，返回值为void，即无返回值
  count: number; // 而且这个结构还必须包含一个名为count、值的类型为number类型的属性
}

const getCounter = (): Counter => { // 这里定义一个函数用来返回这个计数器 这里的定义是 getCounter 函数返回值类型为Counter
  const c = () => { // 定义一个函数，逻辑和前面例子的一样
    c.count++;
  };
  c.count = 0; // 再给这个函数添加一个count属性初始值为0
  return c; // 最后返回这个函数对象
};


const counter: Counter = getCounter(); // 通过getCounter函数得到这个计数器
counter();
console.log(counter.count); // 1
counter();
console.log(counter.count); // 2
```

上面的例子中，getCounter函数返回值类型为Counter，

Counter的实例c是一个函数，无返回值，即返回值类型为void，

它还包含一个属性count，属性返回值类型为number。

---------------------------------

小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbv11i1ziqj318g0crdi8.jpg">

## 函数

本小节我们来学习函数类型的定义，以及对函数参数的详细介绍。

在本小节你将学习三种定义函数类型的方式，

以及关于参数的三个知识——即可选参数、默认参数和剩余参数。

### 函数类型

---------------------------------
为函数定义类型

我们可以给函数定义类型，

这个定义包括对参数和返回值的类型定义

```typescript
function add(arg1: number, arg2: number): number {
  return x + y;
}

// 或者
const add = (arg1: number, arg2: number): number => {
  return x + y;
};
```

在上面的例子中我们用function和箭头函数两种形式定义了add函数，以展示如何定义函数类型。

这里参数 arg1 和 arg2 都是数值类型，最后通过相加得到的结果也是数值类型。

如果在这里省略参数的类型，TypeScript 会默认这个参数是 any 类型；

如果省略返回值的类型，如果函数无返回值，那么 TypeScript 会默认函数返回值是 void 类型；

如果函数有返回值，那么 TypeScript 会根据我们定义的逻辑推断出返回类型。

---------------------------------
完整的函数类型

一个函数的定义包括函数名、参数、逻辑和返回值。

我们为一个函数定义类型时，完整的定义应该包括参数类型和返回值类型。

上面的例子中，我们都是在定义函数的 指定参数类型 和 返回值类型。

接下来我们看下，如何定义一个完整的函数类型，

以及用这个函数类型来规定一个函数定义时 参数 和 返回值 需要符合的类型。

```typescript
let add: (x: number, y: number) => number; // 完整定义函数 add 的类型

add = (arg1: number, arg2: number): number => arg1 + arg2; // 为 add 赋值
add = (arg1: string, arg2: string): string => arg1 + arg2; // error, 类型不匹配
```

上面这个例子中，我们首先定义了一个变量 add，给它指定了函数类型，

也就是(x: number, y: number) => number，这个函数类型包含参数和返回值的类型。

然后我们给 add 赋了一个实际的函数，这个函数参数类型和返回类型都和函数类型中定义的一致，所以可以赋值。

后面我们又给它赋了一个新函数，而这个函数的参数类型和返回值类型都是 string 类型，这时就会报如下错误：

    不能将类型"(arg1: string, arg2: string) => string"分配给类型"(x: number, y: number) => number"。
      参数"arg1"和"x" 的类型不兼容。
      不能将类型"number"分配给类型"string"。

注意: 函数中如果使用了 函数体之外 定义的变量，这个变量的类型是 不体现在 函数类型定义的。

---------------------------------
使用接口定义函数类型

我们在前面的小节中已经学习了接口，使用接口可以清晰地定义函数类型。

还拿上面的 add 函数为例，我们为它使用接口定义函数类型：

```typescript
interface Add {
  (x: number, y: number): number;
}

let add: Add = (arg1: string, arg2: string): string => arg1 + arg2; 
// error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
```

这里我们通过接口的形式定义函数类型，

这个接口Add定义了这个结构是一个函数，两个参数类型都是number类型，返回值也是number类型。

然后我们指定变量add类型为Add时，再要给add赋值，就必须是一个函数，且参数类型和返回值类型都要满足接口Add，

显然例子中这个函数并不满足条件，所以报错了。

---------------------------------
使用类型别名

我们可以使用类型别名来定义函数类型，类型别名我们在后面讲到高级类型的时候还会讲到。

使用类型别名定义函数类型更直观易读，我们来看一下具体的写法：

```typescript
type Add = (x: number, y: number) => number; // 类型别名

let add: Add = (arg1: string, arg2: string): string => arg1 + arg2; 
// error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
```

使用`type`关键字可以为原始值、联合类型、元组以及任何我们定义的类型起一个别名。

上面定义了 Add 这个别名后，Add就成为了一个和 `(x: number, y: number) => number` 一致的类型定义。

例子中定义了Add类型，指定add类型为Add，但是给add赋的值并不满足Add类型要求，所以报错了。

### 参数

---------------------------------
可选参数

TypeScript 会帮我们在 编写代码的时候 就检查出调用函数时参数中存在的一些错误，先看下面例子：

```typescript
type Add = (x: number, y: number) => number;
let add: Add = (arg1: string, arg2: string): string => arg1 + arg2;

add(1, 2); // right
add(1, 2, 3); // error 应有 2 个参数，但获得 3 个
add(1); // error 应有 2 个参数，但获得 1 个
```

而如果是在 JS 中，上面例子中最后两个函数调用都不会报错, 只不过add(1, 2, 3)可以返回正确结果3，add(1)会返回NaN。

但有时候，我们的函数有些参数不是必须的，是可选的。

在学习接口的时候我们学习过，可选参数只需在参数名后跟随一个?即可。

但是接口形式的定义和今天学到的函数类型定义有一点区别，那就是参数位置的要求：

    接口形式定义的函数类型 必选参数 和 可选参数 的位置前后是无所谓的，
    但是今天学到的定义形式，可选参数必须放在必选参数后面，
    这和在 JS 中定义函数是一致的。

来看下面的例子： 

```typescript
type Add = (x?: number, y: number) => number; // error 必选参数不能位于可选参数后。
```

在TypeScript中，可选参数放到最后才行，上面例子中把可选参数x放到了必选参数y前面，所以报错了；

但是在 JavaScript 中，其实是没有可选参数这个概念的，

只不过是我们在写逻辑的时候，我们可能会判断某个参数是否为undefined，如果是则说明调用该函数的时候没有传这个参数，要做下 兼容处理；

而如果几个参数中，前面的参数是可不传的，后面的参数是需要传的，就需要在该可不传的参数位置传入一个 undefined 占位才行。

---------------------------------
默认参数

在 ES6 标准出来之前，我们的默认参数实现起来比较繁琐：

```javascript
// javascript
var count = 0;
function countUp(step) {
  step = step || 1;
  count += step;
}
```

上面我们定义了一个计数器增值函数，

这个函数有一个参数 step，即每次增加的步长，

如果不传入参数，那么 step 接受到的就是 undefined，undefined 转换为布尔值是 false，

所以step || 1这里取了 1，从而达到了不传参数默认 step === 1 的效果。

在 ES6 中，我们定义函数时给参数设默认值就很方便了，直接在参数后面使用等号连接默认值即可：

```javascript
// javascript
const count = 0;
const countUp = (step = 1) => {
  count += step;
};
```

你会发现，可选参数和带默认值的参数在函数调用时都是可以不传实参的，

`但是区别在于定义函数的时候，可选参数必须放在必选参数后面，而带默认值的参数则可放在必须参数前后都可。`

当我们为参数指定了默认参数的时候，TypeScript 会识别默认参数的类型；

当我们在调用函数时，如果给这个带默认值的参数传了别的类型的参数则会报错：

```typescript
const add = (x: number, y = 2) => { // ts 识别 y 为number类型
  return x + y;
};
add(1, "a"); // error 类型"string"的参数不能赋给类型"number"的参数
```

当然了，你也可以显式地给 y 设置类型：

```typescript
const add = (x: number, y: number = 2) => {
  return x + y;
};
```

---------------------------------
剩余参数

在 JS 中，如果我们定义一个函数，这个函数可以输入任意个数的参数，

那么我们就无法在定义参数列表的时候挨个定义。

在 ES6 发布之前，我们需要用到 arguments 来获取参数列表。

arguments 是每一个函数都包含的一个类数组对象，它包含在函数调用时传入函数的所有实际参数（简称实参），

它还包含一个 length 属性，记录参数个数。

来看下面的例子，我们来模拟实现函数的重载：

```javascript
// javascript
function handleData() {
  // 使用 arguments 决定返回值

  if (arguments.length === 1) return arguments[0] * 2;
  else if (arguments.length === 2) return arguments[0] * arguments[1];
  else return Array.prototype.slice.apply(arguments).join("_");
}

handleData(2); // 4
handleData(2, 3); // 6
handleData(1, 2, 3, 4, 5); // '1_2_3_4_5'

// 这段代码如果在TypeScript环境中，三个对handleData函数的调用都会报错，因为handleData函数定义的时候没有参数。
```

上面这个函数通过判断传入实参的个数，做出不同的处理并返回结果。

else 后面的逻辑是如果实参个数不为 1 和 2，那么将这些参数拼接成以`"_"`连接的字符串。

    你应该注意到了我们使用Array.prototype.slice.apply(arguments)对 arguments 做了处理，
    前面我们讲过 arguments 不是数组，而是 类数组对象，
    如果直接在 arguments 调用 join 方法，它是没有这个方法的
    所以我们通过这个处理得到一个包含 arguments 中所有元素的真实数组。

在 ES6 中，加入了"…"拓展运算符，它可以将一个函数或对象进行拆解。

它还支持用在函数的参数列表中，用来处理任意数量的参数：

```javascript
const handleData = (arg1, ...args) => {
  // 这里省略逻辑
  console.log(args);
};
handleData(1, 2, 3, 4, 5); // [ 2, 3, 4, 5 ]
```

可以看到，args 是除了 arg1 之外的所有实参的集合，它是一个数组。

    补充："…"运算符可以拆解数组和对象，

    比如：arr1 = [1, 2]，arr2 = [3, 4]，那么[…arr1, …arr2]的结果就是[1, 2, 3, 4]，

    他还可以用在方法的参数中：如果使用 arr1.push(arr2)，则 arr1 结果是[1, 2, [3, 4]]，
    如果你想让他们合并成一个数组而不使用 concat 方法，就可以使用 arr1.push(…arr2)。

    还有对象的使用方法：obj1 = { a: ‘aa’ }，obj2 = { b: ‘bb’ }，则{ …obj1, …obj2 }的结果是{ a: ‘aa’, b: ‘bb’ }。

在 TypeScript 中你可以使用"…"拓展运算符来获取剩余参数, 并为剩余参数指定类型，先来看例子：

```typescript
const handleData = (arg1: number, ...args: number[]) => { //为剩余参数指定类型
  //
};
handleData(1, "a"); // error 类型"string"的参数不能赋给类型"number"的参数
```

### 函数重载，此重载vs彼重载

在其他一些强类型语言中，函数重载是指定义几个函数名相同，但参数个数或类型不同的函数，

在调用时传入不同的参数，编译器会自动调用适合的函数。

但是 JavaScript 作为一个动态语言是没有函数重载的，只能我们自己在函数体内通过判断参数的个数、类型来指定不同的处理逻辑。

来看个简单的例子：

```javascript
const handleData = value => {
  if (typeof value === "string") {
    return value.split("");
  } else {
    return value
      .toString()
      .split("")
      .join("_");
  }
};
```

这个例子中，当传入的参数为字符串时，将它进行切割，

比如传入的是’abc’，返回的将是数组[‘a’, ‘b’, ‘c’]；

如果传入的是一个数值类型，则将数字转为字符串然后切割成单个数字然后拼接成字符串，

比如传入的是123，则返回的是’1_2_3’。

你可以看到传入的参数类型不同，返回的值的类型是不同的，

`在 TypeScript 中有函数重载的概念`，但并不是定义几个同名实体函数，然后根据不同的参数个数或类型来自动调用相应的函数。T

ypeScript的函数重载是在类型系统层面的，是为了更好地进行类型推断。

TypeScript的函数重载通过为一个函数指定多个函数类型定义，从而对函数调用的返回值进行检查。来看例子：

```typescript
function handleData(x: string): string[]; // 这个是重载的一部分，指定当参数类型为string时，返回值为string类型的元素构成的数组
function handleData(x: number): string; // 这个也是重载的一部分，指定当参数类型为number时，返回值类型为string

function handleData(x: any): any { // 这个就是重载的内容了，他是实体函数，不算做重载的部分
  if (typeof x === "string") {
    return x.split("");
  } else {
    return x
      .toString()
      .split("")
      .join("_");
  }
}

handleData("abc").join("_");
handleData(123).join("_"); // error 类型"string"上不存在属性"join"
handleData(false); // error 类型"boolean"的参数不能赋给类型"number"的参数。
```

首先我们使用function关键字定义了两个同名的函数，

但不同的是，函数没有实际的函数体逻辑，而是只定义函数名、参数及参数类型以及函数的返回值类型；

而第三个使用function定义的同名函数，是一个完整的实体函数，包含函数名、参数及参数类型、返回值类型和函数体；

这三个定义组成了一个函数 —— 完整的带有类型定义的函数，

前两个function定义的就称为函数重载，而第三个function并不算重载；

    然后我们来看下匹配规则，
    当调用这个函数并且传入参数的时候，会从上而下 在函数重载里 匹配 和这个参数个数 和 类型匹配 的重载。

    如例子中第一个调用，传入了一个字符串"abc"，它符合第一个重载，
    所以它的返回值应该是一个字符串组成的数组，
    数组是可以调用join方法的，所以这里没问题；

    第二个调用传入的是一个数值类型的123，从上到下匹配重载是符合第二个的，
    返回值应该是字符串类型。
    但这里拿到返回值后调用了数组方法join，这肯定会报错了，因为字符串无法调用这个方法；

    最后调用时传入了一个布尔类型值false，匹配不到重载，所以会报错；

`最后还有一点要注意的是，这里重载只能用 function 来定义，不能使用接口、类型别名等。`

小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbw66dymw3j318g0owdlm.jpg">

## 范型

在前面的小节中我们学习了any类型，当我们要表示一个值可以为任意类型的时候，则指定它的类型为any

```typescript
const getArray = (value: any, times: number = 5): any[] => {
  return new Array(times).fill(value);
};
```

这个函数接受两个参数。第一个参数为任意类型的值，第二个参数为数值类型的值，默认为 5。

函数的功能是返回一个以 times 为元素个数，每个元素都是 value 的数组。

这个函数我们从逻辑上可以知道，传入的 value 是什么类型，那么返回的数组的每个元素也应该是什么类型。

接下来我们实际用一下这个函数：

```typescript
getArray([1], 2).forEach(item => {
  console.log(item.length);
});
getArray(2, 3).forEach(item => {
  console.log(item.length);
});
```

    我们调用了两次这个方法，
    使用 forEach 方法遍历得到的数组，
    在传入 forEach 的函数中获取当前遍历到的数组元素的 length 属性。

    第一次调用这个方法是没问题的，因为我们第一次传入的值为数组，得到的会是一个二维数组[ [1], [1] ]。
    每次遍历的元素为[1]，它也是数组，所以打印它的 length 属性是可以的。

    而我们第二次传入的是一个数字 2，生成的数组是[2, 2, 2]，
    访问 2 的 length 属性是没有的，所以应该报错，但是这里却不会报错(编写代码的时候)，
    因为我们在定义getArray函数的时候，指定了返回值是any类型的元素组成的数组，
    所以这里遍历其返回值中每一个元素的时候，类型都是any，所以不管做任何操作都是可以的，

    因此，上面例子中第二次调用getArray的返回值每个元素应该是数值类型，遍历这个数组时我们获取数值类型的length属性也没报错，
    因为这里item的类型是any。
    (这样就跟js没啥区别了, 编写代码的时候不会有任何错误提示)

所以要解决这种情况，泛型就可以搞定，接下来我们来学习泛型。

### 简单使用

要解决上面这个场景的问题，就需要使用泛型了。

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

还拿上面这个例子中的逻辑来举例，我们既要允许传入任意类型的值，又要正确指定返回值类型，就要使用泛型。

我们先来看怎么改写：

```typescript
const getArray = <T>(value: T, times: number = 5): T[] => { // 泛型
  return new Array(times).fill(value);
};
```

我们在定义函数之前，使用<>符号定义了一个泛型变量 T，

这个 T 在这次函数定义中就代表某一种类型，它可以是基础类型，也可以是联合类型等高级类型。

定义了泛型变量之后，你在函数中任何需要指定类型的地方使用 T 都代表这一种类型。

比如当我们传入 value 的类型为数值类型，那么返回的数组类型T[]就表示number[]。

现在我们再来调用一下这个 getArray 函数：

```typescript
getArray<number[]>([1, 2], 3).forEach(item => {
  console.log(item.length);
});

getArray<number>(2, 3).forEach(item => {
  console.log(item.length); // error: 类型“number”上不存在属性“length”
});
```

我们在调用 getArray 的时候，在方法名后面使用<>传入了我们的泛型变量 T 的类型number[]，

那么在定义 getArray 函数时使用 T 指定类型的地方，都会使用number[]指定。

但是你也可以省略这个`<number[]>`，TypeScript 会根据你传入函数的 value 值的类型进行推断：

```typescript
getArray(2, 3).forEach(item => {  // 不指定范型类型, 进行类型推断
  console.log(item.length); // 类型“number”上不存在属性“length”
});
```

### 泛型变量

当我们使用泛型的时候，你`必须`在处理类型涉及到泛型的数据的时候，`把这个数据当做任意类型来处理`。

这就意味着`不是所有类型都能做的操作 不能做，不是所有类型都能调用的方法 不能调用。`

也就是说, 这时候只能调用所有类型共有的方法和属性, 不能调用它们但独有的

```typescript
const getLength = <T>(param: T): number => {
  return param.length; // error 类型“T”上不存在属性“length”
};
```

当我们获取一个类型为泛型的变量 param 的 length 属性值时，

如果 param 的类型为数组 Array 或字符串 string 类型是没问题的，它们有 length 属性。

但是如果此时传入的 param 是数值 number 类型，那这里就会有问题了。

这里的T并不是固定的，你可以写为A、B或者其他名字，而且还可以在一个函数中定义多个泛型变量。

```typescript
const getArray = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
  return new Array(times).fill([param1, param2]);
};

getArray(1, "a", 3).forEach(item => {
  console.log(item[0].length); // error 类型“number”上不存在属性“length”
  console.log(item[1].toFixed(2)); // error 属性“toFixed”在类型“string”上不存在
});
```

这个例子中，我们定义了两个泛型变量T和U。

第一个参数的类型为 T，第二个参数的类型为 U，

最后函数返回一个二维数组，函数返回类型我们指定是一个元素类型为[T, U]的数组。

所以当我们调用函数，最后遍历结果时，遍历到的每个元素都是一个 第一个元素是数值类型、第二个元素是字符串类型的数组。

### 泛型函数类型

我们可以定义一个泛型函数类型，

还记得我们之前学习函数一节时，给一个函数定义函数类型，

现在我们可以使用泛型定义函数类型：

```typescript
// ex1: 简单定义
const getArray: <T>(arg: T, times: number) => T[] = (arg, times) => { // 前半拉 (arg: T, times: number) => T[] 是函数类型, 后半拉(arg, times) => {...是函数实体
  return new Array(times).fill(arg);
};

// ex2: 使用类型别名
type GetArray = <T>(arg: T, times: number) => T[];                     // 函数类型
const getArray: GetArray = <T>(arg: T, times: number): T[] => {        // 函数实体
  return new Array(times).fill(arg);
};
```

当然了，我们也可以使用接口的形式来定义泛型函数类型：

```typescript
interface GetArray {
  <T>(arg: T, times: number): T[];           // 接口中描述函数的写法 ():类型
}

const getArray: GetArray = <T>(arg: T, times: number): T[] => {  // 为接口中的函数赋值
  return new Array(times).fill(arg);
};
```

你还可以把接口中泛型变量提升到接口最外层，这样接口中所有属性和方法都能使用这个泛型变量了。

我们先来看怎么用：

```typescript
interface GetArray<T> {                // 泛型变量提升到接口最外层
  (arg: T, times: number): T[];
  tag: T;
}

const getArray: GetArray<number> =      // 在定义的时候我们就可以指定范型变量的类型
  <T>(arg: T, times: number): T[] => {

    // error 不能将类型“{ <T>(arg: T, times: number): T[]; tag: string; }”分配给类型“GetArray<number>”。
    // 属性“tag”的类型不兼容。

    return new Array(times).fill(arg);
  };

getArray.tag = "a"; // 不能将类型“"a"”分配给类型“number”
getArray("a", 1); // 不能将类型“"a"”分配给类型“number”
```

上面例子中将泛型变量定义在接口最外层，

所以不仅函数的类型中可以使用 T，在属性 tag 的定义中也可以使用。

但在使用接口的时候，要在接口名后面`明确传入一个类型`，也就是这里的`GetArray<number>`，

那么后面的 arg 和 tag 的类型都得是 number 类型。

当然了，如果你还是希望 T 可以是任何类型，你可以把`GetArray<number>`换成`GetArray<any>`。

### 泛型约束

当我们使用了泛型时，就意味着这个这个类型是任意类型。

但在大多数情况下，我们的逻辑是对特定类型处理的。

还记得我们前面讲泛型变量时举的那个例子 —— 

当访问一个泛型类型的参数的 length 属性时，会报错"类型“T”上不存在属性“length”"，是因为并不是所有类型都有 length 属性。

所以我们在这里应该对 T 有要求，那就是类型为 T 的值应该包含 length 属性。

说到这个需求，你应该能想到接口的使用，我们可以使用接口定义一个对象必须有哪些属性：

```typescript
interface ValueWithLength {
  length: number;
}
const v: ValueWithLength = {}; 
// error Property 'length' is missing in type '{}' but required in type 'ValueWithLength'
```

泛型约束 就是使用一个类型和extends对泛型进行约束，之前的例子就可以改为下面这样：

```typescript
interface ValueWithLength {
  length: number;
}
const getLength = <T extends ValueWithLength>(param: T): number => { // 泛型约束 <范型>(参数):返回类型 => {函数体}
  return param.length;
}

getLength("abc"); // 3
getLength([1, 2, 3]); // 3
getLength({ length: 3 }); // 3
getLength(123); // error 类型“123”的参数不能赋给类型“ValueWithLength”的参数
```

这个例子中，泛型变量T受到约束。

它必须满足接口ValueWithLength，也就是`不管它是什么类型，但必须有一个length属性，且类型为数值类型。`

例子中后面四次调用getLength方法，传入了不同的值，传入字符串"abc"、数组[1, 2, 3]和一个包含length属性的对象{ length: 3 }都是可以的，

但是传入数值123不行，因为它没有length属性。

### 在泛型约束中使用类型参数

当我们定义一个对象，想要对只能访问对象上存在的属性做要求时，该怎么办？

先来看下这个需求是什么样子：

```typescript
const getProps = (object, propName) => {
  return object[propName];
};

const obj = { a: "aa", b: "bb" };
getProps(obj, "c"); // undefined
```

当我们访问这个对象的’c’属性时，这个属性是没有的。

这里我们需要用到`索引类型keyof`结合泛型来实现对这个问题的检查。

索引类型在高级类型一节会详细讲解，这里你只要知道这个例子就可以了：

```typescript
const getProp = <T, K extends keyof T>(object: T, propName: K) => { // 索引类型keyof, K 被约束成 只能是 T 上的属性
  return object[propName];
};

const obj = { a: "aa", b: "bb" };
getProp(obj, "c"); // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数
```

这里我们使用变量K来继承索引类型keyof T，

你可以理解为keyof T相当于一个由泛型变量T的属性名构成的联合类型，在这里 K 就被约束为了只能是"a"或"b"，

所以当我们传入字符串"c"想要获取对象obj的属性"c"时就会报错。

小结

当我们 传入函数/指定接口 的 参数类型 是灵活任意的，又要在 函数/接口体 和 函数返回值 中准确使用该类型信息时，就需要使用`泛型`来关联类型信息

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gbx3axvz6pj318g0ifadr.jpg">

## TS中的类

虽然说类是 ES6 中新增的概念，

但是在这里讲 TS 中的类，

是因为在语法的实现上 TS 和 ES6 中的类还是有点区别。

### 基础

现在我们先来看下在 TS 中定义类的一个简单例子：

```typescript
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return `(${this.x}, ${this.y})`;
  }
}

const point = new Point(1, 2);
```

我们首先在定义类的代码块的顶部定义两个实例属性，并且指定类型为 number 类型。

构造函数 constructor 需要传入两个参数，都是 number 类型，并且把这两个参数分别赋值给两个实例属性。

最后定义了一个定义在类的原型对象上的方法 getPosition。

同样你也可以使用继承来复用一些特性：

```typescript
class Parent {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Child extends Parent {
  constructor(name: string) {
    super(name);                   // 调用父类的构造函数
  }
}
```

这些和 ES6 标准中的类没什么区别

### 修饰符

在 ES6 标准类的定义中，默认情况下，定义在实例的属性和方法会在创建实例后添加到实例上；

而如果是定义在类里没有定义在 this 上的方法，实例可以继承这个方法；

而如果使用 static 修饰符定义的属性和方法，是静态属性和静态方法，实例是没法访问和继承到的；

我们还通过一些手段，实现了私有方法，但是私有属性的实现还不好实现。

接下来我们来看下 TS 中的公共、私有和受保护的修饰符：

----------------------------------
public

public表示公共的，用来指定在创建实例后 可以通过实例访问的，也就是类定义的 外部可以访问的属性和方法。

默认是 public，但是 TSLint 可能会要求你必须用修饰符来表明这个属性或方法是什么类型的。

```typescript
class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public getPosition() {
    return `(${this.x}, ${this.y})`;
  }
}
```

----------------------------------
private

private修饰符表示私有的，它修饰的属性在类的定义 外面是没法访问的：

```typescript
class Parent {
  private age: number;           // 私有属性
  constructor(age: number) {
    this.age = age;
  }
}
const p = new Parent(18);
console.log(p);               // { age: 18 }
console.log(p.age);           // error 属性“age”为私有属性，只能在类“Parent”中访问
console.log(Parent.age);      // error 类型“typeof ParentA”上不存在属性“age”

class Child extends Parent {
  constructor(age: number) {
    super(age);
    console.log(super.age);    // error 通过 "super" 关键字只能访问基类的公共方法和受保护方法
  }
}
```

这里你可以看到，age 属性使用 private 修饰符修饰，说明他是私有属性，

我们打印创建的实例对象 p，发现他是有属性 age 的，

但是当试图访问 p 的 age 属性时，编译器会报错，告诉我们私有属性只能在类 Parent 中访问。

这里我们需要特别说下 super.age 这里的报错，

我们在之前学习 ES6 的类的时候，讲过在不同类型的方法里 super 作为对象代表着不同的含义，

这里在 constructor 中访问 super，这的 super 相当于父类本身，

这里我们看到使用 private 修饰的属性，在子类中是没法访问的。

----------------------------------
protected

protected修饰符是受保护修饰符，和private有些相似，但有一点不同，

protected修饰的成员在继承该类的子类中可以访问，我们再来看下上面那个例子，

把父类 Parent 的 age 属性的修饰符 private 替换为 protected：

```typescript
class Parent {
  protected age: number;          // protected属性
  constructor(age: number) {
    this.age = age;
  }
  protected getAge() {            // protected方法
    return this.age;
  }
}
const p = new Parent(18);
console.log(p.age);                // error 属性“age”为私有属性，只能在类“ParentA”中访问, 实例中也不能访问
console.log(Parent.age);           // error 类型“typeof ParentA”上不存在属性“age”, 在外面也不能访问protected

class Child extends Parent {
  constructor(age: number) {
    super(age);
    console.log(super.age);        // undefined ? 只有在继承该类的子类中可以访问
    console.log(super.getAge());
  }
}

new Child(18)
```

protected还能用来修饰 constructor 构造函数，

加了protected修饰符之后，这个类就`不能再用来创建实例，只能被子类继承，`

这个需求我们在讲 ES6 的类的时候讲过，需要用new.target来自行判断，而 TS 则只需用 protected 修饰符即可：

```typescript
class Parent {
  protected constructor() {
    //
  }
}
const p = new Parent();           // error 类“Parent”的构造函数是受保护的，仅可在类声明中访问

class Child extends Parent {      // 只能被子类继承
  constructor() {
    super();
  }
}
const c = new Child();
```

### readonly 修饰符

在类里可以使用readonly关键字将属性设置为只读。

```typescript
class UserInfo {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const user = new UserInfo("Lison");
user.name = "haha";                   // error Cannot assign to 'name' because it is a read-only property
```

设置为只读的属性，实例只能读取这个属性值，但不能修改。

### 参数属性

之前的例子中，我们都是在类的定义的顶部初始化实例属性，在 constructor 里接收参数然后对实力属性进行赋值，

我们可以使用参数属性来简化这个过程。

参数属性简单来说就是在 constructor 构造函数的参数前面加上访问限定符，

也就是前面讲的 public、private、protected 和 readonly 中的任意一个，

我们来看例子：

```typescript
class A {
  constructor(name: string) {}  // 这里没有自动初始化name属性
}
const a = new A("aaa");
console.log(a.name);      // error 类型“A”上不存在属性“name”

class B {
  constructor(public name: string) {}         // 此时即为 name 声明了参数属性, 简化了初始化属性的流程, 不需要再单独声明该属性
}
const b = new B("bbb");
console.log(b.name); // "bbb"
```

可以看到，在定义类 B 时，构造函数有一个参数 name，

这个 name 使用访问修饰符 public 修饰，此时即为 name 声明了参数属性，也就无需再显示地在类中初始化这个属性了。

### 静态属性

和 ES6 的类一样，

在 TS 中一样使用static关键字来指定属性或方法是静态的， `实例将不会添加这个静态属性，也不会继承这个静态方法，`

你可以使用修饰符和 static 关键字来指定一个属性或方法：

```typescript
class Parent {
  public static age: number = 18;
  public static getAge() {
    return Parent.age;
  }
  constructor() {
    //
  }
}
const p = new Parent();
console.log(p.age); // error Property 'age' is a static member of type 'Parent' 实例将不会添加这个静态属性
console.log(Parent.age); // 18 但是原来的父类 是有这个静态属性的
```

如果使用了 private 修饰道理和之前的一样：

```typescript
class Parent {
  public static getAge() {
    return Parent.age;
  }
  private static age: number = 18;
  constructor() {
    //
  }
}
const p = new Parent();
console.log(p.age); // error Property 'age' is a static member of type 'Parent' 实例将不会添加这个静态属性
console.log(Parent.age); // error 属性“age”为私有属性，只能在类“Parent”中访问。
```

### 可选类属性

TS 在 2.0 版本，支持可选类属性，也是使用?符号来标记，来看例子：

```typescript
class Info {
  name: string;
  age?: number;         // 可选类属性
  constructor(name: string, age?: number, public sex?: string) { // 可选类属性(参数)
    this.name = name;
    this.age = age;
  }
}
const info1 = new Info("lison"); // 可忽略age参数
const info2 = new Info("lison", 18);
const info3 = new Info("lison", 18, "man");
```

### 存取器

这个也就 ES6 标准中的存值函数和取值函数，

也就是在设置属性值的时候调用的函数，和在访问属性值的时候调用的函数，(get/set)

用法和写法和 ES6 的没有区别：

```typescript
class UserInfo {
  private _fullName: string;
  constructor() {}
  get fullName() {  // 取值函数,针对某个属性
    return this._fullName;
  }
  set fullName(value) { // 存值函数,针对某个属性
    console.log(`setter: ${value}`);
    this._fullName = value;
  }
}
const user = new UserInfo();
user.fullName = "Lison Li"; // "setter: Lison Li"  这里是存值的时候自动调用
console.log(user.fullName); // "Lison Li" 这里是取值的时候自动调用
```

### 抽象类

`抽象类`一般用来被其他类继承，`而不直接用它创建实例`。

抽象类 和 类 内部定义 抽象方法，使用abstract关键字，我们先来看个例子：

```typescript
abstract class People {                           // 抽象类
  constructor(public name: string) {}
  abstract printName(): void;                     // 抽象方法
}

class Man extends People {
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  printName() {
    console.log(this.name);
  }
}

const m = new Man(); // error 应有 1 个参数，但获得 0 个

const man = new Man("lison");
man.printName(); // 'lison'

const p = new People("lison"); // error 无法创建抽象类的实例
```

上面例子中我们定义了一个抽象类 People，

在抽象类里我们定义 constructor 方法必须传入一个字符串类型参数，并把这个 name 参数值绑定在创建的实例上；

使用abstract关键字定义一个抽象方法 printName，

这个定义可以指定参数，指定参数类型，指定返回类型。

`当我们直接使用抽象类 People 实例化的时候，就会报错，我们只能创建一个继承抽象类的子类，使用子类来实例化。`

我们再来看个例子：

```typescript
abstract class People {                          // 抽象类
  constructor(public name: string) {}
  abstract printName(): void;                    // 抽象方法
}

class Man extends People {
  // error 非抽象类“Man”不会实现继承自“People”类的抽象成员"printName"
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  // 这里相比上面缺少了对父类 抽象方法 的定义
}

const m = new Man("lison");
m.printName(); // error m.printName is not a function
```

通过上面的例子我们可以看到，`在抽象类里定义的抽象方法，在子类中是不会继承的，所以在子类中必须实现该方法的定义。`

2.0 版本开始，abstract关键字`不仅可以标记类和类里面的方法，还可以标记类中定义的 属性 和 存取器 `：

```typescript
abstract class People {
  abstract _name: string;                     // 抽象属性
  abstract get insideName(): string;          // 抽象存取器
  abstract set insideName(value: string);     // 抽象存取器
}
class Pp extends People {
  _name: string;
  insideName: string;
}
```

`但是要记住，抽象方法和抽象存取器都不能包含实际的代码块。`

只能用于声明有这个方法, 不能给方法实体

### 实例类型

当我们定义一个类，并创建实例后，这个实例的类型就是创建他的类：

```typescript
class People {
  constructor(public name: string) {}
}
let p: People = new People("lison");
```

当然了，创建实例的时候这`指定 p 的类型为 People 并不是必须的`，TS 会`推断出他的类型`。

虽然指定了类型，但是`当我们再定义一个和 People 类同样实现的类 Animal，并且创建实例赋值给 p 的时候，是没有问题的`：

```typescript
class Animal {
  constructor(public name: string) {}
}

// 在p已经指定好是People类型的前提下
let p = new Animal("lark");
```

所以，如果你想实现 `对创建实例的类的判断`，还是需要用到`instanceof`关键字。

### 对前面跳过知识的补充

现在我们把之前因为没有学习类的使用，所以暂时跳过的内容补回来。

---------------------------
类类型接口

使用`接口`可以`强制一个类的定义必须包含某些内容`，先来看个例子：

```typescript
interface FoodInterface {
  type: string;
}

class FoodClass implements FoodInterface {          // 使用接口可以强制一个类的定义必须包含某些内容
  // error Property 'type' is missing in type 'FoodClass' but required in type 'FoodInterface'
  static type: string;
  constructor() {}
}
```

上面接口 FoodInterface 要求使用该接口的值必须有一个 type 属性，

定义的类 FoodClass 要使用接口，需要使用关键字implements

implements关键字用来指定一个类要继承的接口，

如果是接口和接口、类和类直接的继承，使用extends，

如果是类继承接口，则用implements。

有一点需要注意，`接口检测的是 使用该接口定义的类 创建的实例`，

所以上面例子中虽然定义了静态属性 type，但静态属性不会添加到实例上，所以还是报错，所以我们可以这样改：

```typescript
interface FoodInterface {
  type: string;
}
class FoodClass implements FoodInterface {
  constructor(public type: string) {}              // 属性需要添加到实例上
}
```

当然这个需求你也可以使用本节课学习的抽象类实现：

```typescript
abstract class FoodAbstractClass {               // 抽象类代替接口
  abstract type: string;
}
class Food extends FoodAbstractClass {
  constructor(public type: string) {
    super();
  }
}
```

---------------------------
接口继承类

接口可以继承一个类，

当接口继承了该类后，会继承类的成员，但是不包括其实现，也就是只继承成员以及成员类型。

接口还会继承类的private和protected修饰的成员，

当接口继承的这个类中包含这两个修饰符修饰的成员时，这个接口只可被这个类或他的子类实现。

```typescript
class A {
  protected name: string;
}
interface I extends A {}     // 接口可以继承一个类

class B implements I {} // error Property 'name' is missing in type 'B' but required in type 'I'
class C implements I {
  // error 属性“name”受保护，但类型“C”并不是从“A”派生的类
  name: string;
}
class D extends A implements I {
  getName() {
    return this.name;
  }
}
```

---------------------------
在泛型中使用类类型

这里我们先来看个例子：

```typescript
const create = <T>(c: { new (): T }): T => { // c的类型是 Info ??  为啥不写c:T
  return new c();  // 返回实例
};

class Info {
  age: number;
}

create(Info).age;
create(Info).name; // error 类型“Info”上不存在属性“name”
```

在这个例子里，我们创建了一个 create 函数，传入的参数是一个类，返回的是一个类创建的实例，这里有几个点要讲：

    参数 c 的类型定义中，new()代表调用类的构造函数，

    他的类型也就是类创建实例后的实例的类型。
    
    return new c()这里使用 传进来的类 c 创建一个实例并返回，

    返回的实例类型也就是函数的返回值类型。

所以通过这个定义，TS 就知道，调用 create 函数，传入的和返回的值都应该是同一个类类型。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc0fy2uqfmj313h0u0gs7.jpg">

修饰符总结:
      
                      通过实例访问           在子类中访问         直接访问(类的定义外直接)       能否被修改      用于修饰constructor后   

    public(默认):          可                   可                    可                     可           子类中直接调用super
    private:             不可                  不可                  不可                    可          ?没有特殊说明,一般不这么干?
    protected:           不可                   可                   不可                    可      父类不能再用来创建实例，只能被子类继承
    readonly:             可                   可                    可                    不可         ?没有特殊说明,一般不这么干?

属性性质总结:

    static(父类专用):    实例将不会添加这个静态属性，也不会继承这个静态方法   但静态属性可以在类的定义外直接访问  属性性质优先级高于修饰符(两者都出错时,会报属性性质的错)

    abstract(空壳,仅用于继承):  抽象类一般用来被其他类继承，而不直接用它创建实例(会报错) 在抽象类里定义的抽象方法名，在子类中是不会继承的，所以在子类中必须实现该方法的定义(也就是子类中必须实现该方法的实体并且写有这个方法,不单独声明这个方法是不会自动继承的) 抽象方法和抽象存取器都不能包含实际的代码块,也就是只能是个空壳





