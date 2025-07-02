<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell title="退出登录"  @click="exitUser()"/>
    <!-- <van-dialog v-model:show="showConfirmDialog" title="确认是否退出登录" show-cancel-button @confirm="doExitUser" @cancel="doExitCancel">
    </van-dialog> -->

  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getCurrentUser } from "../services/user";
import{showConfirmDialog} from "vant";
import myAxios from "../plugins/myAxios";

// const user = {
//   id: 1,
//   username: '鱼皮',
//   userAccount: 'dogYupi',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: '男',
//   phone: '123112312',
//   email: '12345@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const user = ref();
const showDialog = ref(false);

const router = useRouter();
const exitUser=() =>{
  showConfirmDialog({
  title: '',
  message:'确定是否退出登录',
})
  .then(async() => {
    const res = await myAxios.post("/user/logout", {
  })
  router.go(0)
;
  })
  .catch(() => {
    // on cancel
  });
}
onMounted(async () => {
  user.value = await getCurrentUser();
});

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentValue,
    },
  });
};
</script>

<style scoped></style>
