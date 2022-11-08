<template>
  <div class="user">
    <user-search @query-handler="queryHandler" @reset-handler="resetHandler" />
    <user-content
      ref="contentRef"
      @create-new-user-handler="createNewUserHandler"
      @edit-click-handler="editClickHandler"
    />
    <user-dialog ref="userDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSearch from '../user/c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userDialog from './c-cpns/user-dialog.vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const queryHandler = (formData: any) => {
  contentRef.value?.fetchUserListData(formData)
}
const resetHandler = () => {
  contentRef.value?.fetchUserListData()
}
const userDialogRef = ref<InstanceType<typeof userDialog>>()
const createNewUserHandler = () => {
  userDialogRef.value?.showDialogHanlder()
}
const editClickHandler = (row: any) => {
  userDialogRef.value?.showDialogHanlder(true, row)
}
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
}
</style>
