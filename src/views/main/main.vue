<template>
  <div class="main">
    <h2>main: {{ counterStore.counter }}-{{ counterStore.doubleCounter }}</h2>
    <button @click="changeCounter">修改counter</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()
const changeCounter = () => counterStore.changeCounterAction(10)
</script>

<style lang="less" scoped></style>
