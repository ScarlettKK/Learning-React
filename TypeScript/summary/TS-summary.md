# TS-summary 知识整合

## 使用模块封装代码

TypeScript 在 1.5 版本之前，有内部模块和外部模块的概念，

从 1.5 版本开始，内部模块改称作命名空间（我们下个小节会讲），外部模块改称为模块。

TypeScript 和 ES6 保持一致，包含顶级 import 或 export 的文件都被当成一个模块，

则里面定义的内容仅模块内可见，而不是全局可见。

TypeScript 的模块除了遵循 ES6 标准的模块语法外，还有一些特定语法，用于类型系统兼容多个模块格式，下面我们来开始学习 TypeScript 模块。

### export

TypeScript 中，仍然使用 export 来导出声明，

而且能够导出的不仅有变量、函数、类，还包括 TypeScript 特有的类型别名和接口。

```typescript
// funcInterface.ts
export interface Func {
  (arg: number): string;
}
export class C {
  constructor() {}
}
class B {}
export { B };
export { B as ClassB };
```

上面例子中，你可以使用 export 直接导出一个声明，

也可以先声明一个类或者其它内容，然后使用 export {}的形式导出，

也可以使用 as 来为导出的接口换个名字再导出一次。

你也可以像 ES6 模块那样`重新导出`一个模块

也就是 export 一个引入内容，也可以重新导出部分内容，也可以重命名重新导出：

```typescript
// main.ts
export * from "./moduleB";
// main.ts
export { name } from "./moduleB";
// main.ts
export { name as nameProp } from "./moduleB";
```

### import

接下来我们来看导出的模块怎么引入，依然是使用 import：

```typescript
// main.ts
import { name } from "./moduleB";
// main.ts
import * as info from "./moduleB";
//main.ts
import { name as nameProp } from "./moduleB";
```

同样，可以使用 import 直接接模块名或文件路径，进行具有副作用的导入：

```typescript
import "./set-title.ts";
```

### export default

同样在 TypeScript 中使用 export default 默认导出，这个和 ES6 一样：

```typescript
// moduleB.ts
export default "lison";

// main.ts
import name from "./moduleB.ts";
console.log(name); // 'lison'
```

### export = 和 import = require()

TypeScript可以将代码编译为CommonJS、AMD或其它模块系统代码，同时会生成对应的声明文件。

我们知道CommonJS和AMD两种模块系统语法是不兼容的，

所以TypeScript为了兼容这两种语法，使得我们编译后的声明文件同时支持这两种模块系统，

增加了`export =`(专用导出)和`import xx = require()`(专用导入)两个语句。

当我们想要导出一个模块时，可以使用export =来导出：

```typescript
// moduleC.ts
class C {}
export = C;
```

然后使用这个形式导出的模块，必须使用import xx = require()来引入：

```typescript
// main.ts
import ClassC = require("./moduleC");
const c = new ClassC();
```

`如果你的模块不需要同时支持这两种模块系统，可以不使用export =来导出内容。`

### 相对和非相对模块导入

根据引入模块的路径是相对还是非相对，模块的导入会以不同的方式解析：

	相对导入是以./或../开头的，./表示当前目录，而../表示当前目录的上一级目录。以下面的文件目录为例：

src
 ╠═ module
 ║    ╠═ moduleA.ts
 ║    ╚═ moduleB.ts
 ╚═ core
      ╚═ index.ts

以上面的文件目录为例，

我们如果在 index.ts 中引入两个模块，和在 moduleA 模块中引入 moduleB 是这样的：

```typescript
// moduleA.ts
import moduleB from "./moduleB.ts"; 
// 这里在moduleA.ts文件里引入同级的moduleB.ts文件，所以使用./表示moduleA.ts文件当前所在路径


// index.ts
import moduleA from "../module/moduleA.ts";
import moduleB from "../module/moduleB"; // 这里省略了.ts后缀也可以
```

当我们引用模块文件的时候省略了 .ts 后缀也是可以的，这就涉及到一个模块解析策略。

我们以上面例子中这个 ../module/moduleB 为例，编译器在解析模块引用的时候，如果遇到省略后缀的情况，

1. 会依次查找以该名称为文件名的.ts、.tsx、.d.ts文件；

