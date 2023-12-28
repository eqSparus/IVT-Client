import { Module } from 'vuex';
import { RootState, TeacherState } from '@/plugins/store/store.types';
import { Teacher } from '@/types/site.types';
import { MIN_LOAD_TEACHER } from '@/hooks/useEditTeacher';
import {
  requestCreateTeacher,
  requestDeleteTeacher,
  requestGetTeacher,
  requestUpdateTeacher,
  requestUpdateTeacherImg,
  requestUpdateTeacherPosition,
} from '@/http/HttpTeacherApi';
import { EditTeacher } from '@/types/edit.site.types';

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
    updateTeacher(state: TeacherState, teacher: Teacher) {
      const indexUpdate = state.teachers.findIndex((t) => t.id === teacher.id);
      state.teachers[indexUpdate] = teacher;
    },
    removeTeacher(state: TeacherState, id: string) {
      const deleteIndex = state.teachers.findIndex((t) => t.id === id);
      state.teachers.splice(deleteIndex, 1);
    },
    updateImgTeacher(state: TeacherState, args: {
      path: string,
      id: string
    }) {
      const indexUpdate = state.teachers.findIndex((t) => t.id === args.id);
      state.teachers[indexUpdate].urlImg = args.path;
    },
    updatePositionTeacher(state: TeacherState, args: {
      position: string,
      id: string
    }) {
      const indexUpdate = state.teachers.findIndex((t) => t.id === args.id);
      state.teachers[indexUpdate].position = Number(args.position);
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
    async add({ commit }, args: {
      teacher: EditTeacher,
      image: Blob,
    }) {
      const formData = new FormData();
      formData.append('img', args.image, 'img.jpg');
      formData.append('data', new Blob([JSON.stringify(args.teacher)], {
        type: 'application/json',
      }));
      const data = await requestCreateTeacher(formData);
      commit('addTeacher', data);
    },
    async update({ commit }, args: {
      teacher: EditTeacher,
      id: string
    }) {
      const data = await requestUpdateTeacher(args.teacher, args.id);
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
      if (!rootState.isLoadAllTeacher) {
        const teachers = await requestGetTeacher(MIN_LOAD_TEACHER);
        commit('setTeachers', teachers);
        commit('teacherLoaded', {}, { root: true });
      }
    },
  },
};

export default TeacherModule;
