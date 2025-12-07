# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Vue 3 + TypeScript + Vite 的组件库项目，主要提供可配置的表格组件（zjwComp），支持多种搜索表单配置。项目使用 Ant Design Vue 作为 UI 组件库。

## 常用开发命令

```bash
# 开发环境启动
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview

# ESLint 代码检查
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix
```

## 项目架构

### 核心组件结构
- **src/components/zjwComp/**: 主要组件库目录
  - **table/index.vue**: 表格主组件入口
  - **table/tableSearch/**: 搜索表单组件子目录
  - **utils/**: 工具函数和类型定义
    - **searchTypes.ts**: 搜索表单相关 TypeScript 类型定义
    - **utils.ts**: 通用工具函数

### 技术栈特点
- **Vue 3**: 使用 Composition API 和 `<script setup>` 语法
- **TypeScript**: 严格的类型系统，完整的类型定义
- **Ant Design Vue**: 按需引入的 UI 组件库
- **Vite**: 使用 rolldown-vite 构建工具
- **Less**: CSS 预处理器

### 配置文件特点
- **vite.config.ts**: 配置了 Ant Design Vue 按需引入解析器
- **eslint.config.mjs**: 完整的 ESLint 规则配置，包含 Vue 和 TypeScript 支持
- **tsconfig**: 分离的 TypeScript 配置（应用层和 Node 层）

## 核心类型系统

项目有复杂的 TypeScript 类型定义，主要在 `src/components/zjwComp/utils/searchTypes.ts`：

- **TableConfig**: 表格组件的主配置接口
- **TableSearch**: 联合类型，支持多种搜索表单控件：
  - `input`: 文本输入框
  - `select`: 下拉选择
  - `cascader`: 级联选择
  - `datePicker`: 日期选择
  - `timePicker`: 时间选择
  - `dateTimePicker`: 日期时间选择
  - `dataTimeRangePicker`: 日期时间范围选择
  - `timeRangePicker`: 时间范围选择

每个搜索类型都有对应的配置接口和特定的属性定义。

## 组件使用模式

组件采用配置驱动的设计模式：

```typescript
const config: TableConfig = {
  search: [
    {
      label: '姓名',
      type: 'input',
      placeholder: '名称',
      dataIndex: 'name',
      propFn: () => ({
        maxlength: 10,
        showCount: true
      })
    },
    {
      label: '时间',
      type: 'dataTimeRangePicker',
      placeholder: '请选择时间',
      dataIndex: 'state|end'
    }
  ],
  columns: []
};
```

## 代码规范

项目使用严格的 ESLint 配置，包含但不限于：
- 禁用 `var`，优先使用 `const/let`
- TypeScript 类型检查
- Vue 3 组合式 API 规范
- 导入导出规范

## 注意事项

- Ant Design Vue 的非组件模块（如 message、modal）需要手动导入，无法通过按需引入自动处理
- 项目使用 `@` 别名指向 `src` 目录
- 组件支持通过 `propFn` 动态配置组件属性
- 支持复杂的搜索表单配置，包括范围选择、级联选择等高级功能