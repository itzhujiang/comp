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
      v-loading="loadingRef"
      class="a-table"
      :columns="mergedColumns"
      :dataSource="tableDataRef"
      :scroll="Object.assign({ y: 600 }, config.scroll)"
      :pagination="false"
    >
     <template #bodyCell="{ column, text, record }" >
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
       <template v-if="column.xtype === 'date'">
        {{ dayjs(text).format('YYYY-MM-DD') }}
       </template>
       <template v-if="column.xtype === 'dateTime'">
        {{ dayjs(text).format('YYYY-MM-DD HH:mm:ss') }}
       </template>
       <template v-if="column.xtype === 'operate'">
        <AButton 
          v-for="item in config.operate" 
          :key="item.label" 
          :type="item.type" 
          :danger="item.danger" 
          :ghost="item.ghost" 
          :href="item.href" 
          @click="() => item.onClick(record, tableDataRef!)"
        >
          {{ item.label }}
        </AButton>
       </template>
     </template>
    </ATable>
    <APagination
     v-if="config.pagination?.isShow"
    style="margin-top: 20px;"
    :current="paginationRef.page"
    :pageSizeOptions="config.pagination.pageSizeOptions || ['10','20','50','100']"
    show-quick-jumper
    :total="paginationRef.total"
    :hideOnSinglePage="true"
    @change="onPaginationChange" />
  </div>
</template>

<script setup lang="ts"  generic="T = Record<string, unknown>">
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

import type { TableConfig, InternalTableType } from '../utils/tableType';

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

const loadingRef = ref(false);

// 合并用户配置的列和内部操作列
const mergedColumns = computed<InternalTableType<T>[]>(() => {
  const columns: InternalTableType<T>[] = [...props.config.columns];

  // 如果有操作配置，添加操作列
  if (props.config.operate && props.config.operate.length > 0) {
    columns.push({
      title: '操作',
      dataIndex: '' as Extract<keyof T, string>,
      xtype: 'operate',
      fixed: props.config.operateFixed ? 'right' : undefined,
      width: props.config.operateWidth || 200,
    });
  }
  return columns;
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
  handleRequest({ ...search, page: 1, size: paginationRef.value.size });
};

/**
 * 分页变化
 * @param page 当前页
 * @param pageSize 每页条数
 */
const onPaginationChange = async (page: number, pageSize: number) => {
  if (pageSize !== paginationRef.value.size) {
    paginationRef.value.size = pageSize;
    paginationRef.value.page = 1;
  } else {
    paginationRef.value.page = page;
  }
  await handleRequest({ ...tableSearchCompRef.value?.getSearch(), page: paginationRef.value.page, size: paginationRef.value.size });
};

/**
 * 处理请求
 */
const handleRequest = async (params: Record<string, unknown>) => {
  loadingRef.value = true;
  const res = await props.config.api({
    page: 1,
    size: 10,
    ...params,
  });
  console.log('请求结果：', res);
  tableDataRef.value = res.data.data;
  paginationRef.value.total = res.data.pagination.total;
  loadingRef.value = false;
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
  .a-table{
    margin-top: 10px;
  }

}
</style>
