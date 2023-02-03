<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { ref } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { ElConfigProvider } from "element-plus";

const locale = ref(zhCn);
</script>

<template>
  <el-config-provider :locale="locale">
    <HelloWorld msg="" />
    <ElButton>button</ElButton>
  </el-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
