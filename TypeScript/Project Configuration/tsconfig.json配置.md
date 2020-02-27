# tsconfig.json

本小结我们主要讲 tsconfig.json 文件的可配项以及功能。

tsconfig.json 是放在项目根目录，用来配置一些编译选项等。

当我们使用 tsc 命令编译项目，且没有指定输入文件时，编译器就会去查找 tsconfig.json 文件。

如果在当前目录没找到，就会逐级向父文件夹查找。

我们也可以通过在 tsc 命令中加上–project 参数，来指定一个包含 tsconfig.json 文件的目录。

如果命令行上指定了输入文件时，tsconfig.json 的配置会被忽略。

	# 直接在项目根目录下执行tsc命令，会自动根据tsconfig.json配置项编译
	tsc

	# 指定要编译的项目，即tsconfig.json所在文件目录
	tsc --project ./dir/project

	# 指定要编译的文件，忽略tsconfig.json文件配置
	tsc ./src/main.ts

## 逐条来看tsconfig.json配置

接下来我们看一下 tsconfig.json 里都有哪些可配置项。tsconfig.json 文件里有几个主要的配置项：

```json
{
  "compileOnSave": true,
  "files": [],
  "include": [],
  "exclude": [],
  "extends": "",
  "compilerOptions": {}
}
```

我们来逐个学习它们的作用，以及可配置的值：

### [1] compileOnSave (自动保存重新编译, 类似热模块加载)

compileOnSave 的值是 true 或 false。

如果设为 true，在我们编辑了项目中文件保存的时候，编辑器会根据 tsconfig.json 的配置重新生成文件，不过这个要编辑器支持。

### [2] files (编译哪些文件?)

files 可以配置一个数组列表，里面包含指定文件的相对或绝对路径。

编译器在编译的时候只会编译包含在 files 中列出的文件。

如果不指定，则取决于有没有设置 include 选项；

如果没有 include 选项，则默认会编译根目录以及所有子目录中的文件。

`这里列出的路径必须是指定文件，而不是某个文件夹`，而且不能使用`*、?、**/`等通配符。

### [3] include (编译哪些文件/夹?)

include 也可以指定要编译的路径列表，

但和 files 的区别在于，这里的路径可以是文件夹，也可以是文件，可以使用相对和绝对路径，而且可以使用通配符。

比如"./src"即表示要编译 src 文件夹下的所有文件以及子文件夹的文件。

### [4] exclude (不编译哪些文件/夹?)

exclude 表示要排除的、不编译的文件，

它也可以指定一个列表，

规则和 include 一样，可以是文件可以是文件夹，可以是相对路径或绝对路径，可以使用通配符。

### [5] extends (多个tsconfig.json配置文件并用)

extends 可以通过指定一个其它的 tsconfig.json 文件路径，来继承这个配置文件里的配置，

继承来的文件配置会覆盖当前文件定义的配置。

TS 在 3.2 版本开始，支持继承一个来自 Node.js 包的 tsconfig.json 配置文件。

### [6] compilerOptions

最后要讲的这个 compilerOptions 是重点了，它用来设置编译选项。

因为它包含很多的可配置项，下面我们来看下 compilerOptions 里的所有可配项：

--------------------------------------------------------
我们先来看第一类，一些比较基本的配置：

target

	target 用于指定编译之后的版本目标，
	可选值有：ES3(默认值)、ES5、ES2015、ES2016、ES2017、ESNEXT。
	如果不配置 target 项，默认是讲代码转译为 ES3 的版本，
	如果设为 ESNEXT，则为最新 ES 规范版本。

module

	module 用来指定要使用的模块标准，
	可选值有commonjs、amd、system、umd、es2015(或写 es6)。
	如果不设置 module 选项，则如果 target 设为 ES6，那么 module 默认值为 ES6，
	否则是 commonjs。

lib

	lib 用于指定要包含在编译中的库文件。
	如果你要使用一些 ES6 的新语法，你需要引入 ES6 这个库，或者也可以写 ES2015。
	如果没有指定 lib 配置，默认会加载一些库，而加载什么库是受 target 影响的。
	如果 target 为 ES5，默认包含的库有DOM、ES5和ScriptHost；
	如果 target 是 ES6，默认引入的库有DOM、ES6、DOM.Iterable和ScriptHost。

allowJs

	allowJs 设置的值为 true 或 false，用来指定是否允许编译 JS 文件，
	默认是 false，即不编译 JS 文件。

