import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import TheMainPage from '@/pages/TheMainPage.vue';
import TheRecoverPasswordPage from '@/pages/TheRecoverPasswordPage.vue';
import store from '@/plugins/store/Store';
import { refreshToken, requestIsValidTokenPassword } from '@/api/user/UserApi';
import TheActivateEmailPage from '@/pages/TheActivateEmailPage.vue';
import { requestGetData } from '@/api/DataApi';

const routers = [
  {
    path: '/',
    component: TheMainPage,
    alias: ['/main'],
    async beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      if (store.getters['auth/isAuth']
        || !document.cookie.match(/^(.*;)?\s*refresh\s*=\s*[^;]+(.*)?$/)) {
        try {
          const data = await refreshToken();
          store.commit('auth/setAccessToken', data.accessToken);
        } catch (e) {
          store.commit('auth/removeAccessToken');
        }
      }

      const data = await requestGetData();
      store.commit('department/setDepartment', data.department.mainInfo);
      store.commit('siteLinks/setLinks', data.department.links);
      store.commit('about/setAbout', data.about);
      store.commit('direction/setDirections', data.directions);
      store.commit('entrant/setEntrants', data.entrants);
      store.commit('teacher/setTeachers', data.teachers);
      store.commit('partner/setPartners', data.partners);
      next();
    },
  },
  {
    path: '/recover',
    component: TheRecoverPasswordPage,
    async beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      const { token } = to.query;
      if (token) {
        const data = await requestIsValidTokenPassword(token as string);
        if (data) {
          next();
        } else {
          next('/main');
        }
      } else {
        next('/main');
      }
    },
  },
  {
    path: '/activatemail',
    component: TheActivateEmailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
