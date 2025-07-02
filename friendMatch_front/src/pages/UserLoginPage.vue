<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="userAccount"
        name="userAccount"
        label="账号"
        placeholder="账号"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
        v-model="userPassword"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import myAxios from "../plugins/myAxios";
import {  showSuccessToast, showFailToast } from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref("");
const userPassword = ref("");
const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  console.log(res, "用户登录");
  if (res.code === 0 && res.data) {
    showSuccessToast("请求成功");

    const redirectUrl = (route.query?.redirect as string) ?? "/";
    window.location.href = redirectUrl;
  } else {

      console.log(res, "失败登录");

  showFailToast("请求失败");

  }
};
</script>
<style scoped></style>