checkJs

	checkJs 的值为 true 或 false，
	用来指定是否检查和报告 JS 文件中的错误，默认是 false。

declaration

	declaration 的值为 true 或 false，
	用来指定是否在编译的时候生成响应的".d.ts"声明文件。
	如果设为 true，编译每个 ts 文件之后会生成一个 js 文件和一个 声明文件。
	但是 declaration 和 allowJs 不能同时设为 true。

sourceMap

	sourceMap 的值为 true 或 false，用来指定编译时是否生成.map 文件。

outFile

	outFile 用于指定将输出文件合并为一个文件，
	它的值为一个文件路径名，比如设置为"./dist/main.js"，则输出的文件为一个 main.js 文件。
	但是要注意，只有设置 module 的值为 amd 和 system 模块时才支持这个配置。

outDir

	outDir 用来指定输出文件夹，值为一个文件夹路径字符串，
	输出的文件都将放置在这个文件夹。

rootDir

	用来指定编译文件的根目录，编译器会在根目录查找入口文件，
	如果编译器发现以 rootDir 的值作为根目录查找入口文件:
	并不会把所有文件加载进去的话会报错，但是不会停止编译。

removeComments

	removeComments 值为 true 或 false，
	用于指定是否将编译后的文件中的注释删掉，设为 true 的话即删掉注释，默认为 false。

noEmit

	不生成编译文件，这个一般很少用了。

importHelpers

	importHelpers 的值为 true 或 false，
	指定是否引入 tslib 里的辅助工具函数，默认 为false。

isolatedModules

	isolatedModules 的值为 true 或 false，
	指定是否将每个文件作为单独的模块，默认为 true，
	它不可以和 declaration 同时设定。

--------------------------------------------------------
第二类是和严格类型检查相关的，开启了这些检查如果有错会报错：

noImplicitAny

	noImplicitAny 的值为 true 或 false，
	如果我们没有为一些值设置明确的类型，编译器会默认这个值为 any 类型，
	如果将 noImplicitAny 设为 true，则如果没有设置明确的类型会报错，
	默认值为 false。

alwaysStrict

	alwaysStrict 的值为 true 或 false，指定始终以严格模式检查每个模块，
	并且在编译之后的 JS 文件中加入"use strict"字符串，用来告诉浏览器该 JS 为严格模式。

strictNullChecks

	strictNullChecks 的值为 true 或 false，
	当设为 true 时，null 和 undefined 值不能赋值给 非这两种类型的值，别的类型的值也不能赋给它们。 
	除了 any 类型，还有个例外就是 undefined 可以赋值给 void 类型。

strictFunctionTypes

	strictFunctionTypes 的值为 true 或 false，
	用来指定是否使用 函数参数双向协变 检查。
	还记得我们讲类型兼容性的时候讲过函数参数双向协变的这个例子：

```typescript
let funcA = function(arg: number | string): void {};
let funcB = function(arg: number): void {};
funcA = funcB; // 参数范围不同, 仍旧可以互相赋值
```

	如果开启了 strictFunctionTypes，这个赋值就会报错，默认为 false

strictPropertyInitialization

	strictPropertyInitialization 的值为 true 或 false，
	设为 true 后会检查类的非 undefined 属性是否已经在构造函数里初始化，
	如果要开启这项，需要同时开启 strictNullChecks，默认为 false。

strictBindCallApply

	strictBindCallApply 的值为 true 或 false，
	设为 true 后会对 bind、call 和 apply 绑定方法参数的检测是严格检测的，
	如下面的例子：

```typescript
function foo(a: number, b: string): string {
  return a + b;
}
let a = foo.apply(this, [1]); 
// error Property '1' is missing in type '[number]' but required in type '[number, string]'
let b = foo.apply(this, [1, 2]); 
// error 不能将类型“number”分配给类型“string”

let ccd = foo.apply(this, [1, "a"]); // right
let ccsd = foo.apply(this, [1, "a", 2]); // right
```

strict

	strict 的值为 true 或 false，用于指定是否启动所有类型检查，
	如果设为 true 则会同时开启前面这几个严格类型检查，默认为 false。

--------------------------------------------------------
第三类为额外的一些检查，开启了这些检查如果有错会提示不会报错：

noUnusedLocals

	noUnusedLocals 的值为 true 或 false，
	用于检查是否有定义了但是没有使用的变量，
	对于这一点的检测，使用 ESLint 可以在你书写代码的时候做提示，你可以配合使用。
	它的默认值为 false。

