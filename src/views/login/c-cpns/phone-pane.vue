<template>
  <div class="phone-pane">
    <el-form label-width="60px" size="large" status-icon ref="formRef">
      <el-form-item label="手机号" prop="name">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <div class="verify-code">
          <el-input />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.verify-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
