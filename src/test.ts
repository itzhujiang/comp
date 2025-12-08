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


// 根据一条配置，推它的最终 value 类型
type ValueOfItem<I> =
  I extends { type: 'input'; value?: infer V } ? V :
  I extends { type: 'select'; mode: 'multiple'; value?: infer V } ? V :
  I extends { type: 'select'; value?: infer V } ? V :
  never;

// 根据整份配置 C，算出 row 类型
type RowOf<C extends readonly TableSearch[]> = {
  [I in C[number] as I['dataIndex']]: ValueOfItem<I>;
};

type WithPropFn<C extends readonly TableSearch[]> = {
  [I in keyof C]:
    C[I] & {
      propFn?: (_value: ValueOfItem<C[I]>, _row: RowOf<C>) => Record<string, unknown>;
    };
};

function defineSearch<C extends readonly TableSearch[]>(config: WithPropFn<C>) {
  return config;
};

const search = defineSearch([
  {
    type: 'input',
    dataIndex: 'name',
    value: '张三',
    propFn: (value, row) => {
      row.name = 1;
      row.age = 2;
      return { maxlength: 10, showCount: true };
    },
  },
] as const);
