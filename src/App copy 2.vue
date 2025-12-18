<template>
  <div>
    <AConfigProvider :locale="locale">
      <FormComp ref="formCompRef" :config="config" ></FormComp>
      <AButton type="primary" @click="onGetDataClick">获取数据</AButton>
      <AButton type="primary" @click="onCheckClcik">校验</AButton>
      <AButton type="primary" @click="onResetClcik">重置2</AButton>
    </AConfigProvider>
  </div>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import { ref } from 'vue';

import testComp from './components/testComponent/index.vue';
import { FormComp, createFormConfig } from './components/zjwComp/index';

dayjs.locale('zh-cn');
const locale = zhCN;

const formCompRef = ref<InstanceType<typeof FormComp>>();

const config = createFormConfig({
  data: {
    name: '',
    age: 18,
    address: '北京市朝阳区',
    gender: 1,
    hobbies: ['jiangsu', 'nanjing', 'zhonghuamen'],
    date: '1765723404295',
    time: '12:30:00',
    dateTime: '1765723404295',
    startDateTime: '1765723404295',
    endDateTime: '1768325404295',
    startTime: '07:00:00',
    endTime: '12:00:00',
    checkbox: '',
    component: '',
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
      placeholder: '开始日期时间|结束日期时间',
      rules: [{ required: true, message: '请选择日期时间范围' }],
    },
    {
      label: '时间范围',
      type: 'timeRangePicker',
      dataIndex: 'startTime|endTime',
      placeholder: '开始时间|结束时间',
      rules: [{ required: true, message: '请选择时间范围' }],
    },
    {
      label: '多选',
      type: 'checkbox',
      dataIndex: 'checkbox',
      options: [
        { label: 'Apple', value: 'Apple', disabled: true },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ],
      rules: [{ required: true, message: '请选择' }],
    },
    {
      label: '单选',
      type: 'radio',
      dataIndex: 'radio',
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true },
      ]
    },
    {
      label: '数字',
      type: 'number',
      dataIndex: 'number',
      min: 1,
      step: 2,
      placeholder: '请输入数字',
      precision: 2
    },
    {
      label: '自定义',
      type: 'component',
      component: testComp,
      dataIndex: 'component',
    },
    {
      label: '文本域',
      type: 'textarea',
      dataIndex: 'textarea',
      placeholder: '请输入文本域',
      showCount: true
    }
  ],
  watchEffectFn: (data) => {
    console.log(data);
    data.name  = '张三';
    data.component = '张三';
  },
  labelCol: {
    span: 1,
  }
});

const onGetDataClick = () => {
  console.log('获取数据', formCompRef.value?.getFormState());
  
};

const onCheckClcik = () => {
  formCompRef.value?.getRef()?.validate();
  
};

const onResetClcik = () => {
  formCompRef.value?.reset();
};

</script>

<style scoped>

</style>
