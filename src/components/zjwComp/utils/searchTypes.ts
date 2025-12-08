import type { Dayjs } from 'dayjs';
import type { Component } from 'vue';

export type ValueOfItem<I> =
  I extends { type: 'input'; value?: infer V } ? V :
  I extends { type: 'select'; mode: 'multiple'; value?: infer V } ? V :
  I extends { type: 'dataTimeRangePicker'} ? number[] :
  I extends { type: 'timeRangePicker' } ? string[] :
  I extends { type: 'customComponent' } ? unknown :
  never;

type RowOf<C extends readonly TableSearch[]> = {
  [I in C[number] as I['dataIndex']]: ValueOfItem<I>;
};

export type WithPropFn<C extends readonly TableSearch[]> = {
  [I in keyof C]:
    C[I] & {
      propFn?: (_value: ValueOfItem<C[I]>, _row: RowOf<C>) => Record<string, unknown>;
    };
};


export type SearchType = 'select' | 'input' | 'cascader' | 'datePicker' | 'timePicker' | 'dateTimePicker' | 'dataTimeRangePicker' | 'timeRangePicker' | 'customComponent';

/** 基础搜索配置 */
type BaseTableSearch = {
    type: SearchType;
    /** 搜索字段 */
    dataIndex: string;
    /** 搜索标题 */
    label?: string;
    /** 占位符 */
    placeholder?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 设置值 */
    value?: string | number | undefined;
    /** 栅栏占位数 */
    span?: number;
    /** 其他属性 */
    prop?: Record<string, unknown>;
    // propFn?: () => Record<string, unknown>
};


/** 选项类型 */
export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}


/**
 * mode 到 value 类型的映射 - 当添加新的 mode 时，只需在这里添加映射
 */
export type SelectModeValueMap = {
    multiple: number[] | string[] | undefined;
};

/** mode 类型定义 - 可以轻松扩展新的 mode 类型 */
export type SelectMode = keyof SelectModeValueMap;

/** Select 类型的搜索配置基础类型 */
type SelectTableSearchBase = Omit<BaseTableSearch, 'value'> & {
    /** 搜索类型 */
    type: 'select';
    /** 选项列表（select 类型必填） */
    option: SelectOption[];
    /** 是否支持清除 */
    allowClear?: boolean;
};

/** Select 类型的搜索配置 - 多选模式 */
type SelectTableSearchWithMode<TMode extends SelectMode> = SelectTableSearchBase & {
    mode: TMode;
    value?: SelectModeValueMap[TMode];
};

/** Select 类型的搜索配置 - 单选模式（无 mode） */
type SelectTableSearchWithoutMode = SelectTableSearchBase & {
    mode?: undefined;
    value?: string | number | undefined;
};

/** Select 类型的搜索配置（必须包含 option）- 使用类型体操自动推导 */
export type SelectTableSearch = 
    | SelectTableSearchWithoutMode
    | (SelectMode extends infer Mode ? Mode extends SelectMode ? SelectTableSearchWithMode<Mode> : never : never);

/** cascader的option */
export type CascaderOption = SelectOption & {
    /** 子节点 */
    children?:CascaderOption[];
} 

/** cascader类型的搜索配置（必须包含option） */
export type CascaderTableSearch = Omit<BaseTableSearch, 'value'> & {
    /** 搜索类型 */
    type: 'cascader';
    value: string[] | number[] | undefined;
    /** 是否支持清除 */
    allowClear?: boolean;
    /** 是否多选 */
    multiple?: boolean;
    /** 选项列表 */
    option: CascaderOption[];
};


export type Picker = 'week' | 'month' | 'quarter' | 'year';

/** datePicker类型的搜索配置 */
export type DatePickerTableSerch = BaseTableSearch & {
    type: 'datePicker',
    /** 模式 */
    picker?: Picker;
    /** 是否显示“今天”按钮 */
    showToday?: boolean;
    disabledDate?: (_currentDate: Dayjs) => boolean;
};

type DisabledTime = (_now: Dayjs) => {
    disabledHours?: () => number[];
    disabledMinutes?: (_selectedHour: number) => number[];
    disabledSeconds?: (_selectedHour: number, _selectedMinute: number) => number[];
};

/** timePicker类型的搜索配置 */
export type TimePickerTableSearch = BaseTableSearch & {
    type: 'timePicker',
    format?: string
    /** 面板是否显示“此刻”按钮 */
    showNow?: boolean;
    /** 秒选项间隔 */
    secondStep?: number;
    /** 小时选项间隔 */
    hourStep?: number;
    /** 分钟选项间隔 */
    minuteStep?: number;
    
    /** 不可选择的时间 */
    disabledTime?: DisabledTime
}

/** dateTimePicker类型的搜索配置 */
export type DateTimePickerTableSearch = BaseTableSearch & {
    type: 'dateTimePicker';
    /** 不可选择的日期 */
    disabledDate?: (_currentDate: Dayjs) => boolean;
    /** 不可选择的时间 */
    disabledTime?: DisabledTime
};


type DateTimerangePickerDisabledTime = (
    _date: Dayjs,
    _type: 'start' | 'end',
  ) => boolean

export type DateTimerangePickerTableSearch = Omit<BaseTableSearch, 'dataIndex' | 'placeholder' | 'value'> & {
    type: 'dataTimeRangePicker';
    /** 是否显示清除 */
    allowClear?: boolean;
    /** 是否显示时间 */
    showTime?: boolean;
    dataIndex: `${string}|${string}`;
    placeholder?: `${string}|${string}`;
    value?: `${string}|${string}`;
    picker?: Picker;
    /** 不可选择的日期 */
    disabledDate?: (_currentDate: Dayjs) => boolean;
    disabledTime?: DateTimerangePickerDisabledTime,
}

type RangeDisabledTime = (
    _now: Dayjs,
    _type: 'start' | 'end',
  ) => {
    disabledHours?: () => number[];
    disabledMinutes?: (_selectedHour: number) => number[];
    disabledSeconds?: (_selectedHour: number, _selectedMinute: number) => number[];
  }

export type TimeRangePickerTableSearch = Omit<BaseTableSearch, 'dataIndex' | 'placeholder' | 'value'> & {
    type: 'timeRangePicker';
    dataIndex: `${string}|${string}`;
    placeholder?: `${string}|${string}`;
    value?: `${string}|${string}`;
    format?: string;
    /** 不可选择的时间	 */
    disabledTime?: RangeDisabledTime;
    /** 秒选项间隔 */
    secondStep?: number;
    /** 小时选项间隔 */
    hourStep?: number;
    /** 分钟选项间隔 */
    minuteStep?: number;

}

export type CustomComponentTableSearch = Omit<BaseTableSearch, 'disabled'> & {
     type: 'customComponent';
     component: Component
} & Record<string, unknown>


export type InputTableSearch = BaseTableSearch & {
    type: 'input';
    /** 是否显示字数统计 */
    showCount?: boolean;
    /** 最大输入长度 */
    maxlength?: number;
}


/** 搜索配置联合类型 */
export type TableSearch = SelectTableSearch | InputTableSearch | CascaderTableSearch | DatePickerTableSerch | TimePickerTableSearch | DateTimePickerTableSearch | DateTimerangePickerTableSearch | TimeRangePickerTableSearch | CustomComponentTableSearch;

