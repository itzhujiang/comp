
<template>
  <div>
    <AConfigProvider :locale="locale">
      <PopUpFormBoxComp ref="popUpFormBoxCompRef"></PopUpFormBoxComp>
      <AButton @click="onOpenClick">打开</AButton>
    </AConfigProvider>
  </div>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import { ref } from 'vue';

import { addStudent } from '@/api/student';
import { PopUpFormBoxComp } from '@/components/zjwComp/index';


dayjs.locale('zh-cn');
const locale = zhCN;

const popUpFormBoxCompRef = ref<InstanceType<typeof PopUpFormBoxComp>>();

const onOpenClick = () => {
  popUpFormBoxCompRef.value?.open({
    title: '添加学生',
    data: {
      name: '',
      studentNo: '',
      age: '',
      gender: 'male',
      class: '',
      grade: '',
      phone: '',
      email: '',
      address: '',
      status: 'active'
    },
    columns: [
      {
        label: '姓名',
        type: 'input',
        dataIndex: 'name',
        placeholder: '请输入姓名',
        rules: [{ required: true, message: '请输入姓名' }],
      },
      {
        label: '学号',
        type: 'input',
        dataIndex: 'studentNo',
        placeholder: '请输入学号'
      },
      {
        label: '性别',
        type: 'radio',
        dataIndex: 'gender',
        options: [
          {
            label: '男',
            value: 'male'
          },
          {
            label: '女',
            value: 'female'
          }
        ]
      },
      {
        label: '班级',
        dataIndex: 'class',
        type: 'input',
        placeholder: '请输入班级'
      },
      {
        label: '年级',
        type: 'input',
        dataIndex: 'grade',
        placeholder: '请输入年级'
      },
      {
        label: '手机号',
        type: 'input',
        dataIndex: 'phone',
        placeholder: '请输入手机号'
      },
      {
        label: '地址',
        type: 'input',
        dataIndex: 'address',
        placeholder: '请输入地址'
      },
      {
        label: '状态',
        type: 'radio',
        dataIndex: 'status',
        options: [
          {
            label: '上学中',
            value: 'active'
          },
          {
            label: '未上学',
            value: 'inactive'
          },
          {
            label: '毕业',
            value: 'graduated'
          }
        ]
      }
    ],
    watchEffectFn: (data) => {
      console.log(data);
    },
    beforeRequest: (param) => {
      return param;
    },
    afterResponse: (res) => {
      console.log(res);
      return {
        isMsg: false
      };
    },
    api: addStudent,
    labelCol: {
      span:4,
    }
  });
};

</script>

<style scoped>

</style>