2. 
如果没找到package.json文件或者types字段，则会将 moduleB 当做文件夹去查找，如果它确实是文件夹，将会在这个文件夹下依次查找 index.ts、index.tsx、index.d.ts。 

3. 如果还没找到，会在上面例子中 module 文件夹的上级文件夹继续查找，查找规则和前面这些顺序一致。

`除了这两种符号开头的路径，都被当做非相对路径。`

非相对模块的导入可以相对于 baseUrl，也可以通过路径映射，还可以解析为外部模块。

关于模块解析的更多配置，我们会在后面章节介绍，这里我们主要学习语法。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc8ow2g5pkj318g0f7q5i.jpg">

## 使用命名空间封装代码

命名空间在 1.5 之前的版本中，是叫做“内部模块”。

在 1.5 版本之前，ES6 模块还没正式成为标准，所以 TS 对于模块的实现，是将模块分为“内部模块”和“外部模块”两种。

内部模块使用module来定义，而外部模块使用export来指定哪个内容对外部可见。

1.5 版本开始，使用“命名空间”代替“内部模块”说法，并且使用 namespace 代替原有的 module关键字，而“外部 模块”则改为“模块”。

命名空间(同一个程序内部, 可能做了文件拆分, 但程序逻辑上是一个整体, 相当于把一个程序中共用的相同的重复部分抽取出来)

的作用与使用场景和

模块(工具库, 引入使用)

还是有区别的：

	当我们是在程序 内部 用于 防止全局污染，想把相关的内容都放在一起的时候，使用命名空间；
	当我们 封装了一个工具或者库，要适用于模块系统中 引入使用时，适合使用模块。

### 定义和使用

命名空间的定义实际相当于定义了一个大的对象，里面可以定义变量、接口、类、方法等等，

但是如果不使用export 关键字指定此内容要对外可见的话，外部是没法访问到的。

来看下怎么写，我们想要把所有涉及到内容验证的方法都放到一起，文件名叫 validation.ts：

```typescript
namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/; // 这里定义一个正则

  export const isNumberReg = /^[0-9]+$/; // 这里再定义一个正则，与isLetterReg的区别在于他使用export导出了

  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}
```

我们创建了一个命名空间叫做 Validation，它里面定义了三个内容，两个正则表达式，

但是区别在于 isLetterReg 没有使用 export 修饰，而 isNumberReg 使用了 export 修饰。

最后一个函数，也是用了 export 修饰。

这里要说明一点的是，命名空间在引入的时候，

如果是使用 tsc 命令行编译文件，比如是在index.ts文件使用这个命名空间，先直接像下面这样写：

```typescript
// index.ts

/// <reference path="validation.ts"/>

let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;

console.log(isLetter);
console.log(reg);
```

来解释下，命名空间如果不是使用 webpack 等工具编译，而是使用 tsc 编译，

那只需要在使用外部命名空间的地方使用`/// <reference path=“namespace.ts”/>`来引入，

注意三斜线 ”///“ 开头，然后在 path 属性指定相对于当前文件，这个命名空间文件的路径。

然后编译时，需要指定一个参数outFile，这个参数来制定输出的文件名：

```
tsc --outFile src/index.js src/index.ts
```

–outFile 用来指定输出的文件路径和文件名，最后指定要编译的文件。

还有一点要注意，使用 outFile 只支持amd和system两种模块标准，所以需要在tsconfig.json里，设置 module 编译选项。

来看下编译后的文件 index.js：

```javascript
var Validation;
(function(Validation) {
  var isLetterReg = /^[A-Za-z]+$/;
  Validation.isNumberReg = /^[0-9]+$/;
  Validation.checkLetter = function(text) {
    return isLetterReg.test(text);
  };
})(Validation || (Validation = {}));
/// <reference path="namespace.ts"/>
var isLetter = Validation.checkLetter("sdfsd");
var reg = Validation.isNumberReg;
console.log(isLetter);
console.log(reg);
```

可以看到，编译后的 JS 文件将命名空间定义的文件 Validation.ts 文件的内容和 index.ts 的内容合并到了最后输出的文件。

如果我们要在 webpack 等工具中开发项目，并时时运行，

如果只通过`/// <reference path=“Validation.ts”/>`来引入命名空间，你会发现运行起来之后，浏览器控制台会报 Validation is not defined 的错误。

所以如果是要在项目中时时使用，需要使用 export 将命名空间导出，其实就是作为模块导出，然后在 index.ts 中引入，先来看 Validation.ts 文件：

