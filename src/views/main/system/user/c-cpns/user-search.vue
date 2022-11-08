<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" size="large">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入查询的真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入查询的手机号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择查询的状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="-"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button icon="Refresh" @click="resetFormHandler">重置</el-button>
      <el-button type="primary" icon="Search" @click="queryHandler"
        >查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['queryHandler', 'resetHandler'])

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
const resetFormHandler = () => {
  formRef.value?.resetFields()
  emit('resetHandler')
}
const queryHandler = () => {
  emit('queryHandler', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  padding: 20px;
}

.el-form-item {
  padding: 20px 30px;
  margin-bottom: 0;
}

.btns {
  text-align: right;
  padding: 0 50px 10px 0;
  .el-button {
    height: 36px;
  }
}
</style>
