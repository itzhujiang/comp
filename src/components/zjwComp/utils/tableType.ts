// 作用：书写表格区域的类型
import type { ButtonType } from './buttonType';
import type { TableSearch } from './searchTypes';

export interface TableConfig {
    /** 搜索配置 */
    search?: TableSearch[];
    button?: ButtonType[],
    columns: string[]
};
