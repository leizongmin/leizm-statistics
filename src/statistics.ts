/**
 * 统计类型
 * counter = 计数器，得到 counter
 * samples = 采样，得到 counter, max, min, avg
 * data = 任意数据
 */
export type IStatisticsType = "counter" | "samples" | "data";

export interface ITagItem {
  /** 统计类型 */
  type: IStatisticsType;
  /** 标题 */
  title: string;
  /** 计数 */
  counter: number;
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 平均值 */
  avg: number;
  /** 数据 */
  data: any;
}

export interface IReportItem {
  /** 统计类型 */
  type: IStatisticsType;
  /** 标签 */
  tag: string;
  /** 计数 */
  counter?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 平均值 */
  avg?: number;
  /** 数据 */
  data?: any;
}

export class Statistics {
  protected readonly tags: Map<string, ITagItem> = new Map();

  /**
   * 获取指定标签的数据
   * @param tag
   */
  public get(tag: string): ITagItem | undefined {
    return this.tags.get(tag);
  }

  /**
   * 初始化标签
   * @param type
   * @param tag
   * @param title
   */
  public init(type: IStatisticsType, tag: string, title?: string) {
    this.tags.set(tag, {
      type,
      title: title || tag,
      counter: 0,
      min: Number.MAX_SAFE_INTEGER,
      max: Number.MIN_SAFE_INTEGER,
      avg: 0,
      data: null,
    });
  }

  /**
   * 增加计数
   * @param tag
   * @param n
   */
  public incr(tag: string, n: number = 1) {
    const item = this.tags.get(tag);
    if (item) {
      item.counter += n;
    }
    return this;
  }

  /**
   * 减计数
   * @param tag
   * @param n
   */
  public decr(tag: string, n: number = 1) {
    return this.incr(tag, -n);
  }

  /**
   * 添加采样数据
   * @param tag
   * @param n
   */
  public add(tag: string, n: number) {
    const item = this.tags.get(tag);
    if (item) {
      if (n < item.min) {
        item.min = n;
      }
      if (n > item.max) {
        item.max = n;
      }
      item.avg = (n - item.avg) / (item.counter + 1) + item.avg;
      item.counter++;
    }
    return this;
  }

  /**
   * 设置数据
   * @param tag
   * @param data
   */
  public set(tag: string, data: any) {
    const item = this.tags.get(tag);
    if (item) {
      item.data = data;
    }
  }

  /**
   * 获得当前报告
   */
  public report(): IReportItem[] {
    const list: any[] = [];
    this.tags.forEach((item, tag) => {
      if (item.type === "counter") {
        list.push({
          tag,
          type: item.type,
          counter: item.counter,
        });
      } else if (item.type === "samples") {
        if (item.counter === 0) {
          list.push({
            tag,
            type: item.type,
            counter: item.counter,
          });
        } else if (item.counter === 1) {
          list.push({
            tag,
            type: item.type,
            counter: item.counter,
            min: item.avg,
            max: item.avg,
            avg: item.avg,
          });
        } else {
          list.push({
            tag,
            type: item.type,
            counter: item.counter,
            min: item.min,
            max: item.max,
            avg: Number(item.avg.toFixed(4)),
          });
        }
      } else if (item.type === "data") {
        list.push({
          tag,
          type: item.type,
          data: item.data,
        });
      }
    });
    return list;
  }

  /**
   * 清空统计信息（一般与 report() 配合使用）
   */
  public flush() {
    this.tags.forEach(item => {
      item.counter = 0;
      item.min = Number.MAX_SAFE_INTEGER;
      item.max = Number.MIN_SAFE_INTEGER;
      item.avg = 0;
      item.data = null;
    });
  }
}
