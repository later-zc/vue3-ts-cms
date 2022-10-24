<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<script setup lang="ts">
import request from '@/service'

request
  .get({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<style lang="less" scoped></style>
