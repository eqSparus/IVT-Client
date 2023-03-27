import { createRouter, createWebHistory } from 'vue-router';
import TheMainPage from '@/pages/TheMainPage.vue';
import TheRecoverPasswordPage from '@/pages/TheRecoverPasswordPage.vue';
import store from '@/plugins/store/Store';
import { refreshToken, requestIsValidTokenPassword } from '@/api/user/UserApi';
import TheActivateEmailPage from '@/pages/TheActivateEmailPage.vue';
import { requestGetData } from '@/api/DataApi';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TheMainPage,
      alias: ['/main'],
      async beforeEnter(to, from, next) {
        if (store.getters['auth/isAuth']) {
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
        next();
      },
    },
    {
      path: '/recover',
      component: TheRecoverPasswordPage,
      async beforeEnter(to, from, next) {
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
  ],
});

export default router;
