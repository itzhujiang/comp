// 作用：书写表格区域的类型
import type { ButtonType } from './buttonType';
import type { TableSearch } from './searchTypes';

export interface TableConfig<T = Record<string, unknown>, C = Record<string, unknown>> {
    /** 搜索配置 */
    search: TableSearch<C>[];
    /** 按钮配置 */
    button?: ButtonType[],
    /** 表格列配置 */
    columns: TableType<T>[],
    /** 数据请求函数 */
    api: ((_params: RequestType<C>) => Promise<ResponseType<T>>) | ((_params: RequestType<C>) => ResponseType<T>);
    scroll?: {
        x?: number;
        y?: number;
    },
    /** 操作列配置 */
    operate?: OperateType<T>[];
    /** 操作列宽度 */
    operateWidth?: number;
    /** 操作列是否固定 */
    operateFixed?: boolean;
    /** 分页 */
    pagination?: PaginationType;
};


/** 表格基础类型 */
export interface BaseTableType<T> {
    /** 表头 */
    title: string;
    /** 字段 */
    dataIndex: Extract<keyof T, string>;
    /** 列宽 */
    width?: string | number;
   
    /** 是否显示多选框 */
    isSelection?: boolean
}

/** 表格 - 简单类型（文本、日期、日期时间） */
export type SimpleTableType<T> = BaseTableType<T> & {
    /** 内容类型 */
    xtype:  'date' | 'dateTime';
}

export type TextTableType<T> = BaseTableType<T> & {
    /** 内容类型 */
    xtype: 'text';
    /** 一行展示，多余部分省略号展示 */
    line?: boolean;
}

/** 表格 - 自定义渲染类型 */
export interface RenderTableType<T> extends BaseTableType<T> {
    /** 内容类型 */
    xtype: 'render';
    /** 自定义渲染函数 */
    render: (_value: unknown, _row: T, _data: T[]) => string | unknown;
}

/** 操作列 */
export interface OperateTableType<T> extends BaseTableType<T> {
    /** 内容类型 */
    xtype: 'operate';
    fixed?: 'right';
}

/** 表格类型联合 */
export type TableType<T> = SimpleTableType<T> | RenderTableType<T> | TextTableType<T>;

/** 组件内部使用的完整表格类型联合（包含操作列） */
export type InternalTableType<T> = TableType<T> | OperateTableType<T>;

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

/** 操作列配置 */

export interface OperateType<T> {
    label: string;
    onClick: (_row: T, _data: T[]) => void;
    type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text'
    /** 是否设置为危险按钮 */
    danger?: boolean;
    /** 幽灵属性，使按钮背景透明 */
    ghost?: boolean;
    /** 跳转 */
    href?: boolean;
}

/** 分页配置 */
export interface PaginationType {
    /** 是否显示分页 */
    isShow?: boolean;
    /** 每页条数 */
    pageSizeOptions?: string[];
};
