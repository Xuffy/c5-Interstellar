import Vue from 'vue'
import Router from 'vue-router'
import config from  'service/config';
import Layout from 'components/Layout/index.vue'
import {localStore, sessionStore} from  'service/store';

Vue.use(Router);


export const routerMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '首页',
    children: [{
      path: 'home',
      component: resolve => {
        require(['../views/home/index.vue'], resolve)
      }
    }]
  },
  {
    path: '/wallet',
    component: Layout,
    redirect: '/wallet',
    name: '在线钱包',
    children: [{
      path: 'index',
      meta: {auth: true},
      component: resolve => {
        require(['../views/wallet/index.vue'], resolve)
      }
    }]
  }
];


let router = new Router({
  routes: routerMap
});
router.beforeResolve((to, from, next) => {
  let token = (sessionStore.get('user') || {}).accessToken;

  if (to.meta.auth && !token) {
    return next({path: '/'});
  }

  /*let ts = localStore.get('ticket')
   , cacheParam = sessionStore.get('cache_router_param') || []
   , cp = _.findWhere(cacheParam, {path: to.path}) // 从缓存中获取对应路由参数
   , version;


   if (to.path !== '/login' || from.path === '/login') {
   version = localStore.get('version');

   if (version !== config.VERSION) { // 版本控制
   return next({path: '/login'});
   } else if (_.isEmpty(ts)) { // 登录验证
   return next({path: '/login'});
   }
   }


   // 判断路由是否必须带入参数 todo 跳转之前页面地址没有带上参数
   if (to.meta.needParam) {
   if (_.isEmpty(to.params) && _.isEmpty(to.query)) {
   if (!_.isEmpty(cp)) {
   _.map(cp.query, (val, key) => {
   to.query[key] = val;
   });

   _.map(cp.params, (val, key) => {
   to.params[key] = val;
   });
   } else {
   return to.matched.length ? next({path: to.matched[1] ? to.matched[1].redirect : to.matched[0].redirect}) : next({path: '/'});
   }
   }
   if (!_.isEmpty(cp)) {
   cacheParam = _.filter(cacheParam, val => {
   return val.path !== to.path;
   });
   }

   cacheParam.push(_.pick(to, 'path', 'params', 'query'));
   sessionStore.set('cache_router_param', cacheParam);

   }*/

  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
export default router
