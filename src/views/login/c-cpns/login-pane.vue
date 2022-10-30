<template>
  <div class="login-pane">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <account-pane ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <phone-pane />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox
        v-model="isRememberPassword"
        label="记住密码"
        size="large"
        @change="changeHandler"
      />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="loginHandler"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxValueType } from 'element-plus'

import AccountPane from './account-pane.vue'
import PhonePane from './phone-pane.vue'
import { localCache } from '@/utils/cache'
import { CACHE_IS_MEMEMBER_PASSWORD } from '@/global/constant'

const activeName = ref('account')
const isRememberPassword = ref<boolean>(
  localCache.getCache(CACHE_IS_MEMEMBER_PASSWORD) ?? false
)
const accountRef = ref<InstanceType<typeof AccountPane>>()

const loginHandler = () => {
  if (activeName.value == 'account') {
    console.log('用户登录')
    accountRef.value?.loginHandler(isRememberPassword.value)
  } else {
    console.log('手机登录')
  }
}
const changeHandler = (value: CheckboxValueType) => {
  localCache.setCache(CACHE_IS_MEMEMBER_PASSWORD, value)
}
</script>

<style lang="less" scoped>
.login-pane {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
