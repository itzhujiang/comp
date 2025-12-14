import FormComp from './form/index.vue';
import TableComp from './table/index.vue';
import type { TableSearch } from './utils/searchTypes';
import type { TableConfig, RequestType, ResponseType } from './utils/tableType';
import { createTableConfig, createFormConfig } from './utils/utils';


export { TableComp, createTableConfig, FormComp, createFormConfig };

export type { TableConfig, TableSearch, RequestType, ResponseType };
