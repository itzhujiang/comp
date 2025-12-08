// 本文件用于创建工具函数
import type { TableSearch, WithPropFn  } from './searchTypes';
import type { TableConfig, TableType } from './tableType';
/**
 * 创建表格配置的工具函数
 */
export function createTableConfig(config:TableConfig): TableConfig  {
  return {
    columns: config.columns,
    search: createSearchConfig(config.search || []),
    api: config.api,
    button: config.button || []
  };
}

export function createSearchConfig<C extends readonly TableSearch[]>(config: WithPropFn<C>) {
  return config;
}


export const handleItemProps = (item: TableSearch, formData: Record<string, unknown>) => {
  if (!item.propFn) return item.prop || {};

  const value = formData[item.dataIndex];
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
