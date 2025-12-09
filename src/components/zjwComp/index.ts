import TableComp from './table/index.vue';
import type { TableSearch } from './utils/searchTypes';
import type { TableConfig, RequestType, ResponseType } from './utils/tableType';
import { createTableConfig } from './utils/utils';


export { TableComp, createTableConfig };

export type { TableConfig, TableSearch, RequestType, ResponseType };
