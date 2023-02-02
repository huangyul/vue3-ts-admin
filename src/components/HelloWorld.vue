<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const text = ref(__TEST_CONST__);
console.log(text);

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
