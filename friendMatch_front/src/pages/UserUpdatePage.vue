<template>
  <template v-if="user"
    ><van-cell
      title="昵称"
      is-link
      to="/user/edit"
      :value="user.username"
      @click="toEdit('username', '昵称', user.username)" />
    <van-cell title="账号" :value="user.userAccount" />

    <van-cell
      title="头像"
      is-link
      to="/user/edit"
      @click="toEdit('avatarUrl', '头像', user.avatarUrl)"
    >
      <!-- 使用 default slot 自定义右侧内容 -->
      <template #value>
        <van-image
          round
          width="60px"
          height="60px"
          :src="user.avatarUrl"
          v-if="user.avatarUrl"
        />
      </template>
    </van-cell>

    <van-cell
      title="性别"
      is-link
      to="/user/edit"
      :value="user.gender === 0 ? '男' : '女'"
      @click="toEdit('gender', '性别', user.gender === 0 ? '男' : '女')" />
    <van-cell
      title="电话"
      is-link
      to="/user/edit"
      :value="user.phone"
      @click="toEdit('phone', '电话', user.phone)" />
    <van-cell
      title="邮箱"
      is-link
      to="/user/edit"
      :value="user.email"
      @click="toEdit('email', '邮箱', user.email)" />
    <van-cell title="星球编号" :value="user.planetCode" />
    <van-cell title="注册时间" :value="user.createTime"
  /></template>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import myAxios from "../plugins/myAxios";
import { showSuccessToast, showFailToast } from "vant";
import { getCurrentUser } from "../services/user";
const user = ref();
onMounted(async () => {
  const res = await getCurrentUser();
  if (res) {
    user.value = res;
  } else {
    showFailToast("获取用户信息失败");
  }
});
const router = useRouter();
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
