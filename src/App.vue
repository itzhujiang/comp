
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

import { createTableConfig, createSearchConfig } from './components/zjwComp/utils/utils';

import TestCom from '@/components/testComponent/index.vue';
import { TableComp } from '@/components/zjwComp/index';


dayjs.locale('zh-cn');


const locale = zhCN;
const config = createTableConfig({
  search: [
    {
      label:'姓名',
      type: 'input',
      placeholder: '名称',
      dataIndex: 'name',
      value: '张三',
      propFn: (value , row) => {
        return {
          maxlength: 10,
          showCount: true
        };
      }
    },
    {
      label: '性别',
      type: 'select',
      value: [1, 2],
      placeholder: '请选择性别',
      dataIndex: 'gender',
      mode: 'multiple',
      option: [
        {
          label: '男',
          value: 1
        },
        {
          disabled: true,
          label: '女',
          value: 2
        }
      ]
    },
    {
      label:'级联',
      type: 'cascader',
      dataIndex: 'cs',
      value: ['zhejiang', 'hangzhou', 'xihu'],
      option: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ]
    },
    {
      label: '日期',
      type: 'datePicker',
      placeholder: '请选择日期',
      dataIndex: 'date',
      value: 1764856306288,
      disabledDate: (currentDate) => {
        // 不能选择未来的日期
        return currentDate && currentDate > dayjs().endOf('day');
      },
    },
    {
      label:'时间',
      type: 'timePicker',
      placeholder: '请选择时间',
      dataIndex: 'time',
      value: '09:30:00',
    },
    {
      label: '日期范围',
      type: 'dataTimeRangePicker',
      placeholder: '开始时间|结束时间',
      dataIndex: 'dateRangeStart|dateRangeEnd',
      value: '1669852800000|1672531199999',
      showTime: true,
      allowClear: true,
      disabledDate: (current) => {
        const startDate = dayjs('2023-01-01');
        const endDate = dayjs('2023-12-31');
        return current && (current < startDate.startOf('day') || current > endDate.endOf('day'));
      }
    },
    {
      label: '时间范围',
      type: 'timeRangePicker',
      placeholder: '开始时间1|结束时间1',
      dataIndex: 'timeStart|timeEnd',
      value: '09:00:00|12:00:00',
    },
    {
      label: '自定义',
      type: 'customComponent',
      component: TestCom,
      dataIndex: 'testComp',
      value: '1',
    }
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
  columns: [],
  api: () => {}
} as const);

createSearchConfig([
  {
    label:'姓名',
    type: 'input',
    placeholder: '名称',
    dataIndex: 'name',
    value: '张三',
    propFn: (value, row) => {
      
      return {
        maxlength: 10,
        showCount: true
      };
    }
  },
] as const);

</script>

<style scoped>

</style>
