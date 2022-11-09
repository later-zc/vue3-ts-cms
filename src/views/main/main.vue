<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="el-aside" :width="isFold ? '60px' : '220px'">
        <main-menu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header class="el-header" height="50px">
          <main-header @fold-change="foldChangeHandler" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isFold = ref(false)
const foldChangeHandler = (is_Fold: boolean) => {
  isFold.value = is_Fold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow: hidden;
      // overflow-x: hidden;
      // overflow-y: auto;
      // line-height: 200px;
      // text-align: left;
      // cursor: pointer;
      // background-color: #001529;
      // scrollbar-width: none; /* firefox */
      // -ms-overflow-style: none; /* IE 10+ */

      transition: width 0.3s ease;

      // &::-webkit-scrollbar {
      //   display: none;
      // }
    }
    .el-header {
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
