import { Teacher } from '@/types/site.types';
import { ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import {
  requestCreateTeacher,
  requestDeleteTeacher, requestGetTeacher,
  requestUpdateTeacher,
  requestUpdateTeacherImg, requestUpdateTeacherPosition,
} from '@/api/TeacherApi';
import { useStore } from 'vuex';

export type EditTeacher = Omit<Teacher, 'position' | 'urlImg'>
export const MIN_LOAD_TEACHER = 6;

const defaultTeacher = {
  firstName: '',
  lastName: '',
  middleName: '',
  postDepartment: '',
  postTeacher: '',
  postAdditional: '',
};

const useEditTeacher = (customTeacher: EditTeacher = defaultTeacher) => {
  const store = useStore();
  const teacher = ref<EditTeacher>(customTeacher);

  const rules = {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
  };

  const valid = useVuelidate(rules, teacher);

  const add = async (addTeacher: EditTeacher, img: Blob) => {
    const formData = new FormData();
    formData.append('img', img, 'img.jpg');
    formData.append('data', new Blob([JSON.stringify(addTeacher)], {
      type: 'application/json',
    }));
    const data = await requestCreateTeacher(formData);
    store.commit('teacher/setTeacher', data);
  };

  const update = async () => {
    const data = await requestUpdateTeacher(teacher.value);
    store.commit('teacher/updateTeacher', data);
  };

  const remove = async (id: string) => {
    await requestDeleteTeacher(id);
    store.commit('teacher/removeTeacher', id);
  };

  const updateImg = async (img: Blob, id: string) => {
    const formData = new FormData();
    formData.append('img', img, 'img.jpg');
    const data = await requestUpdateTeacherImg(formData, id);
    store.commit('teacher/updateImgTeacher', {
      path: data.url,
      id,
    });
  };

  const updatePosition = async (position: number, id: string) => {
    const data = await requestUpdateTeacherPosition(position, id);
    store.commit('teacher/updatePositionTeacher', {
      position: data.position,
      id,
    });
  };

  const loadAllTeacher = async () => {
    await store.dispatch('loadTeacher', async () => {
      const teachers = await requestGetTeacher(MIN_LOAD_TEACHER);
      store.commit('teacher/setTeachers', teachers);
    });
  };

  return {
    teacher,
    valid,
    add,
    update,
    remove,
    updateImg,
    updatePosition,
    loadAllTeacher,
  };
};

export default useEditTeacher;
