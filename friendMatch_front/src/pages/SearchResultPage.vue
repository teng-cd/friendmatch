<template>
  <user-card-list :user-list="userList" :loading="loading"> </user-card-list>
  <div>
    <van-empty
      v-if="!userList || userList.length < 1"
      description="暂无搜索结果"
    ></van-empty>
  </div>
</template>
<script setup>
import { useId, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import myAxios from "../plugins/myAxios";
import {  showSuccessToast, showFailToast } from "vant";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const userList = ref([]);
const loading = ref(true);

const { tags } = route.query;

onMounted(async () => {
  loading.value = true;

  const userListDate = await myAxios
    .get("/user/search/tags", {
      params: {
        tagNameList: tags,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    })
    .then(function (response) {
      console.log("/user/search/tags success", response);
      showSuccessToast("请求成功");

      return response?.data;
    })
    .catch(function (error) {
      console.error("/user/search/tags fail", error);
    showFailToast("请求失败");

    });
  console.log(userListDate);

  if (userListDate) {
    userListDate.forEach((element) => {
      if (element.tags) {
        element.tags = JSON.parse(element.tags);
      }
    });
    userList.value = userListDate;
  }
  loading.value = false;

});
</script>

<style scoped></style>
