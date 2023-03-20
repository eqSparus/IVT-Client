<template>
  <div v-if="show" class="edit-teacher-container">

    <div class="edit-container">

      <div class="edit-block">
        <div class="img-cropper">
          <img v-if="!cropperFile" :src="teacher.pathImg" alt="" class="cropper">
          <cropper :src="cropperFile"
                   v-if="cropperFile"
                   ref="cropperImgRef"
                   class="cropper"
                   :stencil-props="{
                    handlers:{},
                    movable: false,
                    resizable: false,
                    }"
                   :stencil-size="{
                    width: 368,
                    height: 368
                    }"
                   adjustStencil: true
                   image-restriction="stencil"/>
        </div>
        <label class="btn-standard mt-10" for="img-teacher">
          Обновить фото
        </label>
        <input type="file"
               ref="imgFileRef"
               @change="downloadImg"
               style="display: none"
               id="img-teacher">
        <input type="button"
               class="btn-standard mt-20"
               @click="updateImgTeacher"
               value="Обновить">
      </div>

      <div class="edit-block ml-20">
        <div class="double-block">
          <div class="block-column">
            <label class="field-label" for="last-name">Фамилия преподавателя*</label>
            <span class="field-fail" v-if="validate.firstName.$invalid && validate.firstName.$dirty">
              Поле не должно быть пустым
            </span>
            <input type="text"
                   class="field-standard"
                   v-model="editableTeacher.firstName"
                   @blur="validate.firstName.$touch()"
                   placeholder="Введите фамилию преподавателя"
                   id="last-name">
          </div>

          <div class="block-column">
            <label class="field-label" for="first-name">Имя преподавателя*</label>
            <span class="field-fail" v-if="validate.lastName.$invalid && validate.lastName.$dirty">
              Поле не должно быть пустым
            </span>
            <input type="text"
                   class="field-standard"
                   @blur="validate.lastName.$touch()"
                   v-model="editableTeacher.lastName"
                   placeholder="Введите имя преподавателя"
                   id="first-name">
          </div>
        </div>

        <div class="double-block">
          <div class="block-column">
            <label class="field-label mt-10" for="middle-name">Отчество преподавателя</label>
            <input type="text"
                   class="field-standard"
                   v-model="editableTeacher.middleName"
                   placeholder="Введите отчество преподавателя"
                   id="middle-name">
          </div>
          <div class="block-column">
            <label class="field-label mt-10" for="post-name">Должность преподавателя</label>
            <input type="text"
                   id="post-name"
                   v-model="editableTeacher.post"
                   class="field-standard"
                   placeholder="Введите должность преподавателя">
          </div>
        </div>

        <label class="field-label mt-10" for="scientific-degree">Ученая степень</label>
        <textarea class="field-standard text-area"
                  id="scientific-degree"
                  v-model="editableTeacher.scientificDegree"
                  placeholder="Введите ученую степень преподавателя">

        </textarea>

        <div class="double-block mt-20">
          <div class="block-column">
            <input type="button"
                   class="btn-standard"
                   value="обновить"
                   @click="editTeacher"
                   :disabled="validate.$invalid">
          </div>
          <div class="block-column">
            <input type="button"
                   class="btn-warning"
                   :disabled="isTeacherLeader"
                   @click="removeTeacher"
                   value="удалить">
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts">

import {
  computed,
  defineComponent, PropType, ref,
} from 'vue';
import { Teacher } from '@/api/model/ModelTypes';
import { Cropper } from 'vue-advanced-cropper';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { deleteTeacher, updateTeacher, updateTeacherImg } from '@/api/TeacherApi';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TheModalEditTeacher',
  emits: ['remove'],
  components: { Cropper },
  props: {
    teacher: {
      type: Object as PropType<Teacher>,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const imgFileRef = ref<HTMLInputElement | null>(null);
    const cropperFile = ref<string | ArrayBuffer | null>();
    const cropperImgRef = ref<typeof Cropper | null>(null);

    const editableTeacher = ref<Teacher>({
      id: props.teacher.id,
      pathImg: props.teacher.pathImg,
      firstName: props.teacher.firstName,
      middleName: props.teacher.middleName,
      lastName: props.teacher.lastName,
      post: props.teacher.post,
      scientificDegree: props.teacher.scientificDegree,
    });

    const rules = {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
    };

    const validate = useVuelidate(rules, editableTeacher);

    const editTeacher = async () => {
      const data = await updateTeacher(editableTeacher.value);
      store.commit('teacher/updateTeacher', data);
    };

    const removeTeacher = async () => {
      await deleteTeacher(editableTeacher.value.id);
      store.commit('teacher/removeTeacher', editableTeacher.value.id);
      emit('remove');
    };

    const updateImgTeacher = async () => {
      if (cropperFile.value && cropperImgRef.value) {
        const { canvas } = cropperImgRef.value.getResult();
        canvas.toBlob(async (bl: Blob) => {
          const form = new FormData();
          form.append('img', bl, 'img.jpg');
          const data = await updateTeacherImg(form, editableTeacher.value.id);
          store.commit('teacher/updateImgTeacher', {
            path: data.url,
            id: editableTeacher.value.id,
          });
          cropperFile.value = null;
        }, 'image/jpeg');
      }
    };

    const downloadImg = () => {
      const reader = new FileReader();
      const file = (imgFileRef.value as HTMLInputElement).files?.[0];
      reader.readAsDataURL(file as File);
      reader.onload = (e) => {
        cropperFile.value = e.target?.result;
      };
    };

    return {
      validate,
      editableTeacher,
      imgFileRef,
      cropperFile,
      cropperImgRef,
      editTeacher,
      downloadImg,
      removeTeacher,
      updateImgTeacher,
      isTeacherLeader: computed(() => props.teacher.id === store.getters['department/getDepartment'].leaderId),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss' as utils;

.edit-teacher-container {
  display: flex;
  flex-flow: column;

  .edit-container {
    display: flex;
    flex-flow: row;

    div:first-child {
      flex: 1;
    }

    div:last-child {
      flex: 4;
    }

    .edit-block {
      display: flex;
      flex-flow: column;
      width: 15%;
      align-self: flex-end;

      .img-cropper {
        display: flex;
        flex-flow: row;
        justify-content: center;

        .cropper {
          height: 200px;
        }
      }

      .double-block {
        display: flex;
        flex-flow: row;
        gap: 2%;

        .block-column {
          flex: 1;
          display: flex;
          flex-flow: column;
        }
      }
    }
  }
}

.text-area {
  flex: 3;
  @include utils.scrollbar(props.$scroll-slider-color, props.$scroll-slider-body-color);
  resize: none;
}

</style>
