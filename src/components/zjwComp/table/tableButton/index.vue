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
      @click="item.onClick"
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
      @click="item.onClick"
      >
        {{ item.label }}
      </AButton>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ButtonType } from '../../utils/buttonType';

defineOptions({
  name: 'TableButtonCom'
});

const props = defineProps<{
  buttonConfig: ButtonType[];
}>();

const config = computed(() => {
  const leftBut = props.buttonConfig.filter(item => item.pos === 'left');
  const rightBut = props.buttonConfig.filter(item => item.pos === 'right' || !item.pos);
  return {
    leftBut,
    rightBut
  };
});


</script>

<style lang="less" scoped>
.button-container{
  width: 100%;
  border: 1px solid red;
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
