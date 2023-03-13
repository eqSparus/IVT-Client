import { createRouter, createWebHistory } from 'vue-router';
import TheMainPage from '@/pages/TheMainPage.vue';
import TheRecoverPassword from '@/pages/TheRecoverPassword.vue';
import store from '@/plugins/store/Store';
import { refreshToken } from '@/api/user/UserApi';
import TheActivateEmail from '@/pages/TheActivateEmail.vue';
import { getData } from '@/api/DataApi';
import { Link } from '@/api/model/ModelTypes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TheMainPage,
      alias: ['/main'],
      async beforeEnter(to, from, next) {
        if (store.getters.isAuth) {
          try {
            const data = await refreshToken(store.getters.getRefreshToken);
            store.commit('auth/setTokens', {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            });
          } catch (e) {
            store.commit('auth/removeTokens');
          }
        }

        const data = await getData();
        const departmentInfo = data.department.mainInfo;
        store.commit('department/setDepartment', {
          title: departmentInfo.title,
          slogan: departmentInfo.slogan,
          phone: departmentInfo.phone,
          email: departmentInfo.email,
          address: departmentInfo.address,
        });

        store.commit('siteLinks/setLinks', data.department.links);
        store.commit('about/setAbout', data.about);
        store.commit('direction/setDirections', data.directions);
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
