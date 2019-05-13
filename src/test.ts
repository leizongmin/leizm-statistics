import { expect } from "chai";
import { Statistics } from "./statistics";

describe("Statistics", function() {
  it("samples", async function() {
    const s = new Statistics();
    s.init("samples", "aa");
    const nums = [8, 2, 3, 4, 3, 2, 1, 7, 6, 9, 20, 15, 12];
    nums.forEach(n => s.add("aa", n));
    const ret = s.report();
    const item = ret.list[0];
    expect(item.type).to.equal("samples");
    expect(item.tag).to.equal("aa");
    expect(item.counter).to.equal(nums.length);
    expect(item.min).to.equal(Math.min(...nums));
    expect(item.max).to.equal(Math.max(...nums));
    expect(item.avg.toFixed(4)).to.equal((nums.reduce((a, b) => a + b) / nums.length).toFixed(4));
  });

  it("samples #2", async function() {
    const s = new Statistics();
    s.init("samples", "aa");
    const nums = [8, 2];
    nums.forEach(n => s.add("aa", n));
    const ret = s.report();
    const item = ret.list[0];
    expect(item.type).to.equal("samples");
    expect(item.tag).to.equal("aa");
    expect(item.counter).to.equal(nums.length);
    expect(item.min).to.equal(Math.min(...nums));
    expect(item.max).to.equal(Math.max(...nums));
    expect(item.avg.toFixed(4)).to.equal((nums.reduce((a, b) => a + b) / nums.length).toFixed(4));
  });

  it("counter", async function() {
    const s = new Statistics();
    s.init("counter", "aa");
    for (let i = 0; i < 100; i++) {
      s.incr("aa");
    }
    const ret = s.report();
    const item = ret.list[0];
    expect(item.type).to.equal("counter");
    expect(item.tag).to.equal("aa");
    expect(item.counter).to.equal(100);
  });
});
