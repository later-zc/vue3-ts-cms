<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadCrumbs } from '@/utils/mapMenus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loginStore = useLoginStore()
const breadCrumbs = computed(() => {
  return mapPathToBreadCrumbs(route.path, loginStore.userMenus)
})
</script>

<style lang="less" scoped></style>
