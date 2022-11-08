<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" />
      <h2 v-show="!isFold" class="title">后台管理系统-CMS</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        background-color="#001529"
        text-color="#b7bdc3"
        active-text-color="#fff"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="String(subitem.id)"
                @click="itemClickHandler(subitem)"
                >{{ subitem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useLoginStore from '@/store/login/login'
import { mapPathToMenu } from '@/utils/mapMenus'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
const router = useRouter()
const itemClickHandler = (item: any) => {
  router.push(item.url)
}

const route = useRoute()
const defaultActive = computed(() => {
  return mapPathToMenu(route.path, userMenus).id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: rgb(12, 34, 53);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 48px;
  padding: 10px;

  overflow: hidden;
  background-color: #001529;

  .img {
    height: 100%;
    margin-right: 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.menu {
  // background-color: rgb(12, 34, 53);
  height: calc(100vh - 48px);
  overflow-y: auto;

  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: rgb(12, 34, 53);
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  // .el-menu-item.is-active {
  //   // background-color: #0a60bd;
  // }
}
</style>
