// 作用：书写表格区域的类型
import type { ButtonType } from './buttonType';
import type { TableSearch } from './searchTypes';

export interface TableConfig<T = Record<string, unknown>, C = Record<string, unknown>> {
    /** 搜索配置 */
    search: TableSearch<C>[];
    button?: ButtonType[],
    columns: TableType<T>[],
    api: ((_params: RequestType<C>) => Promise<ResponseType<T>>) | ((_params: RequestType<C>) => ResponseType<T>);
};


/** 表格 */
export interface BaseTableType<T> {
    /** 表头 */
    label: string;
    /** 字段 */
    dataIndex: Extract<keyof T, string>;
    /** 内容类型 */
    xtype: 'text' | 'render' | 'date' | 'dateTime';
    /** 列宽 */
    width?: string | number;
    /** 一行展示，多余部分省略号展示 */
    line?: boolean;
    /** 是否显示多选框 */
    isSelection?: boolean
};

type RenderTableType<T> = Omit<BaseTableType<T>, 'xtype'> & {
  xtype: 'render';
  render: (_value: unknown, _row: T, _data: T[]) => string | unknown;
}

export type TableType<T> = BaseTableType<T> | RenderTableType<T>;

export type RequestType<T> = {
 page: number;
 size: number;
} & T;

export type ResponseType<T> = {
  code: 200 | 401 | 500;
  data: {
    data: Array<T>;
    pagination: {
        page: number;
        size: number;
        total: number;
    }
  },
  msg: string;
};
