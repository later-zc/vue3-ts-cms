<template>
  <div class="account-pane">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import router from '@/router'

import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { CACHE_NAME, CACHE_PASSWORD } from '@/global/constant'
import showMessage from '@/utils/showMessage'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20位',
      trigger: ['change', 'blur']
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,20}$/,
      message: '必须是3~20位',
      trigger: ['change', 'blur']
    }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

const loginHandler = (isRememberPassword: boolean) => {
  formRef.value?.validate((isValid) => {
    if (!isValid) return showMessage('请输入正确的格式', 'error')

    loginStore
      .loginAccountAction({
        name: account.name,
        password: account.password
      })
      .then(
        (res) => {
          if (isRememberPassword) {
            localCache.setCache(CACHE_NAME, account.name)
            localCache.setCache(CACHE_PASSWORD, account.password)
          } else {
            localCache.removeCache(CACHE_NAME)
            localCache.removeCache(CACHE_PASSWORD)
          }

          showMessage('欢迎回来', 'success')
          router.push('/main')
        },
        (err) => {
          console.error('err: ', err)
          showMessage(err, 'error')
        }
      )
  })
}
defineExpose({
  loginHandler
})
</script>

<style lang="less" scoped></style>
