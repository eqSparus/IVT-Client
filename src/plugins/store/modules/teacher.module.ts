import { Module } from 'vuex';
import { RootState, TeacherState } from '@/plugins/store/types';
import { Teacher } from '@/types/site.types';

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
    setTeacher(state: TeacherState, teacher: Teacher) {
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
};

export default TeacherModule;