```typescript
// webpack 写法
export namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/;
  export const isNumberReg = /^[0-9]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}
```

然后在 index.ts 文件中引入并使用：

```typescript
// webpack 写法
import { Validation } from "./Validation.ts";
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;
console.log(isLetter); // true
console.log(reg); // /^[0-9]+$/
```

	这里要提醒大家的是，命名空间本来就是防止变量污染，
	但是模块也能起到这个作用，而且使用模块还可以自己定义引入之后的名字。
	所以，并不建议导出一个命名空间，这种情况你应该是用模块。

### 拆分为多个文件

随着内容不断增多，我们可以将同一个命名空间拆成多个文件分开维护，

尽管分成了多个文件，但它们仍然是同一个命名空间。

下面我们将 Validation.ts 拆开成 LetterValidation.ts 和 NumberValidation.ts：

```typescript
// LetterValidation.ts
namespace Validation {
  export const isLetterReg = /^[A-Za-z]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}

// NumberValidation.ts
namespace Validation {
  export const isNumberReg = /^[0-9]+$/;
  export const checkNumber = (text: any) => {
    return isNumberReg.test(text);
  };
}

// index.ts
/// <reference path="./LetterValidation.js"/>
/// <reference path="./NumberValidation.js"/>
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;
console.log(isLetter); // true
```

我们使用命令行来编译一下：

```
tsc --outFile src/index.js src/index.ts
```

最后输出的 index.js 文件是这样的：

```typescript
var Validation;
(function(Validation) {
  Validation.isLetterReg = /^[A-Za-z]+$/;
  Validation.checkLetter = function(text) {
    return Validation.isLetterReg.test(text);
  };
})(Validation || (Validation = {}));
var Validation;
(function(Validation) {
  Validation.isNumberReg = /^[0-9]+$/;
  Validation.checkNumber = function(text) {
    return Validation.isNumberReg.test(text);
  };
})(Validation || (Validation = {}));
/// <reference path="./LetterValidation.ts"/>
/// <reference path="./NumberValidation.ts"/>
var isLetter = Validation.checkLetter("sdfsd");
var reg = Validation.isNumberReg;
console.log(isLetter); // true
```

可以看到，我们使用 reference 引入的两个命名空间都被编译在了一个文件，而且是按照引入的顺序编译的。

我们先引入的是 LetterValidation，所以编译后的 js 文件中，LetterValidation 的内容在前面。

而且看代码可以看出，两个验证器最后都合并到了一起，所以 Validation 对象有两个正则表达式，两个方法。

### 别名

我们使用 `import` 给常用的对象起一个别名，

但是要注意，这个别名和类型别名不是一回事，而且`这儿的 import 也只是为了创建别名不是引入模块`。

来看怎么使用，这是官方文档的原始例子：

```typescript
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Squaire {}
  }
}

import polygons = Shapes.Polygons; // 使用 import 关键字给 Shapes.Polygons 取一个别名polygons
let sq = new polygons.Square();
```

通过这个例子我们可以看到，使用 import 关键字来定义命名空间中某个输出元素的别名，可以减少我们深层次获取属性的成本。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc8q2bwf1mj318g0frn0y.jpg">

## 对声明合并的爱与恨

声明合并是指 TypeScript 编译器会将名字相同的多个声明合并为一个声明，合并后的声明同时拥有多个声明的特性。

我们知道在 JavaScrip 中，使用var关键字定义变量时，定义相同名字的变量，后面的会覆盖前面的值。

使用let 定义变量和使用 const 定义常量时，不允许名字重复。

在 TypeScript 中，接口、命名空间是可以多次声明的，最后 TypeScript 会将多个同名声明合并为一个。

我们下来看个简单的例子：

```typescript
interface Info {
    name: string
}
interface Info {
    age: number
}
let info: Info

info = { // error 类型“{ name: string; }”中缺少属性“age”
    name: 'lison'
}
info = { // right
    name: 'lison',
    age: 18
}
```

可以看到，我们定义了两个同名接口Info，每个接口里都定义了一个必备属性，

最后定义info类型为Info时，info的定义要求同时包含name和age属性。

这就是声明合并的简单示例，接下来我们详细学习。

### 补充知识

