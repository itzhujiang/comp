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
    <!-- <ATable

    ></ATable> -->
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
}
</style>
