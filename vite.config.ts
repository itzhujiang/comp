import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Component from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Component({
    	resolvers: [
        // 注意:按需引入，无法引入一些非组件模块，如：message,modal等，需要自定义手动导（src/plugin/antDesign）
        AntDesignVueResolver({
       	    importStyle: false 
        })
   	 ] }) as PluginOption
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
