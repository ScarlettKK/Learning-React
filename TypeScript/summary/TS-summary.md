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