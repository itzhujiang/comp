
<template>
  <div>
    <AConfigProvider :locale="locale">
      <TableComp :config="config" />
    </AConfigProvider>
  </div>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

import { createTableConfig } from './components/zjwComp/utils/utils';

import type { Student, StudentSearchParams } from '@/api/student';
import { getStudentList } from '@/api/student';
import { TableComp } from '@/components/zjwComp/index';
dayjs.locale('zh-cn');

const locale = zhCN;
const config = createTableConfig<Student, StudentSearchParams>({
  search: [
    {
      type: 'input',
      placeholder: '名称',
      dataIndex: 'name',
      propFn: () => {
        return {
          maxlength: 10,
          showCount: true
        };
      }
    },
  ],
  button: [
    {
      label: '新增',
      pos: 'right',
      type: 'primary',
      onClick: () => {
        
      }
    },
    {
      label: '导出',
      type: 'primary',
      pos:'left',
      danger: true,
      onClick: () => {
        
      }
    }
  ],
  columns: [
    {
      label: 'id',
      dataIndex: 'id',
      xtype: 'text',
      width: 20
    }, 
    {
      label: '名称',
      dataIndex: 'name',
      xtype: 'text',
    }, 
    {
      label: '年龄',
      dataIndex: 'age',
      xtype: 'render',
     
      
    }
  ],
  api: getStudentList
});


</script>

<style scoped>

</style>