TypeScript的所有声明概括起来，会创建这三种实体之一：命名空间、类型和值：

	命名空间的创建实际是创建一个对象，对象的属性是在命名空间里export导出的内容；

	类型的声明是创建一个类型并赋给一个名字；

	值的声明就是创建一个在JavaScript中可以使用的值。

下面这个表格会清晰的告诉你，每一种声明类型会创建这三种实体中的哪种，

先来说明一下，第一列是指声明的内容，每一行包含4列，表明这一行中，第一列的声明类型创建了后面三列哪种实体，

打钩即表示创建了该实体：

声明类型	              创建了命名空间  创建了类型	 创建了值
Namespace			          √		           √
Class		                           √	   √
Enum		                           √	   √
Interface		                       √	
Type Alias类型别名		               √	
Function			                           √
Variable			                           √

说明: 创建了类型 就是可以 var a: type, 只创建了值就不行

可以看到，只有命名空间创建了命名空间这种实体。

Class、Enum两个，Class即是实际的值也作为类使用，Enum编译为JavaScript后也是实际值，而且我们讲过，一定条件下，它的成员可以作为类型使用；

Interface和类型别名是纯粹的类型；

而Funciton和Variable只是创建了JavaScript中可用的值，不能作为类型使用，

注意这里Variable是变量，不是常量，常量是可以作为类型使用的。

### 合并接口

我们在本节课一开始的例子中，简单示范了一下接口声明的合并，下面我们来补充一些内容。

多个同名接口，定义的`非函数的成员命名应该是不重复的`，如果重复了，`类型应该是相同的`，否则将会报错。

```typescript
interface Info {
    name: string
}
interface Info {
    age: number
}
interface Info {
    age: boolean // error 后续属性声明必须属于同一类型。属性“age”的类型必须为“number”，但此处却为类型“boolean”
}
```

对于函数成员，`每个同名函数成员都会被当成这个函数的重载`，且合并时`后面的接口具有更高的优先级`。

来看下多个同名函数成员的例子：

```typescript
interface Res {
    getRes(input: string): number
}
interface Res {
    getRes(input: number): string
}

const res: Res = {
    getRes: (input: any): any => {
        if (typeof input === 'string') return input.length
        else return String(input)
    }
}
res.getRes('123').length // error 类型“number”上不存在属性“length”
```

### 合并命名空间

同名命名空间最后会将多个命名空间导出的内容进行合并，如下面两个命名空间：

```typescript
namespace Validation {
    export const checkNumber = () => {}
}
namespace Validation {
    export const checkString = () => {}
}
```

上面定义两个同名命名空间，效果相当于：

```typescript
namespace Validation {
    export const checkNumber = () => {}
    export const checkString = () => {}
}
```

在命名空间里，有时我们并不是把所有内容都对外部可见，对于没有导出的内容，在其它同名命名空间内是无法访问的：

```typescript
namespace Validation {
    const numberReg = /^[0-9]+$/
    export const stringReg = /^[A-Za-z]+$/
    export const checkString = () => {}
}

namespace Validation {
    export const checkNumber = (value: any) => {
        return numberReg.test(value) // error 找不到名称“numberReg”
    }
}
```

上面定义的两个命名空间，numberReg没有使用export导出，所以在第二个同名命名空间内是无法使用的，

如果给 const numberReg 前面加上 export，就可以在第二个命名空间使用了。

### 不同类型合并

命名空间分别和类、函数、枚举都可以合并，下面我们来一一说明：

------------------------
命名空间和类

这里要求 同名的类 和 命名空间 在定义的时候，类的定义必须在命名空间前面，

最后合并之后的效果，一个包含一些`以命名空间导出内容为静态属性的类`，来看例子：

```typescript
class Validation {
    checkType() { }
}
namespace Validation {
    export const numberReg = /^[0-9]+$/
    export const stringReg = /^[A-Za-z]+$/
    export const checkString = () => { }
}
namespace Validation {
    export const checkNumber = (value: any) => {
        return numberReg.test(value)
    }
}

console.log(Validation.prototype) // { checkType: fun () {} }
console.log(Validation.prototype.constructor) 
/**
{
    checkNumber: ...
    checkString: ...
    numberReg: ...
    stringReg: ...
}
*/
```

------------------------
命名空间和函数

在JavaScript中，函数也是对象，所以可以给一个函数设置属性，在TypeScript中，就可以通过声明合并实现。

