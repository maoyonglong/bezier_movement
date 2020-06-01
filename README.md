# bezier_movement
这是一个让元素实现贝塞尔曲线轨迹运动的JS插件

# Example
https://maoyonglong.github.io/bezier_movement

# Usage
```js
var movement = new BezierMovement(options)
```

# options
默认的配置：
```js
{
  type: 'quadratic', // linear（线性） quadratic（二次曲线）, cubic (三次曲线)
  target: undefined, // 必须，运动的对象
  container: document.body, // 包裹的容器，一般指position: relataive的父元素
  start: [], // 必须，运动的起点，形式为[x, y]
  end: [], // 必须，运动的终点
  fixedPoints: [], // 定点，linear - [], quadratic- [[x, y]], cubic - [[x1, y1], [x2, y2]]
  autoPlay: false, // 是否初始化后自动运行
  onEnd: undefined // 回调函数，运行结束后执行
}
```

# 显示轨迹
```js
movement.genTrack().toggleTrack(true)
```

# API
* setOptions 设置options
* bezier 获取贝塞尔算法函数
* setCalcT 设置贝塞尔函数的变量t的改变方式
> 运动在每次requestAnimationFrame时执行，每次执行时计算器count自增1
```js
movement.setCalcT(function (count) {
  return 1 / 30 * count // 这样就表示每次t增加1/30
})
```
* play 执行运动
```js
movement.play()
```
* genTrack 生成运动轨迹
```js
movement.genTrack()
```
* toggleTrack 显示或隐藏运动轨迹
```js
movement.toggleTrack(true) // 显示
movement.toggleTrack(false) // 隐藏
```
* removeTrack 移除运动轨迹
```js
movement.removeTrack()
```

> 除了bezier，其它API都返回实例本身