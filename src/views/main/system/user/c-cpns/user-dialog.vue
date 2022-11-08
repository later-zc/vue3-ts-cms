<template>
  <div class="dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑用户' : '新建用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form
          :model="formData"
          label-width="80px"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item prop="name" label="用户名">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="realname" label="真实姓名">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item prop="cellphone" label="手机号码">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item v-if="!isEdit" prop="password" label="密码">
            <el-input v-model="formData.password" placeholder="请输入密码" />
          </el-form-item>

          <el-form-item prop="roleId" label="角色">
            <el-select
              style="width: 100%"
              v-model="formData.roleId"
              placeholder="请选择角色"
            >
              <template v-for="item in mainStore.entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item prop="departmentId" label="部门">
            <el-select
              style="width: 100%"
              v-model="formData.departmentId"
              placeholder="请选择部门"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmHandler"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'

import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import type { ElForm, FormRules } from 'element-plus'
import showMessage from '@/utils/showMessage'

const dialogVisible = ref(false)
let formData = reactive<any>({
  name: '',
  realname: '',
  cellphone: '',
  password: '',
  roleId: '',
  departmentId: ''
})
const isEdit = ref(false)
const editData = ref()
const formRef = ref<InstanceType<typeof ElForm>>()
const showDialogHanlder = (_isEdit: boolean = false, row?: any) => {
  isEdit.value = _isEdit
  dialogVisible.value = true

  if (_isEdit && row) {
    nextTick(() => {
      for (const key in formData) {
        formData[key] = row[key]
      }
    })
    editData.value = row
  } else {
    formRef.value?.resetFields()
    editData.value = null
  }
}
defineExpose({
  showDialogHanlder
})
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

const rules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['blur', 'change']
    }
  ],
  cellphone: [
    {
      required: true,
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '请输入格式正确的手机号',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: isEdit.value ? false : true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,20}$/,
      message: '必须是3~20位',
      trigger: ['change', 'blur']
    }
  ],
  roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
  departmentId: [{ required: true, message: '请选择部门', trigger: 'change' }]
}

const confirmHandler = () => {
  formRef.value?.validate((isValid) => {
    if (!isValid) return showMessage('请输入正确的格式', 'error')
    dialogVisible.value = false
    if (isEdit.value && editData.value) {
      systemStore.editUserInfo(editData.value.id, formData)
    } else {
      systemStore.createNewUser(formData)
    }
  })
}
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
