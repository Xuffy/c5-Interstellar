import Vue from 'vue'
import App from './App'
import router from 'service/router'
import ajax from 'service/ajax'
import * as filters from 'service/filters.js'
import api from  'service/api';
import util from  'service/util';
import iView from 'iview';
import VueI18n from 'vue-i18n'
import zhConfig from 'lib/zh'
import enConfig from 'lib/en'

import 'iview/dist/styles/iview.css';
import 'assets/style/main.less';

Vue.use(iView);
Vue.use(api);
Vue.use(util);
Vue.use(VueI18n);

Vue.config.productionTip = false;

Vue.prototype.ajax = ajax;


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

const i18n = new VueI18n({
  locale: Vue.prototype.$sessionStore.get('language') || 'en',
  // locale: 'zh',
  messages: {
    'zh': zhConfig,
    'en': enConfig
  }
});

// 判断是否登录
let userInfo = Vue.prototype.$localStore.get('user');
!_.isEmpty(userInfo) && Vue.prototype.$sessionStore.set('user', userInfo);

new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: {App}
});