noUnusedParameters

	noUnusedParameters 的值为 true 或 false，
	用于检查是否有在函数体中没有使用的参数，
	这个也可以配合 ESLint 来做检查，它默认是 false。

noImplicitReturns

	noImplicitReturns 的值为 true 或 false，
	用于检查函数是否有返回值，
	设为 true 后，如果函数没有返回值则会提示，默认为 false。

noFallthroughCasesInSwitch

	noFallthroughCasesInSwitch 的值为 true 或 false，
	用于检查 switch 中是否有 case 没有使用 break 跳出 switch，默认为 false。

--------------------------------------------------------
接下来是模块解析相关的：

moduleResolution

	moduleResolution 用于选择 模块解析策略，
	有"node"和"classic"两种类型，我们在讲模块解析的时候已经讲过了。

baseUrl

	baseUrl 用于设置解析非相对模块名称的基本目录
	这个我们在讲《模块和命名空间》的“模块解析配置项”一节时已经讲过了，
	相对模块不会受 baseUrl 的影响。

paths

	paths 用于设置模块名到基于 baseUrl 的路径映射，我们前面也讲过，比如这样配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".", // 如果使用paths，必须设置baseUrl
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // 此处映射是相对于"baseUrl"
    }
  }
}
```

	还有当我们要为没有声明文件的第三方模块写声明文件时，我们可以先如下设置：

```json
{
  "compilerOptions": {
    "baseUrl": ".", // 如果使用paths，必须设置baseUrl
    "paths": {
      "*": ["./node_modules/@types/*", "./typings/*"]
    }
  }
}
```

	然后在 tsconfig.json 文件所在的目录里建一个 typings 文件夹，
	然后为要写声明文件的模块建一个同名文件夹，

	比如我们要为 make-dir 这个模块写声明文件，那么就在 typings 文件夹下新建一个文件夹，命名为 make-dir，
	然后在 make-dir 文件夹新建一个 index.d.ts 声明文件来为这个模块补充声明。

rootDirs

	rootDirs 可以指定一个路径列表，
	在构建时编译器会将这个路径列表中的路径内容都放到一个文件夹中，我们在前面也学习了。

typeRoots

	typeRoots 用来指定声明文件或文件夹的路径列表，
	如果指定了此项，则只有在这里列出的声明文件才会被加载。

types

	types 用来指定需要包含的模块，
	只有在这里列出的模块声明文件才会被加载进来。

allowSyntheticDefaultImports

	allowSyntheticDefaultImports 的值为 true 或 false，
	用来指定允许从没有默认导出的模块中默认导入。

--------------------------------------------------------
接下来的是 source map 的一些配置项：

sourceRoot

	sourceRoot 用于指定调试器应该找到 TypeScript 文件而不是源文件位置，这个值会被写进.map 文件里。

mapRoot

	mapRoot 用于指定调试器找到映射文件而非生成文件的位置，
	指定 map 文件的根路径，该选项会影响.map 文件中的 sources 属性。

inlineSourceMap

	inlineSourceMap 值为 true 或 false，
	指定是否将 map 文件的内容和 js 文件编译在同一个 js 文件中。
	如果设为 true，则 map 的内容会以//# sourceMappingURL=然后接 base64 字符串的形式插入在 js 文件底部。

inlineSources

	inlineSources 的值是 true 或 false，
	用于指定是否进一步将.ts 文件的内容也包含到输出文件中。

--------------------------------------------------------
最后还有两个其他的配置项：

experimentalDecorators

	experimentalDecorators 的值是 true 或 false，
	用于指定是否启用实验性的装饰器特性，我们在讲装饰器的时候已经学习过了。

emitDecoratorMetadata

	emitDecoratorMetadata 的值为 true 或 false，用于指定是否为装饰器提供元数据支持。
	关于元数据，也是 ES6 的新标准，可以通过 Reflect 提供的静态方法获取元数据
	如果需要使用 Reflect 的一些方法，需要引入 ES2015.Reflect 这个库。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc9mw5ymhej313h0u0gs7.jpg">

## 书写声明文件之磨刀：识别库类型

声明文件 -> 供库使用

前面我们提到几次.d.ts后缀的文件，这节课我们来完整学习下与声明文件相关的内容。

我们之前讲模块的时候讲到过两种常见模块标准，即 CommonJS 和 RequireJS。

不同的模块在实现方式上是不一样的。

我们要为已有的第三方 JS 库编写声明文件，以便在 TS 中更好地使用类型系统，所以首先需要知道我们使用的 JS 库被编译成了什么类型。

我们来分别看下几种类型的特征：

### 全局库

在一开始，没有 webpack 这些编译工具的时候，我们都是在 html 文件里使用 script 标签引入 js 文件，然后就可以在引入的后面使用引入的库了。

比如我们使用 jQuery，只需要在`<body>`标签里通过`<script src=“http://xxx.com/jQuery.min.js”></script>`引入 jQuery 库，

