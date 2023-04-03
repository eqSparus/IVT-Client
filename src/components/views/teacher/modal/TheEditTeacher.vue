<template>
  <div v-if="show" class="edit-teacher-container">

    <div class="edit-container">

      <div class="edit-block">
        <div class="img-cropper">
          <img v-if="!cropperFile" :src="teacher.urlImg" alt="" class="cropper">
          <cropper :src="cropperFile"
                   v-if="cropperFile"
                   ref="cropperRef"
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
          Загрузить
        </label>
        <input type="file"
               ref="imgRef"
               @change="uploadImg"
               style="display: none"
               id="img-teacher">
        <button @click="updateImgTeacher"
                class="btn-standard-icon btn-position mt-20">
          <img :src="refreshIcon"
               class="icon-trashcan"
               alt="assets/images/icon/refresh.svg">
        </button>
      </div>

      <div class="edit-block ml-20">
        <div class="double-block">
          <div class="block-column">
            <label class="field-label" for="last-name">Фамилия преподавателя*</label>
            <span class="field-fail" v-if="valid.lastName.$invalid && valid.lastName.$dirty">
              Поле не должно быть пустым
            </span>
            <input type="text"
                   class="field-standard"
                   v-model="editableTeacher.lastName"
                   @blur="valid.lastName.$touch()"
                   placeholder="Введите фамилию преподавателя"
                   id="last-name">
          </div>

          <div class="block-column">
            <label class="field-label" for="first-name">Имя преподавателя*</label>
            <span class="field-fail" v-if="valid.firstName.$invalid && valid.firstName.$dirty">
              Поле не должно быть пустым
            </span>
            <input type="text"
                   class="field-standard"
                   @blur="valid.firstName.$touch()"
                   v-model="editableTeacher.firstName"
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
            <label class="field-label mt-10" for="post-department">Должность на кафедре</label>
            <input type="text"
                   id="post-department"
                   v-model="editableTeacher.postDepartment"
                   class="field-standard"
                   placeholder="Введите должность преподавателя">
          </div>
        </div>

        <label class="field-label mt-10" for="post-teacher">Должность преподавателя</label>
        <textarea class="field-standard text-area"
                  id="post-teacher"
                  v-model="editableTeacher.postTeacher"
                  placeholder="Введите ученую степень преподавателя">

        </textarea>

        <label class="field-label mt-10" for="post-additional">Дополнительная должность</label>
        <input type="text"
               class="field-standard"
               id="post-additional"
               placeholder="Введите дополнительную должность"
               v-model="editableTeacher.postAdditional">

        <div class="double-block mt-20">
          <div class="block-column">
            <button @click="updateTeacher"
                    :disabled="valid.$invalid"
                    class="btn-standard-icon btn-position">
              <img :src="refreshIcon"
                   class="icon-trashcan"
                   alt="assets/images/icon/refresh.svg">
            </button>
          </div>
          <div class="block-column">
            <button @click="removeTeacher"
                    class="btn-warning-icon btn-position">
              <img :src="trashcanIcon"
                   alt="assets/images/icon/trashcan.svg">
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts">

import {
  computed,
  defineComponent, PropType,
} from 'vue';
import { Teacher } from '@/types/SiteContentTypes';
import { Cropper } from 'vue-advanced-cropper';
import { useStore } from 'vuex';
import useImg from '@/hooks/useImg';
import useEditTeacher from '@/hooks/useEditTeacher';
import useAlerts from '@/hooks/useAlerts';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';

export default defineComponent({
  name: 'TheEditTeacher',
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
    const { alerts } = useAlerts();
    const store = useStore();

    const {
      imgRef,
      cropperRef,
      cropperFile,
      uploadImg,
      resizedImg,
    } = useImg();

    const {
      teacher: editableTeacher,
      valid,
      update,
      remove,
      updateImg,
    } = useEditTeacher({
      id: props.teacher.id,
      firstName: props.teacher.firstName,
      middleName: props.teacher.middleName,
      lastName: props.teacher.lastName,
      postDepartment: props.teacher.postDepartment,
      postTeacher: props.teacher.postTeacher,
      postAdditional: props.teacher.postAdditional,
    });

    const updateTeacher = async () => {
      if (editableTeacher.value.firstName !== props.teacher.firstName
        || editableTeacher.value.middleName !== props.teacher.middleName
        || editableTeacher.value.lastName !== props.teacher.lastName
        || editableTeacher.value.postDepartment !== props.teacher.postDepartment
        || editableTeacher.value.postTeacher !== props.teacher.postTeacher
        || editableTeacher.value.postAdditional !== props.teacher.postAdditional
      ) {
        try {
          await update();
          alerts.value.push({
            type: 'info',
            message: 'Преподаватель обновлен',
          });
        } catch (e) {
          alerts.value.push({
            type: 'warning',
            message: 'Не удалось обновить преподавателя',
          });
        }
      }
    };

    const removeTeacher = async () => {
      emit('remove');
      try {
        await remove(props.teacher.id as string);
        alerts.value.push({
          type: 'info',
          message: 'Преподаватель удален',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось удалить преподавателя',
        });
      }
    };

    const updateImgTeacher = () => {
      if (cropperFile.value) {
        resizedImg(async (bl: Blob) => {
          try {
            await updateImg(bl, props.teacher.id as string);
            cropperFile.value = null;
            alerts.value.push({
              type: 'info',
              message: 'Фотография обновлена',
            });
          } catch (e) {
            alerts.value.push({
              type: 'warning',
              message: 'Не удалось обновить фотографию',
            });
          }
        });
      }
    };

    return {
      valid,
      editableTeacher,
      imgRef,
      cropperRef,
      cropperFile,
      updateTeacher,
      uploadImg,
      removeTeacher,
      updateImgTeacher,
      isTeacherLeader: computed(() => props.teacher.id === store.getters['department/getDepartment'].leaderId),
      trashcanIcon,
      refreshIcon,
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

    .btn-position {
      width: 100%;
      height: 4rem;
    }

    .edit-block {
      display: flex;
      flex-flow: column;
      align-self: flex-end;

      .img-cropper {
        width: 25rem;

        .cropper {
          height: 25rem;
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
