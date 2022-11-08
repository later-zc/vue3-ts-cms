<template>
  <div class="content">
    <div class="header">
      <span class="title">用户列表</span>
      <el-button type="primary" @click="createNewUserHandler"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column type="selection" width="60" />
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="头像" width="60">
          <el-image
            class="cover-headimg"
            fit="scale-down"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="120" />
        <el-table-column prop="realname" label="真实姓名" width="120" />
        <el-table-column prop="cellphone" label="手机号" width="160" />
        <el-table-column prop="enable" label="状态" width="120">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
              size="large"
              >{{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="创建时间"
          :formatter="dateFormatter"
        />
        <el-table-column prop="updateAt" label="更新时间" ref="ref1">
          <template #default="scope">
            {{ formateUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button
              text
              type="primary"
              icon="edit"
              @click="editHandler(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              text
              type="danger"
              icon="delete"
              @click="removeHandler(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="curPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="siezChangeHandler"
        @current-change="curPageChangeHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import useSystemStore from '@/store/main/system/system'
import formatDate from '@/utils/formatDate'
import { formateUTC } from '@/utils/formate'
import showMessage from '@/utils/showMessage'

const systemStore = useSystemStore()
const curPage = ref(1)
const pageSize = ref(10)

const emit = defineEmits(['createNewUserHandler', 'editClickHandler'])

defineExpose({
  fetchUserListData
})

fetchUserListData()

// const usersList = computed(() => {
//   return systemStore.usersList
// })
const { usersList, usersTotalCount } = storeToRefs(systemStore)

const dateFormatter = (row: any, column: any, cellValue: string) => {
  return formatDate(cellValue)
}

const siezChangeHandler = () => {
  console.log('curPage.value: ', curPage.value)
  fetchUserListData()
}
const curPageChangeHandler = () => {
  console.log('page change -------')
  fetchUserListData()
}

function fetchUserListData(formData: any = {}) {
  systemStore.getUserListAction({
    offset: (curPage.value - 1) * pageSize.value,
    size: pageSize.value,
    ...formData
  })
}

const removeHandler = (id: number) => {
  systemStore.deleteUserAction(id).then((res) => {
    showMessage(res.data, res.code != -1002 ? 'success' : 'warning')
  })
}

const createNewUserHandler = () => {
  emit('createNewUserHandler')
}

const editHandler = (row: any) => {
  emit('editClickHandler', row)
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .title {
    font-size: 20px;
  }
}

:deep(.el-table .el-table__cell) {
  text-align: center;
  padding: 18px 0;
}

.el-button {
  padding: 6px 8px;
}

:global(.cover-headimg) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
