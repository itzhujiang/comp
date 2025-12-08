type InputSearch<K extends string = string> = {
  type: 'input';
  dataIndex: K;
  value?: string;
};

type SelectSearch<K extends string = string, M extends 'multiple' | undefined = undefined> = {
  type: 'select';
  dataIndex: K;
  mode?: M;
  value?: M extends 'multiple' ? number[] : number;
};

type TableSearch = InputSearch | SelectSearch;

// 修复 ValueOfItem
type ValueOfItem<T> = T extends { type: 'input' }
  ? string | undefined
  : T extends { type: 'select'; mode: 'multiple' }
  ? number[] | undefined
  : T extends { type: 'select' }
  ? number | undefined
  : never;

// 修复 RowOf
type RowOf<C extends readonly TableSearch[]> = {
  [K in C[number]['dataIndex']]: ValueOfItem<
    Extract<C[number], { dataIndex: K }>
  >;
};

// 添加 Readonly
type WithPropFn<C extends readonly TableSearch[]> = {
  [I in keyof C]: C[I] & {
    propFn?: (
      _value: ValueOfItem<C[I]>,
      _row: RowOf<C>
    ) => Record<string, unknown>;
  };
};

function defineSearch<C extends readonly TableSearch[]>(config: WithPropFn<C>) {
  return config;
}

// 现在会报错了
const search = defineSearch([
  {
    type: 'input',
    dataIndex: 'name',
    value: '张三',
    propFn: (value, row) => {
      // Error: Cannot assign to 'name' because it is a read-only property
      row.name = 1;
      // Error: Property 'gender' does not exist on type 'Readonly<{ name: string | undefined; }>'
      row.gender = 2;
      return { maxlength: 10, showCount: true };
    },
  },
] as const);