然后就可以在`<script></script>`标签内使用：

```javascript
$(function() {
  // ...
});
```

`这种不需要我们引入什么变量，只需要将库引入即可使用的库，就叫做全局库。`

后面讲到 UMD 模块的时候要注意，UMD 模块既可以作为模块使用，又可以作为全局库使用的模块，

所以在判断一个库的时候，如果它可以像例子中那样全局使用，首先要确定它是不是 UMD 模块；

如果不是，那它可能就是一个单纯的全局库。

另外，你还可以通过看库的源码，来判断它是什么类型，

一个全局库，通常会包含下面内容中的一个或多个：

	顶级的 var 语句或 function 声明；
	一个或多个赋值给 window.someName 的赋值语句；
	判断 document 或 window 是否存在的判断逻辑。

因为顶级的 var 或 function 是直接在全局环境声明变量或函数，不使用立即执行函数包裹会影响到全局，所以有这种一般会是全局库；

当出现给 window 设置某个属性名 someName ，然后给这个属性赋值的语句时，是在给全局对象 window 赋值。引入这个库后直接通过 window.someName 即可在全局任何地方访问到这个属性值；

如果出现 if 语句或三元操作符这种判断 document 或 window 是否存在的语句，也有可能是要给这两个全局对象添加内容，所以也有可能是全局库。

但是由于把一个全局库转变成 UMD 库较为容易，所以现在全局库较少。

我们来着手为下面这个简单的示例全局库编写一个全局库声明文件，先来看这个全局库的代码：

```javascript
// handle-title.js
function setTitle(title) {
  document && (document.title = title);
}

function getTitle() {
  return (document && document.title) || "";
}

let documentTitle = getTitle();
```

这个 handle-title.js 库非常简单，声明了一个 setTitle 函数，接收一个参数，

在函数内首先通过&&符判断 document 是否不为 undefined，

如果不为 undefined，才会执行后面的逻辑，将 title 赋值给 document.title，从而实现修改显示在浏览器标签的文字；

一个 getTitle 函数，用于获取此时的 title 值，如果没有 document 对象，则返回空字符串；

一个全局变量 documentTitle，用来在初始化时记录当前的 title。

`我们要为这个 handle-title.js 全局库编写一个声明文件handle-title.d.ts，官方为每一种库类型都提供了响应的声明文件模板`，

全局库的模板是global.d.ts，我们首先来看一下这个模板中的内容：

```typescript
// 下面有三种格式

// 如果这个库有一个全局暴露的函数，他可能可以传入不同类型的参数，返回不同的值，所以可以为它定义函数重载
declare function myLib(a: string): string;
declare function myLib(a: number): number;


// 如果你想让这个库名作为一种类型，可以定义一个接口
declare interface myLib {
  name: string;
  length: number;
  extras?: string[];
}


// 如果这个库有一些需要在全局暴露的属性，可以定义这个命名空间，将值、接口和类型别名等定义在这里
// 这样，在下面命名空间中没有列出的内容，通过myLib.xxx访问时在编译阶段会报错，但是运行时是可以访问的，只要这个JS库里定义了。
declare namespace myLib {
  let timeout: number; // 通过myLib.timeout访问，也可以修改: myLib.timeout = 123
  const version: string; // 可通过myLib.version访问，但不能修改，因为是const声明的
  class Cat {
    constructor(n: number);
    readonly age: number;
    purr(): void;
  }
  interface CatSettings {
    weight: number;
    name: string;
    tailLength?: number;
  }
  type VetID = string | number;
  function checkCat(c: Cat, s?: VetID);
}
```

这个handle-title.js文件我们可以直接在 index.html 文件里引入，

如果不定义声明文件，我们直接在 index.ts 里使用，会报错：

```typescript
console.log(getTitle()); // error 找不到名称“getTitle”
console.log(documentTitle); // error 找不到名称“documentTitle”
```

接下来我们为 handle-title.js 库编写一个声明文件：

```typescript
// handle-title.d.ts
declare function setTitle(title: string | number): void;

declare function getTitle(): string;

declare let documentTitle: string;
```

