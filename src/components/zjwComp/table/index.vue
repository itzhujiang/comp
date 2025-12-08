<template>
  <div class='table-container'>
    <div v-if="mergeConfig.search?.length">
      <TableSearchComp :search-config="mergeConfig.search"></TableSearchComp>
    </div>
    <div v-if="mergeConfig.button?.length">
      <TableButtonComp :button-config="mergeConfig.button"></TableButtonComp>
    </div>
    <!-- <ATable

    ></ATable> -->
  </div>
</template>

<script setup lang="ts">
import type { TableConfig } from '../utils/tableType';

import TableButtonComp from './tableButton/index.vue';
import TableSearchComp from './tableSearch/index.vue';


defineOptions({
  name: 'TabelComp',
});

const defaultConfig: TableConfig = {
  search: [],
  columns: [],
  button: [],
  api: () => {}
};

const props = defineProps<{
  config: TableConfig
}>();

// 合并配置项
const mergeConfig = { ...defaultConfig, ...props.config };


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
