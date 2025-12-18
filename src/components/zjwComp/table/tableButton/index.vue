<template>
  <div class="button-container">
    <div>
      <AButton 
      v-for="item in config.leftBut"
      :key="item.label"
      class="left-but-item"
      :type="item.type"
      :danger="item.danger"
      :ghost="item.ghost"
      :href="item.href"
      @click="onButClick(item)"
      >
        {{ item.label }}
      </AButton>
    </div>
    <div class="but-right">
      <AButton 
      v-for="item in config.rightBut"
      :key="item.label"
      class="right-but-item"
      :type="item.type"
      :danger="item.danger"
      :ghost="item.ghost"
      :href="item.href"
      @click="onButClick(item)"
      >
        {{ item.label }}
      </AButton>
    </div>
    <PupUpFormBoxComp ref="popUpFormBoxRef"></PupUpFormBoxComp>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import PupUpFormBoxComp from '../../popUpFormBox/index.vue';
import type { ButtonType } from '../../utils/buttonType';

defineOptions({
  name: 'TableButtonCom'
});

const props = defineProps<{
  buttonConfig: {
    button: ButtonType[],
  };
}>();

const popUpFormBoxRef = ref<InstanceType<typeof PupUpFormBoxComp>>();

const config = computed(() => {
  const leftBut = props.buttonConfig.button.filter(item => item.pos === 'left');
  const rightBut = props.buttonConfig.button.filter(item => item.pos === 'right' || !item.pos);
  return {
    leftBut,
    rightBut
  };
});

/**
 * 处理按钮点击
 * @param item 当前按钮的配置对象
 */
const onButClick = (item: ButtonType) => {
  item.onClick?.(popUpFormBoxRef.value!);
};

</script>

<style lang="less" scoped>
.button-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  div{
      flex: 1;
  }
  .but-right{
    display: flex;
    justify-content: flex-end;
  }
  .left-but-item{
    margin-right: 10px;
  }
  .right-but-item {
    margin-left: 10px;
  }
}
</style>
