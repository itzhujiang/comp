<template>
  <div>
    <input v-model="value" type="text" style="width: 100%;"/>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'textComp'
});


const value = defineModel();

</script>

<style lang="less" scoped>

</style>
