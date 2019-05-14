import Benchmark from "@leizm/benchmark";
import Statistics from "./statistics";

const b = new Benchmark({ title: "@leizm/statistics Benchmark " });

const s = new Statistics();
s.init("counter", "request_count", "请求次数");
s.init("samples", "response_time", "响应时间");
s.init("data", "any_data", "任意数据");

b.addSyncFaster("#counter", count => {
  for (let i = 0; i < count; i++) {
    s.incr("request_count");
  }
});
b.addSyncFaster("#samples", count => {
  for (let i = 0; i < count; i++) {
    s.add("response_time", Math.random());
  }
});
b.addSyncFaster("#data", count => {
  for (let i = 0; i < count; i++) {
    s.set("any_data", { a: 123, b: 456 });
  }
})
  .run()
  .then(r => b.print(r))
  .catch(console.log);
