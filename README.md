# @leizm/statistics
简单统计模块

## 安装

```bash
npm install @leizm/statistics --save
```

## 使用

```typescript
import Statistics from "@leizm/statistics";

// 创建实例
const s = new Statistics();
// 初始化统计字段
s.init("counter", "request_count", "请求次数");
s.init("samples", "response_time", "响应时间");
s.init("data", "memory_usage", "内存使用情况");

// 更新统计信息
s.incr("request_count");
s.add("response_time", 0.1);
s.set("memory_usage", process.memoryUsage());

// 获取当前结果
console.log(s.report());
// 输出结果如下：
// [ { tag: 'request_count', type: 'counter', counter: 1 },
//   { tag: 'response_time',
//     type: 'samples',
//     counter: 1,
//     min: 0.1,
//     max: 0.1,
//     avg: 0.1 },
//   { tag: 'memory_usage',
//     type: 'data',
//     data:
//      { rss: 25255936,
//        heapTotal: 10731520,
//        heapUsed: 7370176,
//        external: 9037 } } ]

// 清空当前结果（用于下一周期统计）
s.flush();
```

## 性能

```

------------------------------------------------------------------------
@leizm/statistics Benchmark
------------------------------------------------------------------------

Platform info:
- Darwin 18.5.0 x64
- Node.JS: 10.15.3
- V8: 6.8.275.32-node.51
  Intel(R) Core(TM) i7-6820HQ CPU @ 2.70GHz × 8


3 tests success:
┌──────────┬─────────────┬───────┬────────┐
│ test     │ rps         │ ns/op │ spent  │
├──────────┼─────────────┼───────┼────────┤
│ #counter │ 110854572.7 │ 9.0   │ 2.001s │
├──────────┼─────────────┼───────┼────────┤
│ #samples │ 38585000.0  │ 25.9  │ 2.000s │
├──────────┼─────────────┼───────┼────────┤
│ #data    │ 9690000.0   │ 103.2 │ 2.000s │
└──────────┴─────────────┴───────┴────────┘
```

## License

```
MIT License

Copyright (c) 2019 Zongmin Lei <leizongmin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
