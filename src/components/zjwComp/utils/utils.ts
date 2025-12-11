// 本文件用于创建工具函数
import type { TableSearch  } from './searchTypes';
import type { TableConfig } from './tableType';
/**
 * 创建表格配置的工具函数
 */
export function createTableConfig<T, C>(config:TableConfig<T, C>): TableConfig<T, C>  {
  return config;
};


export const handleItemProps = <C extends Record<string, unknown>>(item: TableSearch<C>, formData: Record<string, unknown>) => {
  if (!item.propFn) return item.prop || {};

  const value = formData[item.dataIndex as string];
  // 使用类型收窄
  switch (item.type) {
    case 'input':
    case 'timePicker':
      return item.propFn(value as string, formData); // 使用类型断言是安全的
    case 'select':
    case 'cascader':
      return item.propFn(value as string | number, formData);
    case 'datePicker':
    case 'dateTimePicker':
      return item.propFn(value as number, formData);
    case 'dataTimeRangePicker':
      return item.propFn(value as number[], formData);
    case 'timeRangePicker':
      return item.propFn(value as string[], formData);
    case 'customComponent':
      return item.propFn(value as unknown, formData);
    default:
      return {};
  }
};

/**
 * 处理字符串数据中的 | 符号，返回数组
 */
export const handleVerticalLine = (text?: string): string[] => {
  if (!text || !text.includes('|')) {
    return ['', ''];
  }
  return text.split('|');
};
