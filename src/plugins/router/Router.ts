import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import TheMainPage from '@/pages/TheMainPage.vue';
import TheRecoverPasswordPage from '@/pages/TheRecoverPasswordPage.vue';
import { requestIsValidTokenPassword } from '@/http/user/HttpСredentialsApi';
import store from '@/plugins/store/Store';
import TheActivateEmailPage from '@/pages/TheActivateEmailPage.vue';
import { requestGetData } from '@/http/HttpDataApi';
import { requestGetTeacher } from '@/http/HttpTeacherApi';
import { MIN_LOAD_TEACHER } from '@/hooks/useEditTeacher';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';
import useAlerts from '@/hooks/useAlerts';

const routers = [
  {
    path: '/',
    component: TheMainPage,
    alias: ['/main'],
    async beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      const {
        isAuth,
        isExpiration,
        refreshToken,
        logout,
      } = useTokenAuthentication();

      const {
        alerts,
      } = useAlerts();

      if (isAuth.value) {
        try {
          if (!isExpiration.value) {
            await refreshToken();
          }
        } catch (e) {
          logout();
        }
      }

      if (!store.state.isLoadData) {
        try {
          const dataSite = await requestGetData();
          store.commit('department/setDepartment', dataSite.department.mainInfo);
          store.commit('siteLinks/setLinks', dataSite.department.links);
          store.commit('about/setAbout', dataSite.about);
          store.commit('direction/setDirections', dataSite.directions);
          store.commit('entrant/setEntrants', dataSite.entrants);
          store.commit('partner/setPartners', dataSite.partners);
          store.commit('review/setReviews', dataSite.reviews);

          const teachers = await requestGetTeacher(0, MIN_LOAD_TEACHER);
          store.commit('teacher/setTeachers', teachers);
          store.commit('dataLoaded');
        } catch (e) {
          alerts.value.push({
            type: 'warning',
            message: 'Не удалось загрузить данные',
          });
        }
      }
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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/main',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
