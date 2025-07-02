import { createApp } from "vue";
import "./style.css";
import './global.css';
import 'vant/lib/index.css';
import App from "./App.vue";
import * as VueRouter from "vue-router";
import Vant from "vant";
import { DatePicker } from "vant";
import routes from "./config/route";
import { TreeSelect } from "vant";
import { Toast,Dialog} from 'vant';
import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes,
});
createApp(App)
  .use(Vant)
  .use(router)
  .use(Toast)
  .use(Dialog)
  .use(DatePicker)
  .use(TreeSelect)
  .mount("#app");
