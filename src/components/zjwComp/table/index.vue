<template>
  <div class='table-container'>
    <div v-if="config.search?.length">
      <TableSearchComp
        ref="tableSearchCompRef"
        :search-config="config.search"
        @search="onSearchClick"
      ></TableSearchComp>
    </div>
    <div v-if="config.button?.length">
      <TableButtonComp :button-config="config.button"></TableButtonComp>
    </div>
    <ATable
      :columns="config.columns"
      :dataSource="tableDataRef"
      :scroll="Object.assign({ y: 600 }, config.scroll)"
    >
     <template  #bodyCell="{ column, text, record }" >
       <template v-if="column.xtype === 'render'">
         <div  v-html="column.render(text, record, column)"></div>
       </template>
       <template v-if="column.xtype === 'text'">
         <ATooltip v-if="column.line">
          <template #title>
            <div>{{ text }}</div>
          </template>
          <div 
            class="ellipsis"
            :style="{
              width: column.width ? column.width + 'px' : 'auto',
            }">
            {{ text }}
          </div>
         </ATooltip>
       </template>
     </template>
    </ATable>
  </div>
</template>

<script setup lang="ts"  generic="T = Record<string, unknown>">
import { onMounted, ref } from 'vue';

import type { TableConfig } from '../utils/tableType';

import TableButtonComp from './tableButton/index.vue';
import TableSearchComp from './tableSearch/index.vue';


defineOptions({
  name: 'TabelComp',
});

const props = defineProps<{
  config: TableConfig<T>
}>();
const tableSearchCompRef = ref<InstanceType<typeof TableSearchComp>>(); // 搜索组件实例
const tableDataRef = ref<T[]>(); // 表格数据

const paginationRef = ref({
  page: 1,
  size: 10,
  total: 0,
});

onMounted(async () => {
  const res = tableSearchCompRef.value?.getSearch();
  await handleRequest(res || {});
});

/**
 * 搜索
 * @param search 搜索参数对象
 */
const onSearchClick = (search: Record<string, string | number | undefined>) => {
  console.log('搜索参数：', search);
};

/**
 * 处理请求
 */
const handleRequest = async (params: Record<string, unknown>) => {
  const res = await props.config.api({
    page: 1,
    size: 10,
    ...params,
  });
  console.log('请求结果：', res);
  tableDataRef.value = res.data.data;
  paginationRef.value.total = res.data.pagination.total;
};


</script>

<style scoped lang="less">
.table-container {
  padding: 16px;
  
  // Less 嵌套语法示例
  .table-header {
    margin-bottom: 16px;
  }
  .ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
