
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
      title: 'id',
      dataIndex: 'id',
      xtype: 'text',
      width: 50
    }, 
    {
      title: '名称',
      dataIndex: 'name',
      xtype: 'text',
      line: true
    }, 
    {
      title: '年龄',
      dataIndex: 'age',
      xtype: 'render',
      render: (_value, row) => {
        return `${row.age} 岁`;
      },
    },
    {
      title: '日期',
      dataIndex: 'enrollmentDate',
      xtype: 'date',
    },
    {
      title: '出生日期',
      dataIndex: 'date',
      xtype: 'dateTime'
    }
  ],
  api: getStudentList,
  
});


</script>

<style scoped>

</style>
