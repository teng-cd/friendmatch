<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading" />
  <van-empty
    v-if="!userList || userList.length < 1"
    description="数据为空"
  ></van-empty>
</template>
<script setup lang="ts">
import { useId, ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import myAxios from "../plugins/myAxios";
import {  showSuccessToast, showFailToast } from "vant";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";
import { UserType } from "../models/user";

const isMatchMode = ref <boolean>(false) ;
const userList = ref([]);
const loading = ref(true);

const loadData = async () => {
  let userListData;
  loading.value = true;
  //心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios
      .get("/user/match", {
        params: {
          num,
        },
      })
      .then(function (response: { data: any }) {
        console.log("/user/match succeed", response);
        return response?.data;
      })
      .catch(function (error: any) {
        console.log("/user/match error", error);
        showFailToast("请求失败");

      });
  } else {
    //普通模式，直接分页查询用户
    userListData = await myAxios
      .get("/user/recommend", {
        params: {
          pageSize: 8,
          pageNum: 1,
        },
      })
      .then(function (response: { data: { records: any } }) {
        console.log("/user/recommend succeed", response);
        return response?.data?.records;
      })
      .catch(function (error: any) {
        console.log("/user/recommend error", error);
        showFailToast("请求失败");

      });
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
  loading.value = false;
};
watchEffect(() => {
  loadData();
});

// onMounted(async () => {
//   const userListDate = await myAxios
//     .get("/user/recommend", {
//       params: {
//         pageSize: 8,
//         pageNum: 1,
//       },
//     })
//     .then(function (response) {
//       console.log("/user/recommend success", response);
//       showToast({
//         message: "请求成功",
//         type: "success",
//       });
//       return response?.date?.records;
//     })
//     .catch(function (error) {
//       console.error("/user/recommend success", error);
//       showToast({
//         message: "请求失败",
//         type: "fail",
//       });
//     });
//   console.log(userListDate);

//   if (userListDate) {
//     userListDate.forEach((element) => {
//       if (element.tags) {
//         element.tags = JSON.parse(element.tags);
//       }
//     });
//     userList.value = userListDate;
//   }
// });
</script>

<style scoped></style>
