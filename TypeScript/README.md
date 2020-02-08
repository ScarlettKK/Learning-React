# Typescript 再拾

参考教程: 阮一峰老师https://ts.xcatliu.com/

## 简介

TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。

编译出来的 JavaScript 可以运行在任何浏览器上。

TypeScript 编译工具可以运行在任何服务器和任何系统上。

TypeScript 是开源的。

TypeScript 最主要的亮点是它的类型系统，这使得在编写代码的时候就能够检测到一些错误。

## why TypeScript?

TypeScript 增加了代码的可读性和可维护性

	包含类型系统，使得大部分的函数只要看类型的定义, 就可以知道如何使用了

	在编译阶段就发现大部分错误

	增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

TypeScript 非常包容(对于js以及类型)

	TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可

	可以自动做出类型推论(针对不显式的定义类型)

	可以定义从简单到复杂的几乎一切类型

	即使 TypeScript 编译报错，也可以生成 JavaScript 文件

	兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

TypeScript 拥有活跃的社区

	大部分第三方库都有提供给 TypeScript 的类型定义文件

	Google 开发的 Angular2 就是使用 TypeScript 编写的

	TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范

TypeScript 的缺点

	任何事物都是有两面性的，我认为 TypeScript 的弊端在于：
		有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念

		短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本

		集成到构建流程需要一些工作量
		
		可能和一些库结合的不是很完美


