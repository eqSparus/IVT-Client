<template>
  <div v-if="show" class="edit-teacher-container">

    <div class="edit-container">

      <div class="edit-block">
        <div class="img-cropper">
          <img v-if="!cropperFile" :src="teacher.urlImg" :alt="teacher.urlImg" class="cropper">
          <cropper :src="cropperFile"
                   v-else
                   ref="cropperRef"
                   class="cropper"
                   :stencil-props="{
                    handlers:{},
                    movable: false,
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
        <input type="button"
               value="обновить"
               class="btn-standard mt-20"
               @click="updateImgTeacher">
      </div>

      <div class="edit-block ml-20">
        <div class="double-block">
          <div class="block-column">
            <app-base-field id="last-name"
                            label="Фамилия преподавателя*"
                            :fails="[{
                              isShow: valid.lastName.$invalid && valid.lastName.$dirty,
                              description: 'Поле не должно быть пустым',
                            }]">
              <input type="text"
                     class="field-standard"
                     v-model="editableTeacher.lastName"
                     @blur="valid.lastName.$touch()"
                     placeholder="Введите фамилию преподавателя"
                     id="last-name">
            </app-base-field>
          </div>

          <div class="block-column">
            <app-base-field id="first-name"
                            label="Имя преподавателя*"
                            :fails="[{
                              isShow: valid.firstName.$invalid && valid.firstName.$dirty,
                              description: 'Поле не должно быть пустым',
                            }]">
              <input type="text"
                     class="field-standard"
                     @blur="valid.firstName.$touch()"
                     v-model="editableTeacher.firstName"
                     placeholder="Введите имя преподавателя"
                     id="first-name">
            </app-base-field>
          </div>
        </div>

        <div class="double-block mt-10">
          <div class="block-column">
            <app-base-field id="middle-name"
                            label="Отчество преподавателя">
              <input type="text"
                     class="field-standard"
                     v-model="editableTeacher.middleName"
                     placeholder="Введите отчество преподавателя"
                     id="middle-name">
            </app-base-field>
          </div>
          <div class="block-column">
            <app-base-field id="post-department"
                            label="Должность на кафедре">
              <app-tooltip text="Должность преподавателя по АУП (Административно-управленческий персонал) например
зав. кафедрой, заместитель зав. кафедры и тд.">
                <input type="text"
                       id="post-department"
                       v-model="editableTeacher.postDepartment"
                       class="field-standard"
                       placeholder="Введите должность преподавателя">
              </app-tooltip>
            </app-base-field>
          </div>
        </div>

        <app-base-field id="post-teacher"
                        class="mt-10"
                        label="Должность преподавателя">
          <app-tooltip text="Должность преподавателя по ППС (профессорско-преподавательский состав) например
профессор, доцент, стр. преподаватель, ассистент и тд.">
              <textarea class="field-standard"
                        id="post-teacher"
                        v-model="editableTeacher.postTeacher"
                        placeholder="Введите ученую степень преподавателя">
              </textarea>
          </app-tooltip>
        </app-base-field>

        <app-base-field id="post-additional"
                        class="mt-10"
                        label="Дополнительная должность">
          <app-tooltip text="Дополнительная должность преподавателя с предприятия при наличие таковой">
            <input type="text"
                   class="field-standard"
                   id="post-additional"
                   placeholder="Введите дополнительную должность"
                   v-model="editableTeacher.postAdditional">
          </app-tooltip>
        </app-base-field>

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
import { Teacher } from '@/types/site.types';
import { Cropper } from 'vue-advanced-cropper';
import { useStore } from 'vuex';
import useImg from '@/hooks/useImg';
import useEditTeacher from '@/hooks/useEditTeacher';
import useAlerts from '@/hooks/useAlerts';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import AppTooltip from '@/components/UI/AppTooltip.vue';
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  name: 'TheEditTeacher',
  emits: ['remove'],
  components: {
    AppBaseField,
    AppTooltip,
    Cropper,
  },
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
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Данные не изменены',
        });
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
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Загрузите новую фотографию',
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

.edit-teacher-container {
  display: flex;
  flex-flow: column;

  .edit-container {
    display: flex;
    flex-flow: row;

    textarea {
      flex: 1;
    }

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

</style>