但同样要求，函数的定义要在同名命名空间前面，我们再拿之前讲过的计数器的实现来看下，如何利用声明合并实现计数器的定义：

```typescript
function countUp () {
    countUp.count++
}
namespace countUp {
    export let count = 0
}

countUp()
countUp()
console.log(countUp.count) // 2
```

------------------------
命名空间和枚举

可以通过命名空间和枚举的合并，为枚举拓展内容，枚举和同名命名空间的先后顺序是没有要求的，来看例子：

```typescript
enum Colors {
    red,
    green,
    blue
}
namespace Colors {
    export const yellow = 3
}


console.log(Colors)
/*
{
    0: "red",
    1: "green",
    2: "blue",
    red: 0,
    green: 1,
    blue: 2,
    yellow: 3 
}
*/
```

通过打印结果你可以发现，虽然我们使用命名空间增加了枚举的成员，但是最后输出的值只有key到index的映射，没有index到key的映射。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc8qpst95aj318g0fkn04.jpg">

## 混入，兼顾值和类型的合并操作

混入即把两个对象或者类的内容，混合起来，从而实现一些功能的复用。

如果你使用过 Vue，你应该知道 Vue 的 mixins 这个 api，它可以允许你将一些抽离到对象的属性、方法混入到一些组件。

接下来我们先来看看个在 JavaScript 中实现的简单混入：

```javascript
class A {
  constructor() {}
  funcA() {
    console.log("here");
  }
}
class B {
  constructor() {}
  funcB() {}
}

const mixin = (target, from) => { // 这里定义一个函数来将一个类混入到目标类
  Object.getOwnPropertyNames(from).forEach(key => { 
  	// 通过Object.getOwnPropertyNames可以获取一个对象自身定义的而非继承来的属性名组成的数组
    target[key] = from[key]; 
    // 将源类原型对象上的属性拿来添加到目标类的原型对象上
  });
};

mixin(B.prototype, A.prototype); // 传入两个类的原型对象
const b = new B();
b.funcA(); // here
```

我们通过Object.getOwnPropertyNames方法获取一个对象自身的属性，

这里自身指除去继承的属性，获取到属性后将属性赋值给目标对象。

这是 JavaScript 中的简单混入，

在 TypeScript 中我们知道，除了值还有类型的概念，所以简单地将属性赋值到目标元素是不行的，

还要处理类型定义，我们来看下 TypeScript 中混入的例子：

```typescript
class ClassAa {
  isA: boolean;
  funcA() {}
}
class ClassBb {
  isB: boolean;
  funcB() {}
}

// 定义一个类类型接口AB，我们在讲类的时候补充过类和接口之间的继承，也讲过类类型接口
// ** 这里是让类AB继承ClassAa和ClassBb的类型 **，所以使用implements关键字，而不是用extends
class AB implements ClassAa, ClassBb {        
  constructor() {}
  isA: boolean = false; // 定义两个实例属性
  isB: boolean = false;
  funcA: () => void; // 定义两个方法，并指定类型
  funcB: () => void;
}

function mixins(base: any, from: any[]) { 
	// 这里我们改造一下，直接传入类，而非其原型对象，
	// base是我们最后要汇总而成的类，
	// from是个数组，是我们要混入的源类组成的数组
  from.forEach(fromItem => {
    Object.getOwnPropertyNames(fromItem.prototype).forEach(key => {
      base.prototype[key] = fromItem.prototype[key];
    });
  });
}
mixins(AB, [ClassAa, ClassBb]);

const ab = new AB();
console.log(ab);

/*
{
    isA: false,
    isB: false,
    __proto__: {
        funcA: f ()
        funcB: f ()
        constructor: f
    }
}
*/
```

来看下这个例子。这个例子中我们定义了两个类 A 和 B，它们分别有自己的方法和实例属性。

如果我们想使用它们的所有属性和方法来创建实例，就需要将它们做一个混合。

`因为包含类型定义，所以我们首先要定义一个接口，来包含着两个类中元素类型的定义。`

所以我们定义一个类类型接口，然后让这个类类型接口 AB 通过 implements 继承 A 和 B 这两个类，

这样类 AB 就会同时拥有类 A 和 B 的类型定义，还有自身定义的一些类型和值。

所以此时类 AB 相当于：

