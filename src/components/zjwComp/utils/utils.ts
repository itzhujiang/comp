// 本文件用于创建工具函数
import type { FormTypeConfig } from './formType';
import type { TableSearch  } from './searchTypes';
import type { TableConfig } from './tableType';
/**
 * 创建表格配置的工具函数
 */
export function createTableConfig<T, C>(config:TableConfig<T, C>): TableConfig<T, C>  {
  return config;
};

/**
 * 创建表单配置的工具函数
 */
export function createFormConfig(config: FormTypeConfig): FormTypeConfig {
  return config;
}

export const handleItemprops = <C extends Record<string, unknown>>(item: TableSearch<C>, formData: Record<string, unknown>) => {
  if (!item.propsFn) return item.props || {};

  const value = formData[item.dataIndex as string];
  // 使用类型收窄
  switch (item.type) {
    case 'input':
    case 'timePicker':
      return item.propsFn(value as string, formData); // 使用类型断言是安全的
    case 'select':
    case 'cascader':
      return item.propsFn(value as string | number, formData);
    case 'datePicker':
    case 'dateTimePicker':
      return item.propsFn(value as number, formData);
    case 'dataTimeRangePicker':
      return item.propsFn(value as number[], formData);
    case 'timeRangePicker':
      return item.propsFn(value as string[], formData);
    case 'customComponent':
      return item.propsFn(value as unknown, formData);
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
