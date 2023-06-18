import { Module } from 'vuex';
import { RootState, TeacherState } from '@/plugins/store/store.types';
import { Teacher } from '@/types/site.types';
import { EditTeacher, MIN_LOAD_TEACHER } from '@/hooks/useEditTeacher';
import {
  requestCreateTeacher,
  requestDeleteTeacher,
  requestGetTeacher,
  requestUpdateTeacher,
  requestUpdateTeacherImg,
  requestUpdateTeacherPosition,
} from '@/http/HttpTeacherApi';

const TeacherModule: Module<TeacherState, RootState> = {
  namespaced: true,
  state() {
    return {
      teachers: [] as Array<Teacher>,
    };
  },
  mutations: {
    setTeachers(state: TeacherState, teachers: Teacher[]) {
      state.teachers.push(...teachers);
    },
    addTeacher(state: TeacherState, teacher: Teacher) {
      state.teachers.push(teacher);
    },
    updateTeacher(state: TeacherState, teacher: Omit<Teacher, 'urlImg' | 'position'>) {
      const indexUpdate = state.teachers.findIndex((t) => t.id === teacher.id);
      state.teachers[indexUpdate].firstName = teacher.firstName;
      state.teachers[indexUpdate].lastName = teacher.lastName;
      state.teachers[indexUpdate].middleName = teacher.middleName;
      state.teachers[indexUpdate].postTeacher = teacher.postTeacher;
      state.teachers[indexUpdate].postAdditional = teacher.postAdditional;
      state.teachers[indexUpdate].postDepartment = teacher.postDepartment;
    },
    removeTeacher(state: TeacherState, id: string) {
      const deleteIndex = state.teachers.findIndex((t) => t.id === id);
      state.teachers.splice(deleteIndex, 1);
    },
    updateImgTeacher(state: TeacherState, data: {
      path: string,
      id: string
    }) {
      const indexUpdate = state.teachers.findIndex((t) => t.id === data.id);
      state.teachers[indexUpdate].urlImg = `${data.path}?range=${Date.now()}`;
    },
    updatePositionTeacher(state: TeacherState, data: {
      position: string,
      id: string
    }) {
      const indexUpdate = state.teachers.findIndex((t) => t.id === data.id);
      state.teachers[indexUpdate].position = Number(data.position);
    },
  },
  getters: {
    getTeachers(state: TeacherState) {
      return state.teachers.sort((a, b) => a.position - b.position);
    },
    getMinPosition(state: TeacherState) {
      return state.teachers.reduce((pr, cu) => (pr.position < cu.position ? pr : cu)).position;
    },
  },
  actions: {
    async add({ commit }, teacher: {
      dataTeacher: EditTeacher,
      image: Blob,
    }) {
      const formData = new FormData();
      formData.append('img', teacher.image, 'img.jpg');
      formData.append('data', new Blob([JSON.stringify(teacher.dataTeacher)], {
        type: 'application/json',
      }));
      const data = await requestCreateTeacher(formData);
      commit('addTeacher', data);
    },
    async update({ commit }, teacher: EditTeacher) {
      const data = await requestUpdateTeacher(teacher);
      commit('updateTeacher', data);
    },
    async remove({ commit }, id: string) {
      await requestDeleteTeacher(id);
      commit('removeTeacher', id);
    },
    async updateImage({ commit }, args: {
      id: string,
      image: Blob,
    }) {
      const formData = new FormData();
      formData.append('img', args.image, 'img.jpg');
      const data = await requestUpdateTeacherImg(formData, args.id);
      commit('updateImgTeacher', {
        path: data.url,
        id: args.id,
      });
    },
    async updatePosition({ commit }, args: {
      id: string,
      position: number,
    }) {
      const data = await requestUpdateTeacherPosition(args.position, args.id);
      commit('updatePositionTeacher', {
        position: data.position,
        id: args.id,
      });
    },
    async loadAllTeacher({
      commit,
      rootState,
    }) {
      if (rootState.isLoadAllTeacher) {
        const teachers = await requestGetTeacher(MIN_LOAD_TEACHER);
        commit('setTeachers', teachers);
        commit('toggleLoadTeacher', {}, { root: true });
      }
    },
  },
};

export default TeacherModule;
