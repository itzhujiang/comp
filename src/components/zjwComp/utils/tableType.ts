// 作用：书写表格区域的类型
import type { ButtonType } from './buttonType';
import type { TableSearch } from './searchTypes';

export interface TableConfig {
    /** 搜索配置 */
    search?: TableSearch[];
    button?: ButtonType[],
    columns: TableType[],
    api: () => void;
};

/** 表格 */
export interface TableType {
    /** 表头 */
    label: string;
    /** 字段 */
    dataIndex: string;
    /** 内容类型 */
    xtype: 'text' | 'render' | 'date' | 'dateTime';
    /** 列宽 */
    width?: string | number;
    /** 一行展示，多余部分省略号展示 */
    line?: boolean;
    /** 是否显示多选框 */
    isSelection?: boolean
};
