<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
          v-model="addTeamData.description"
          rows="4"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
        />
        <van-field
          is-link
          readonly
          name="datetimePicker"
          label="过期时间"
          :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
          <van-date-picker
            v-model="pickerValues"
            @confirm="onConfirm"
            @cancel="showPicker = false"    
            type="datetime"
            title="请选择过期时间"
            :min-date="minDate"
          />
        </van-popup>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group
              v-model="addTeamData.status"
              direction="horizontal"
            >
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-if="Number(addTeamData.status) === 2"
          v-model="addTeamData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import myAxios from "../plugins/myAxios";
import { showSuccessToast, showFailToast } from "vant";

const router = useRouter();
const route = useRoute();

// 展示日期选择器
const showPicker = ref(false);
const pickerValues = ref<string[]>(['2025', '06', '24']); // 默认值
const minDate = new Date();

const id = route.query.id;

// 需要用户填写的表单数据
const addTeamData = ref({});

// 获取之前的队伍信息
onMounted(async () => {
  if (id <= 0) {
  showFailToast("加载队伍失败");

    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id,
    },
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
  } else {
  showFailToast("加载队伍失败，请稍后再试");

  }
});
const onConfirm = (result: {
  selectedValues: string[];
  selectedOptions: Array<{ text: string; value: string }>;
  selectedIndexes: number[];
}) => {
  const { selectedValues } = result; // 解构出 selectedValues
  
  if (selectedValues.length >= 5) { // datetime 模式
    const [year, month, day, hour, minute] = selectedValues;
    addTeamData.value.expireTime = `${year}-${month}-${day} ${hour}:${minute}`;
  } else if (selectedValues.length >= 3) { // date 模式
    const [year, month, day] = selectedValues;
    addTeamData.value.expireTime = `${year}-${month}-${day}`;
  } else {
    console.error("Invalid date format:", selectedValues);
  }
  showPicker.value = false;
};

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
  };
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("更新成功");
    router.push({
      path: "/team",
      replace: true,
    });
  } else {
  showFailToast("更新失败");

  }
};
</script>

<style scoped>
#teamPage {
}
</style>
