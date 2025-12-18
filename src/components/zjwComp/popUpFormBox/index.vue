<!-- form弹窗 -->
<template>
  <div>
    <AModal
    v-model:open="visibleRef"
    :title="configRef?.title"
    :width="configRef?.width || 520" 
    :confirmLoading="confirmLoadingRef"
    v-bind="configRef?.props"
    @cancel="onCancel"
    @ok="onSubmitOk"
    >
        <FormComp 
        ref="formCompRef"
        :config="{
          data: configRef!.data,
          columns: configRef!.columns,
          watchEffectFn: configRef?.watchEffectFn,
          labelCol: configRef?.labelCol
        }"
        ></FormComp>
    </AModal>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { ref } from 'vue';

import FormComp from '../form/index.vue';
import type { PupUpFormBoxConfig, msgType } from '../utils/popUpFormBoxType';
import type { ResponseType } from '../utils/tableType';

defineOptions({
  name: 'PopUpFormBox'
});


const defaultConfig:PupUpFormBoxConfig = {
  title: '',
  columns: [],
  data: {},
  api: () => {
    return {
      code: 200,
      data: null,
      msg: ''
    };
  },
  beforeRequest: (params) => params,
  afterResponse: (res) => {
    return {
      isMsg: true,
      msg: res.msg,
      type: switchType(res.code)
    };
  },


};


defineExpose({
  open: <TParams extends Record<string, unknown> = Record<string, unknown>, TResponse = unknown>(config: PupUpFormBoxConfig<TParams, TResponse>) => {
    configRef.value = Object.assign({}, defaultConfig, config) as PupUpFormBoxConfig;
    visibleRef.value = true;
  }
});

const confirmLoadingRef = ref<boolean>(false);
const formCompRef = ref<InstanceType<typeof FormComp>>();
const configRef = ref<PupUpFormBoxConfig | null>(null);
const visibleRef = ref<boolean>(false);

/**
 * 点击确定
 */
const onSubmitOk = async () => {
  try {
    confirmLoadingRef.value = true;
    await formCompRef.value?.getRef()?.validate();
    const data = formCompRef.value?.getFormState();
    const params = await configRef.value?.beforeRequest?.(data || {});
    if (!params) {
      confirmLoadingRef.value = false;
      return;
    }
    const response = await configRef.value!.api(params);
    const res = await configRef.value?.afterResponse?.(response);
    if (res && res.isMsg) {
      message[res.type](res.msg);
    }
    if (response.code === 200) {
      formCompRef.value?.reset();
      visibleRef.value = false;
    }
  } catch (err) {
    console.error('报错', err);
  } finally {
    confirmLoadingRef.value = false;
  }

};

/**
 * 根据type获取对应的msg的type
 * @param code 
 */
const switchType = (code: ResponseType<unknown>['code']): msgType => {
  switch (code) {
    case 200:
      return 'success';
    case 500:
      return 'error';
    default: 
      return 'warning';
    
  }
};

/**
 * 点击取消
 */
const onCancel = () => {
  formCompRef.value?.reset();
};

</script>

<style lang="less" scoped>

</style>
