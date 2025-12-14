
<template>
  <div>
    <AConfigProvider :locale="locale">
      <FormComp :config="config"></FormComp>
    </AConfigProvider>
  </div>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

import { FormComp, createFormConfig } from './components/zjwComp/index';

dayjs.locale('zh-cn');
const locale = zhCN;

const config = createFormConfig({
  data: {
    name: '张三',
    age: 18,
    address: '北京市朝阳区',
    gender: 1,
    hobbies: ['jiangsu', 'nanjing', 'zhonghuamen'],
    date: '1765723404295',
    time: '12:30:00',
    dateTime: '1765723404295',
    startDateTime: '1765723404295',
    endDateTime: '1768325404295',
  },
  columns: [
    {
      label: '姓名',
      type: 'input',
      dataIndex: 'name',
      rules: [{ required: true, message: '请输入姓名' }],
    },
    {
      label: '年龄',
      type: 'select',
      mode:'multiple',
      options: [
        { label: '18', value: 18, disabled: true },
        { label: '19', value: 19 },
        { label: '20', value: 20 },
      ],
      dataIndex: 'age',
      allowClear: true,
      rules: [{ required: true, message: '请选择年龄' }],
    },
    {
      label: '地址',
      type: 'cascader',
      options: [
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
        }
      ],
      dataIndex: 'hobbies',
      placeholder: '请选择地址',
      rules: [{ required: true, message: '请选择地址' }],
      multiple: true
    },
    {
      label: '日期',
      type: 'datePicker',
      dataIndex: 'date',
      placeholder: '请选择日期',
      rules: [{ required: true, message: '请选择日期' }],
      disabledDate: (currentDate) => {
        return currentDate && currentDate > dayjs().endOf('day');
      },
    },
    {
      label: '时间',
      type: 'timePicker',
      dataIndex: 'time',
      placeholder: '请选择时间',
      rules: [{ required: true, message: '请选择时间' }],
    },
    {
      label: '日期时间',
      type: 'dateTimePicker',
      dataIndex: 'dateTime',
      placeholder: '请选择日期时间',
      rules: [{ required: true, message: '请选择日期时间' }],
    },
    {
      label: '日期时间范围',
      type: 'dataTimeRangePicker',
      dataIndex: 'startDateTime|endDateTime',
      placeholder: '开始时间|结束数据',
      rules: [{ required: true, message: '请选择日期时间范围' }],
    },
  ],
  watchEffectFn: () => {

  },
  labelCol: {
    span: 1,
  }
});

</script>

<style scoped>

</style>