我们在 tsconfig.json 里，通过设置 include 来让编译器自动引入"./src/"文件夹下的所有声明文件：

```json
"include": [
    "./src/**/*.ts",
    "./src/**/*.d.ts"
]
```

这样我们定义在src/types文件夹下的所有声明文件就会起作用了，

这下再看 index.ts 文件里使用 getTitle 和 documentTitle 就没有问题了。

### 模块化库

模块化库即依赖模块解析器的库。

之前讲模块的时候讲到过 CommonJS 和 ES6 模块，接下来我们看下如何判断一个库是模块化库。

在模块库代码中，你一般会看到下面的情况之一：

	无条件地调用 require 或 define 方法；
	像 import * as a from 'b’或者 export c 这样的声明；
	赋值给 exports.someName 或 module.exports。

因为模块化库依赖模块解析器环境，在使用这种库的时候，就已经引入模块解析器的 require 或 define 等方法了，所以模块化库会直接调用这些方法来加载代码；

库中包括 import * as a from 'b’和 export c 这种模块中才有的引入和导出语句的话，基本就是模块库了；

如果有赋值语句赋值给 exports.someName 或 module.exports，这种就是 CommonJS 模块的导出语句了。

你极少会在模块化库中看到对 window或global的赋值，

当然这不是绝对的，比如有的库需要操作 window 的一些属性，这就难免了。

针对模块，官方有三个模板声明文件，分别是 module.d.ts、module-class.d.ts 和 module-function.d.ts：

	如果这个模块引入后，可以直接当做函数调用，那可以参考 module-function.d.ts 文件；

	如果模块引入后，可以直接当做类使用 new 关键字创建实例，可以参考 module-class.d.ts 文件；

	如果模块不能被调用也不能当做类，参考 module.d.ts。

关于这几种模板，以及其它类型库声明文件的书写，我们会在后面实战课中通过几个实际的例子来进一步学习。

### UMD 库

UMD 库将全局库和模块库的功能进行了结合，

它会先判断环境中有没有模块加载器的一些特定方法。

如果有，说明是模块加载器环境，UMD 库就会使用模块的方式导出；

如果没有检测到这些方法，则会将内容添加到全局环境。

一般你会在 UMD 库中看到这种逻辑判断：

```typescript 
(function(root, factory) {                                  // 如果有，说明是模块加载器环境，UMD 库就会使用模块的方式导出；
  if (typeof define === "function" && define.amd) {
    define(["libName"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("libName"));
  } else {
    root.returnExports = factory(root.libName);
  }
})(this, function(b) {                                      // 如果没有检测到这些方法，则会将内容添加到全局环境。
  // ...
});
```

现在很多库都是 UMD 库，比如 jQuery、moment 等，

你既可以在 html 文件中直接通过`<script>`标签引入它，也可以通过模块的形式引入。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gcaqc1blzjj318g0g2adj.jpg">

## 书写声明文件之砍柴：为不同类型库书写声明文件

一些模块和插件是支持插件机制的，比如我们常见的 jQuery，它的插件有非常多。

我们可以为库书写声明文件的同时，为库的插件定义声明文件，可以参考官方模板 module-plugin.d.ts。

### 全局插件

全局插件往往会修改全局中一些对象，在这些对象上添加或修改属性方法，比如下面的示例：

```javascript
// add-methods-to-string.js
String.prototype.getFirstLetter = function() {
  return this[0];
};
```

这段代码在 String 构造函数的原型对象上添加一个 getFirstLetter 方法，这个方法可以返回字符串的第一个字符。

我们创建一个字符串，就可以调用这个方法。

来讲下这个原理，我们在 String 构造函数原型对象上添加一个方法，这个方法就会被 String 创建的实例继承，

如果我们使用new String(‘Lison’)的方式创建一个实例 name，那么这个 name 将是一个对象类型的值，它的属性是 0 开始到 n 的数字，属性值对应字符串的第 1 个、第 n 个字符；

但是像例子中这样使用const name = 'Lison’字面量的形式定义的 name，其实是个字符串类型的值，

字符串就不会继承构造函数的方法了，以为它不是对象，但事实是它可以调用getFirstLetter方法。

这是因为它在调用方法的时候，会先将这个字符串包装成一个封装对象，在内部即使用 String 构造函数，所以它依然可以调用原型对象上的方法。

我们在 html 文件里引入这个 js 文件后创建一个字符串，这个字符串就可以调用 getFirstLetter 方法：

