import { Teacher } from '@/types/SiteContentTypes';
import { ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import {
  createTeacher,
  deleteTeacher,
  updateTeacher,
  updateTeacherImg, updateTeacherPosition,
} from '@/api/TeacherApi';
import { useStore } from 'vuex';

export type EditTeacher = Omit<Teacher, 'position' | 'urlImg'>

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
    const data = await createTeacher(formData);
    store.commit('teacher/setTeacher', data);
  };

  const update = async () => {
    const data = await updateTeacher(teacher.value);
    store.commit('teacher/updateTeacher', data);
  };

  const remove = async (id: string) => {
    await deleteTeacher(id);
    store.commit('teacher/removeTeacher', id);
  };

  const updateImg = async (img: Blob, id: string) => {
    const formData = new FormData();
    formData.append('img', img, 'img.jpg');
    const data = await updateTeacherImg(formData, id);
    store.commit('teacher/updateImgTeacher', {
      path: data.url,
      id,
    });
  };

  const updatePosition = async (position: number, id: string) => {
    const data = await updateTeacherPosition(position, id);
    store.commit('teacher/updatePositionTeacher', {
      position: data.position,
      id,
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
  };
};

export default useEditTeacher;
