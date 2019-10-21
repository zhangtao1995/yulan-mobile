// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import Calendar from "vue-mobile-calendar";
import VueAwesomeSwiper from "vue-awesome-swiper";
import { Picker } from "vant";
import store from "./store";
//订单系统的URL
import orderBaseUrl from "./Global.vue";
import mui from "./assets/mui/js/mui";
import * as baseUrlASP from "./api/httpASP.js";

axios.defaults.baseURL = "http://14.29.221.109:10250/yulan";
axios.interceptors.request.use(
  config => {
    store.commit("showLoading");
    return config;
  },
  error => {
    store.commit("hideLoading");
    return Promise.resolve(error);
  }
);
axios.interceptors.response.use(
  response => {
    store.commit("hideLoading");
    return Promise.resolve(response);
  },

  error => {
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);
//中断请求
// axios.interceptors.request.use(
//   config => {
//     config.cancelToken = new axios.CancelToken(function (cancel) {
//       store.commit('pushToken', {cancelToken: cancel})
//     })
//     return config
//   }
// )

// router.beforeEach(function (to, from, next) {
//   store.commit('clearToken') // 取消请求
//   next()
// })
Vue.use(Calendar);
Vue.use(Picker);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.orderBaseUrl = orderBaseUrl.orderBaseUrl;
Vue.prototype.capitalUrl = orderBaseUrl.capitalUrl;
Vue.prototype.mui = mui;
Vue.prototype.baseUrlASP = baseUrlASP.baseUrl;

export const $http = axios;

vm = new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
vm.UpdateVersion = orderBaseUrl.UpdateVersion;
app = vm.$children[0];

document.addEventListener("plusready", function(a) {
  //等待plus ready后再调用5+ API：
  //// 在这里调用5+ API
  var first = null;
  window.plus = plus;
  vm.plus = plus;
  plus.key.addEventListener(
    "backbutton",
    function() {
      //监听返回键
      if (window.vTop) {
        window.vTop.back();
        return;
      }
      //首次按键，提示‘再按一次退出应用’
      if (!first) {
        first = new Date().getTime(); //获取第一次点击的时间戳
        plus.nativeUI.toast("再按一次退出应用", { duration: 1000 }); //通过H5+ API 调用Android 上的toast 提示框
        setTimeout(function() {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          //获取第二次点击的时间戳, 两次之差 小于 1000ms 说明1s点击了两次,
          plus.runtime.quit(); //退出应用
        }
      }
    },
    false
  );
  vm.UpdateVersion();
});