```html
<script type="text/javascript" src="./add-methods-to-string.js"></script>
<script type="text/javascript">
  var str = "Lison";
  console.log(str.getFirstLetter()); // "L"
</script>
```

如果我们在 TS 中使用，就需要为这个创建声明文件，

我们创建一个声明文件 global-plugin.d.ts：

```typescript
// global-plugin.d.ts
interface String {
  getFirstLetter(): number;
}

// index.ts
var str = "Lison";
console.log(str.getFirstLetter()); // "L"
```

遇到这类情景，你可以参考官方的 global-plugin.d.ts 模板来书写声明文件。

### 修改全局的模块

还有一些影响全局的全局模块，

这些模块除了导出一些东西，还会直接修改全局的一些对象，

我们还是使用上面例子的代码，只不过这次我们使用引入模块的形式来引入：

```typescript
// add-methods-to-string模块
String.prototype.getFirstLetter = function() {
  return this[0];
};

// index.js
require("add-methods-to-string");
const name = "Lison";
console.log(name.getFirstLetter()); // "L"
```

通过这个例子我们知道一些全局模块是做什么事了，你大概知道怎么为它们定义声明文件了。我们新建一个声明文件 global-modifying-module.d.ts，在声明文件中如下声明：

```typescript
declare global {
  interface String {
    getFirstLetter(): number;
  }
}
export {};
```

注意如果我们这个声明文件没有需要导出的东西，这里必须在末尾加上export {}，

这样才能让 TS 编译器把这个声明文件当做一个模块声明。

我们加了这个声明文件后，就可以在 TS 中引入这个模块，再在 TS 中调用字符串的 getFirstLetter 方法就不会报错了。

这类全局模块，你可以参考官方的 global-modifying-module.d.ts 模板。

### 使用依赖

库多数会依赖其它库，所以可以在定义库声明文件的时候，声明对其它库的依赖，从而加载其它库的内容。

如果是依赖全局库，可以使用`///<reference types=“UMDModuleName” />`三斜线指令来指定加载了某个全局库：

```typescript
/// <reference types="globalLib" />
function func(): globalLib.someName;
```

如果依赖的是模块库，可以使用 import 语句：

```typescript
import * as moment from "moment";
function func(): moment;
```

因为有些库是没有 default 默认输出的，

所以如果你在使用import xxx from 'xxx’语句引入一个库报错时，

可以使用import * as xxx from 'xxx’的形式引入。

如果是全局库依赖于某个 UMD 模块，

也可以使用`///<reference types=“UMDModuleName” />`三斜线指令来指定对某个 UMD 模块的依赖：

```typescript
// globals.d.ts
/// <reference types="moment"/>
function getMoment(): moment;
```

如果模块或一个 UMD 库依赖于一个 UMD 库，使用import * as语句引入模块：

```typescript
// module.d.ts
import * as moment from "moment";
export default function(m: typeof moment): void;
```

最后有三点要注意的：

防止命名冲突

	我们在写全局声明时，在全局范围定义大量类型，有时会导致命名冲突。所以建议相关的定义放到命名空间内。

ES6 模块插件影响

	一些开发者为一些库开发了插件，用在原有库的基础上添加更多功能，这往往需要修改原有库导出的模块。
	我们在讲模块的时候说过，ES6 模块标准中，导出的模块是不允许修改的；
	但是在 CommonJS 和其它一些加载器里是允许的，所以要使用 ES6 模块的话要注意这一点。

ES6 模块调用

	我们在使用一些库的时候，引入的模块可以作为函数直接调用。
	ES6 的模块顶层对象是一个对象，它不能作为函数调用，比如我们直接用 export 导出几个内容：

```javascript
// moduleB.js
export const age = 10;
export let name = "lison";

// main.js
import info from "./moduleB.js";
console.log(info.name); // 'lison'

// index.js
import { name, age } from "./moduleB.js";
console.log(name); // 'lison'
```

	如果我们想导出一个直接可以调用的函数，又要使用 ES6 模块，则可以用 export default 来导出一个函数，这个我们在讲模块的时候也讲过了。

### 快捷外部模块声明

如果我们使用一个新模块不想花时间精力为这个模块写声明，

TS 在 2.0 版本支持了快捷外部模块声明，

比如我们使用 moment 模块，就可以在 typings 创建一个 moment 文件夹，

并在这个 moment 文件夹创建一个 index.d.ts 文件，写如下内容：

```typescript
// index.d.ts
declare module "moment";
```

这样就可以正常使用这个 moment 模块了。

### 小结

<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gcb0ize6wpj318g0jb428.jpg">







