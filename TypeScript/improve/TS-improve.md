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
