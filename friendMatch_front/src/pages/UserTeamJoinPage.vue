<template>
  <div id="teamPage">
    <van-search
      v-model="searchText"
      placeholder="搜索队伍"
      @search="onSearch"
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
import {  showSuccessToast, showFailToast } from "vant";

const router = useRouter();
const searchText = ref("");

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = "") => {
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
  showFailToast("加载队伍失败，请刷新再试");

  }
};

// 页面加载时只触发一次
onMounted(() => {
  listTeam();
});

const onSearch = (val) => {
  listTeam(val);
};
</script>

<style scoped>
#teamPage {
}
</style>