```typescript
class AB {
  isA: boolean = false;
  isB: boolean = false;
  funcA: () => void;
  funcB: () => void;
}
```

然后我们通过 mixins 函数将类 A 和类 B 的原型对象的属性方法赋值给类 AB，

因为类 AB 有 funcA 和 funcB 的类型定义，所以可以把 funcA 和 funcB 函数实体赋值给类 AB。

### 小结

在ts中做混合相对js会复杂一些, 

因为除了把双方各自有的方法绑定到新生成对象的prototype上以外,

我们还需要对 双方各自有的方法的类型定义 作处理

操作方法是生成一个类类型接口(implements ClassA, ClassB), 此接口含有 双方各自有的方法的[类型定义]

此时将 双方各自有的方法绑定到 类类型接口 的prototype上即可

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc9kld1p7kj318g0auabu.jpg">

知识回顾:

使用类类型接口可以强制一个类的定义必须包含某些内容

implements关键字用来指定一个类要继承的接口，

如果是接口和接口、类和类直接的继承，使用extends，如果是类继承接口，则用implements。

## Promise及其语法糖async和await

TS 在 1.6 版本实验性地支持了 async 函数。

在过去的 JavaScript 当中，如果想保证代码的执行顺序，需要使用回调函数，当需要执行的步骤多了时就会陷入当说的“回调地狱”。

自从 ES6 增加了 Promise 之后，状况有了缓解，我们先来看个例子，一个简单的多个 ajax 请求的例子：

```javascript
ajax.post( // 这里你可以先忽略ajax的定义，他的post方法用来发送一个post请求
  "/login", // 第一个参数时要请求的url
  {
    data: {
      user_name: "lison",
      password: "xxxxx"
    }
  }, // 第二个参数是这个请求要携带的参数
  function(res) {
    var user_id = res.data.user_id;

	// 第二层ajax
    ajax.post( // 这里在/login接口成功返回数据后，再调用一个/user_roles接口，用来获取该登录用户的角色信息
      "/user_roles",
      {
        data: {
          user_id: user_id
        }
      },
      function(res) {
        var role = res.data.role;
        console.log(role);
      }
    );


  } // 第三个参数是接口响应之后的回调函数
);
```

在这个例子中，我们先调用登录的接口发送用户名和密码，然后服务端进行校验之后返回这个用户的一些信息，

然后我们可以从信息中拿到用户 id 去获取它的角色用于权限控制。

这个过程是有先后顺序的，必须先登录后获取角色，为了保证这个顺序，在过去要使用回调函数，当然一些库也支持链式调用。

再来看下使用 ES6 的 Promise 需要怎么写：

```javascript
// 方法定义
const loginReq = ({ user_name, password }) => { // 封装一个loginReq函数，用来返回一个Promise，用来调用/login接口
  return new Promise((resolve, reject) => { // Promise接收一个回调函数参数，这个函数有两个参数，两个参数都是回调函数
    ajax.post(
      "/login",
      {
        user_name,
        password
      },
      res => {
        resolve(res); // 第一个参数resolve用来在执行成功后调用，传给他的参数，可以在这个promise的then函数参数中获取到
      },
      error => {
        reject(error); // 第二个参数reject用来在执行出现错误后调用，传给他的错误信息，可以在这个promise的catch函数参数中获取到
      }
    );
  });
};
const getRolesReq = ({ user_id }) => { // 封装一个getRolesReq函数，用来返回一个Promise，用来调用/user_roles接口
  return new Promise((resolve, reject) => {
    ajax.post(
      "/user_roles",
      {
        data: {
          user_id
        }
      },
      res => {
        resolve(res);
      },
      error => {
        reject(error);
      }
    );
  });
};

// 轮番调用
loginReq({ user_name: "lison", password: "xxxxx" }).then(res => { // 这里在调用loginReq函数后返回一个Promise，在内部当执行到resolve的地方时，这里的then的回调函数就会执行
  getRolesReq({ user_id: res.data.user_id }).then(res => {
    console.log(res.data.role);
  });
});
```

这看起来代码变长了，但是当我们搭配使用诸如 Axios 这类 ajax 请求库和 ES6 语法时，

对于一些复用性高的接口调用能够起到很好的封装作用，而且使用起来较为简洁。

ES7 中增加了 async 和 await 的规范，它们其实是 Promise 的语法糖。

