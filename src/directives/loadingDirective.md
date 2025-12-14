# Loading 指令使用说明

基于 `loading.json` 创建的自定义 Vue 3 指令，用于显示加载动画效果。

## 功能特点

- 🎨 使用 Lottie 动画，视觉效果优美
- 🎯 支持布尔值和配置对象两种使用方式
- 🔧 可自定义动画大小、背景颜色和透明度
- 💫 自动创建遮罩层，阻止用户交互
- 🚀 支持动态切换加载状态
- 📱 响应式设计，自适应容器大小

## 安装和注册

### 1. 指令已自动注册

在 `main.ts` 中已经通过插件形式自动注册：

```typescript
import { LoadingPlugin } from '@/components/zjwComp/utils/loadingDirective';

const app = createApp(App);
app.use(LoadingPlugin);
```

## 使用方法

### 1. 基础用法

```vue
<template>
  <!-- 简单的开关控制 -->
  <div v-loading="isLoading">
    <!-- 内容区域 -->
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);
</script>
```

### 2. 自定义配置

```vue
<template>
  <!-- 使用配置对象自定义样式 -->
  <div v-loading="loadingConfig">
    <!-- 内容区域 -->
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loadingConfig = ref({
  width: 80,        // 动画宽度 (默认: 60)
  height: 80,       // 动画高度 (默认: 60)
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // 背景色 (默认: rgba(255, 255, 255, 0.9))
  opacity: 0.9      // 遮罩层透明度 (默认: 0.8)
});
</script>
```

### 3. 在异步操作中使用

```vue
<template>
  <button @click="handleSubmit" v-loading="isSubmitting">
    提交
  </button>
</template>

<script setup>
import { ref } from 'vue';

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    await submitData();
  } finally {
    isSubmitting.value = false;
  }
};
</script>
```

### 4. 在表格中使用

```vue
<template>
  <a-table
    :columns="columns"
    :data-source="data"
    v-loading="tableLoading"
  />
</template>

<script setup>
import { ref } from 'vue';

const tableLoading = ref(false);
const data = ref([]);

const loadData = async () => {
  tableLoading.value = true;

  try {
    const result = await fetchData();
    data.value = result;
  } finally {
    tableLoading.value = false;
  }
};
</script>
```

### 5. 动态配置

```vue
<template>
  <div v-loading="dynamicConfig">
    <!-- 内容 -->
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dynamicConfig = ref({
  width: 60,
  height: 60,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  opacity: 0.8
});

// 动态更新配置
const updateConfig = () => {
  dynamicConfig.value = {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(24, 144, 255, 0.1)',
    opacity: 0.95
  };
};
</script>
```

## 配置选项

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| width | number | 60 | 动画宽度（像素） |
| height | number | 60 | 动画高度（像素） |
| backgroundColor | string | rgba(255, 255, 255, 0.9) | 遮罩层背景色 |
| opacity | number | 0.8 | 遮罩层透明度（0-1） |

## 注意事项

1. **自动定位**: 指令会自动为父元素添加 `position: relative`（如果原本是 `static`）
2. **交互阻止**: 加载状态下会自动禁用容器的鼠标事件
3. **内存清理**: 指令销毁时会自动清理 Lottie 实例和 DOM 元素
4. **响应式**: 支持动态切换配置和状态
5. **兼容性**: 需要支持 CSS position 属性的现代浏览器
