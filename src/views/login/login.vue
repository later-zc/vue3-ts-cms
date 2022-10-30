<template>
  <div class="login">
    <login-pane />
  </div>
</template>

<script setup lang="ts">
import LoginPane from './c-cpns/login-pane.vue'
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background: url('@/assets/img/login-bg.svg') 0 0 / 100vw 100vh no-repeat;
}
</style>
