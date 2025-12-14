<!-- 表单组件 -->
<template>
  <div class="form-container">
    <AForm
      :model="formState"
      :labelCol="props.config.labelCol"
    >
        <AFormItem
          v-for="item in props.config.columns"
          :key="item.dataIndex"
          :label="item.label"
          :name="item.type === 'dataTimeRangePicker' || item.type === 'timeRangePicker' ? handleVerticalLine(item.dataIndex) : item.dataIndex"
          :rules="item.rules"
        >
          <template v-if="item.type === 'input'">
            <AInput 
            v-model:value="formState[item.dataIndex as string]"
            v-bind="item.propFn ? item.propFn(formState[item.dataIndex as string], formState) : item.prop || {}"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :showCount="item.showCount"
            :maxlength="item.maxlength"
            :allowClear="item.allowClear"
            ></AInput>
          </template>
          <template v-else-if="item.type === 'select'">
            <ASelect 
              v-model:value="formState[item.dataIndex as string]"
              v-bind="item.propFn ? item.propFn(formState[item.dataIndex as string], formState) : item.prop || {}"
             :placeholder="item.placeholder"
              :disabled="item.disabled"
              :mode="item.mode"
              :allowClear="item.allowClear"
            >
              <ASelectOption 
                v-for="option in item.options" 
                :key="option.value" 
                :value="option.value"
                :disabled="option.disabled"
                :allowClear="item.allowClear"
              >
                {{ option.label }}
              </ASelectOption>
            </ASelect>
          </template>
          <template v-else-if="item.type === 'cascader'">
            <ACascader
              v-model:value="formState[item.dataIndex as string]"
              v-bind="item.propFn ? item.propFn(formState[item.dataIndex as string], formState) : item.prop || {}"
              :options="item.options"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :multiple="item.multiple"
            ></ACascader>
          </template>
          <template v-else-if="item.type === 'datePicker'">
            <ADatePicker
                v-model:value="formState[item.dataIndex as string]"
                v-bind="item.propFn ? item.propFn(formState[item.dataIndex as string], formState) : item.prop || {}"
                :allowClear="item.allowClear"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                :showToday="item.showToday"
                :picker="item.picker"
                :disabledDate="item.disabledDate"
                valueFormat="x"
                style="width: 100%;"
              ></ADatePicker>
          </template>
          <template v-else-if="item.type === 'timePicker'">
             <ATimePicker
                v-model:value="formState[item.dataIndex as string]"
                v-bind="item.propFn ? item.propFn(formState[item.dataIndex as string], formState) : item.prop || {}"
                :placeholder="item.placeholder"
                :allowClear="item.allowClear"
                :format="item.format || 'HH:mm:ss'"
                :disabled="item.disabled"
                :showNow="item.showNow"
                :secondStep="item.secondStep"
                :hourStep="item.hourStep"
                :minuteStep="item.minuteStep"
                style="width: 100%;"
                :valueFormat="item.format || 'HH:mm:ss'"
              ></ATimePicker>
          </template>
          <template v-else-if="item.type === 'dateTimePicker'">
            <ADatePicker 
             v-model:value="formState[item.dataIndex as string]"
             v-bind="item.propFn ? item.propFn(formState[item.dataIndex as string], formState) : item.prop || {}"
             show-time
             :placeholder="item.placeholder"
             :disabled="item.disabled"
             :disabledDate="item.disabledDate"
             :disabledTime="item.disabledTime"
              valueFormat="x"
              :showToday="item.showToday"
              :allowClear="item.allowClear"
              style="width: 100%;"
            />
          </template>
          <template v-else-if="item.type === 'dataTimeRangePicker'">
            <div>
              <DateTimeRangePickerComp
                :config="{
                  ...item,
                  valueObj: formState
                }"
                :model-value="{
                  start: formState[handleVerticalLine(item.dataIndex)[0] as string] as string | number | undefined,
                  end: formState[handleVerticalLine(item.dataIndex)[1] as string] as string | number | undefined
                }"
                 @update:modelValue="(value) => onFormStateUpdate(item, value)"
              ></DateTimeRangePickerComp>
            </div>
          </template>
        </AFormItem>
    </AForm>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { reactive } from 'vue';

import DateTimeRangePickerComp from '../dateTimeRangePicker/index.vue';
import type { FormTypeConfig, DataTimeRangePickerFormType, TimeRangePickerFormType } from '../utils/formType';
import { handleVerticalLine } from '../utils/utils';

defineOptions({
  name: 'FormComp'
});

const props = defineProps<{
  config: FormTypeConfig
}>();

const formState = reactive<Record<string, unknown>>({});
const backupFormState: Record<string, unknown> = {};

const handlePropsToFormState = () => {
  const data = cloneDeep(props.config.data);
  props.config.columns.forEach(item => {
    if (item.type === 'dataTimeRangePicker' || item.type === 'timeRangePicker') {
      const dataIndexArr = handleVerticalLine(item.dataIndex);
      if (dataIndexArr[0]) {
        formState[dataIndexArr[0]] = data[dataIndexArr[0]] || '';
        backupFormState[dataIndexArr[0]] = data[dataIndexArr[0]] || '';
      }
      if (dataIndexArr[1]) {
        formState[dataIndexArr[1]] = data[dataIndexArr[1]] || '';
        backupFormState[dataIndexArr[1]] = data[dataIndexArr[1]] || '';
      }
    } else {
      const dataIndex = item.dataIndex as string;
      formState[dataIndex] = data[dataIndex] || '';
      backupFormState[dataIndex] = data[dataIndex] || '';
    }
  });
  
};

handlePropsToFormState();

/**
 * 修改formState的值
 * @param item
 */
const onFormStateUpdate = (item: DataTimeRangePickerFormType | TimeRangePickerFormType, value: { start: string | number | undefined; end: string | number | undefined }) => {
  const dataIndexArr = handleVerticalLine(item.dataIndex as string);
  formState[dataIndexArr[0]!] = value.start;
  formState[dataIndexArr[1]!] = value.end;
};
</script>

<style lang="less" scoped>
.form-container{
    width: 100%;
    height: 100%;
}
</style>
