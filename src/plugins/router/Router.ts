import { createRouter, createWebHistory } from 'vue-router';
import TheMainPage from '@/pages/TheMainPage.vue';
import TheRecoverPassword from '@/pages/TheRecoverPassword.vue';
import store from '@/plugins/store/Store';
import { refreshToken } from '@/api/user/UserApi';
import TheActivateEmail from '@/pages/TheActivateEmail.vue';
import { getData } from '@/api/DataApi';

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

        const data = await getData();
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
      component: TheRecoverPassword,
    },
    {
      path: '/activatemail',
      component: TheActivateEmail,
    },
  ],
});

export default router;
