// 作用：书写表格区域的类型
import type { ButtonType } from './buttonType';
import type { TableSearch } from './searchTypes';

export interface TableConfig<T = Record<string, unknown>, C = Record<string, unknown>> {
    /** 搜索配置 */
    search?: TableSearch<C>[];
    button?: ButtonType[],
    columns: TableType<T>[],
    api: (_params?: RequestType<C>) => Promise<ResponseType<T>> | ((_params?: RequestType<C>) => ResponseType<T>);
};

/** 表格 */
export interface TableType<T> {
    /** 表头 */
    label: string;
    /** 字段 */
    dataIndex: keyof T;
    /** 内容类型 */
    xtype: 'text' | 'render' | 'date' | 'dateTime';
    /** 列宽 */
    width?: string | number;
    /** 一行展示，多余部分省略号展示 */
    line?: boolean;
    /** 是否显示多选框 */
    isSelection?: boolean
};

export type RequestType<T> = {
 page: number;
 size: number;
} & Partial<T>;

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
