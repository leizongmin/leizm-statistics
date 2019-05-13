# @leizm/statistics
简单统计模块

## 安装

```bash
npm install @leizm/statistics --save
```

## 使用

```typescript
import { Statistics } from "@leizm/statistics";

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
// 清空当前结果（用于下一周期统计）
s.flush();
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
