<template>
  <div id="teamPage">
    <van-search
      v-model="searchText"
      placeholder="搜索队伍"
      @search="onSearch"
    />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private" />
    </van-tabs>
    <div style="margin-bottom: 16px" />
    <van-button
      class="add-button"
      type="primary"
      icon="plus"
      @click="toAddTeam"
    />
    <team-card-list :teamList="teamList" />
    <van-empty v-if="teamList?.length < 1" description="数据为空" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import { onMounted, ref } from "vue";
import myAxios from "../plugins/myAxios";
import {  showSuccessToast, showFailToast} from "vant";

const active = ref("public");
const router = useRouter();
const searchText = ref("");

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name: string) => {
  // 查公开
  if (name === "public") {
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
};

// 跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add",
  });
};

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = "", status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
    // showSuccessToast("加载队伍成功");
  } else {
    showFailToast("加载队伍失败，请稍后再试");
  }
};

// 页面加载时只触发一次
onMounted(() => {
  listTeam();
});

const onSearch = (val: string) => {
  listTeam(val);
};
</script>

<style scoped>
#teamPage {
}
</style>