TypeScript 在 1.6 支持了 async 和 await，下面我们通过 setTimeout 来实现异步过程，

看下在 TypeScript 中如何使用 async 和 await：

```typescript
// 我们定义一个接口，用来定义接口返回结果的结构
interface Res { 
  data: {
    [key: string]: any;
  };
}

// 封装axios请求
namespace axios { // 现在我们来定义一个命名空间，用来模拟axios实现接口调用
  export function post(url: string, config: object): Promise<Res> { // 返回值类型是一个Promise，resolve传的参数的类型是Res
    return new Promise((resolve, reject) => { // 然后这里返回一个Promise
      setTimeout(() => { // 通过setTimeout实现异步效果
        let res: Res = { data: {} };
        if (url === "/login") res.data.user_id = 111; // 我们这里通过简单判断，来模拟调用不同接口返回不同数据的效果
        else res.data.role = "admin";
        console.log(2);
        resolve(res); // 在这里传入res结果
      }, 1000);
    });
  }
}

// 用户信息接口定义
interface Info {
  user_name: string;
  password: string;
}

// 异步函数定义
async function loginReq({ user_name, password }: Info) { // 这里使用async关键字修饰这个函数，那么他内部就可以包含异步逻辑了
  try {
    console.log(1);
    const res = await axios.post("/login", { // 这里调用/login接口
      data: {
        user_name,
        password
      }
    });
    console.log(3);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
async function getRoleReq(user_id: number) {
  try {
    const res = await axios.post("/user_roles", {
      data: {
        user_id
      }
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
}


// 轮番调用
loginReq({ user_name: "lison", password: "123" }).then(res => {
  const {
    data: { user_id }
  } = res;
  getRoleReq(user_id).then(res => {
    const {
      data: { role }
    } = res;
    console.log(role);
  });
});
```

这个例子中用到了很多我们前面学习到的知识，可以帮大家进行复习和实践。

首先我们定义一个命名空间 axios，定义它用来简单模拟 axios 这个 ajax 请求库。我们在命名空间内定义一个 post 方法，第一个参数是要请求的 url，第二个参数是一些配置，这里我们只是定义一个参数，不做具体参数的处理和判断。这个 post 方法返回一个 Promise，这和 axios 库是一样的，使用 setTimeout 来模拟 ajax 请求的异步行为和延迟，当 1 秒后调用 resolve 回调函数，并根据调用的 url 返回不同的结果。

post 方法返回的是一个 Promise，所以这个函数返回类型我们使用 TypeScript 内置的条件类型Promise<T>来指定返回类型，这个 T 的类型就是在 resolve 回调函数中返回的值的类型，我们这里返回的值为一个包含 data 属性的对象，所以我们定义一个接口 Res。

接下来要定义两个发起 ajax 请求的函数了，这里我们使用 async/await 来定义这两个函数。先来看 loginReq 函数。我们在 function 关键字前加async表明这是一个异步函数，然后就可以在它的函数体内使用await关键字来让异步代码同步执行了。

如果不使用 await，我们可以通过.then()拿到 axios.post 的结果并且进行后面的操作。我们这里在 axios.post 方法调用前面加上await，这样就可以让这个异步函数同步返回结果，它的返回值就是 Promise 中 resolve 回调函数传入的实际参数。我们在使用 Promise 时，可以使用.catch(error => {})来捕获异常拿到错误信息，

如果使用 await，需要使用 try catch 来捕获异常。

我们再定义一个 getRoleReq 函数来发起获取用户角色的请求，这个请求依赖登录请求返回的用户 id，形式和 loginReq 函数差不多。使用 async/await 要注意，await 只能出现在使用 async 修饰的函数或方法体内。

最后我们调用这两个函数，还是使用.then 的方式，

这样要比使用 async/await 的形式简单些。

这里我们在几个地方打印几个标记，让大家看下执行顺序，可以看到，打印出来的数字，是按 1->2->3 的顺序打印出来的，这是因为代码执行到 console.log(1)后会等 await 修饰的异步代码执行完，才会往后执行，所以 3 在 2 后面执行。

TypeScript 对于 async/await 的支持是在 1.6 版本开始的，但是这要求你代码的构建目标是"ES6"；

1.7 版本对原生支持 ES6 Generator 的引擎中支持了异步函数；2.1 版本可以将异步函数编译为 ES3 和 ES5。

