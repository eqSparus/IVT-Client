<template>
  <div class="add-teacher-container">

    <div class="change-container">

      <div class="change-container-block">
        <div class="img-cropper">
          <cropper :src="cropperFile"
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
      </div>

      <div class="change-container-block ml-20">
        <div class="double-block">
          <div class="block-column">
            <label class="field-label" for="last-name">Имя преподавателя*</label>
            <span class="field-fail" v-if="valid.firstName.$invalid && valid.firstName.$dirty">
              Поле не должно быть пустым
            </span>
            <input type="text"
                   class="field-standard"
                   v-model="newTeacher.firstName"
                   @blur="valid.firstName.$touch()"
                   placeholder="Введите имя преподавателя"
                   id="last-name">
          </div>

          <div class="block-column">
            <label class="field-label" for="first-name">Фамилия преподавателя*</label>
            <span class="field-fail" v-if="valid.lastName.$invalid && valid.lastName.$dirty">
              Поле не должно быть пустым
            </span>
            <input type="text"
                   class="field-standard"
                   @blur="valid.lastName.$touch()"
                   v-model="newTeacher.lastName"
                   placeholder="Введите фамилия преподавателя"
                   id="first-name">
          </div>
        </div>

        <div class="double-block">
          <div class="block-column">
            <label class="field-label mt-10" for="middle-name">Отчество преподавателя</label>
            <input type="text"
                   class="field-standard"
                   v-model="newTeacher.middleName"
                   placeholder="Введите отчество преподавателя"
                   id="middle-name">
          </div>
          <div class="block-column">
            <label class="field-label mt-10" for="post-department">Должность на кафедре</label>
            <app-tooltip text="Должность преподавателя по АУП (Административно-управленческий персонал) например
зав. кафедрой, заместитель зав. кафедры и тд.">
              <input type="text"
                     id="post-department"
                     v-model="newTeacher.postDepartment"
                     class="field-standard"
                     placeholder="Введите должность на кафедре">
            </app-tooltip>
          </div>
        </div>

        <label class="field-label mt-10" for="post-teacher">Должность преподавателя</label>
        <app-tooltip text="Должность преподавателя по ППС (профессорско-преподавательский состав) например
профессор, доцент, стр. преподаватель, ассистент и тд.">
                  <textarea class="field-standard text-area"
                            id="post-teacher"
                            v-model="newTeacher.postTeacher"
                            placeholder="Введите должность преподавателя">

        </textarea>
        </app-tooltip>

        <label class="field-label  mt-10" for="post-additional">
          Дополнительная должность
        </label>
        <app-tooltip text="Дополнительная должность преподавателя с предприятия при наличие таковой">
          <input type="text"
                 class="field-standard"
                 id="post-additional"
                 placeholder="Введите дополнительную должность"
                 v-model="newTeacher.postAdditional">
        </app-tooltip>
      </div>

    </div>

    <input type="button"
           class="btn-standard mt-20"
           value="создать"
           :disabled="valid.$invalid"
           @click="addTeacher">

  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import useImg from '@/hooks/useImg';
import useEditTeacher from '@/hooks/useEditTeacher';
import useAlerts from '@/hooks/useAlerts';
import AppTooltip from '@/components/UI/AppTooltip.vue';

export default defineComponent({
  name: 'TheAddTeacher',
  components: {
    AppTooltip,
    Cropper,
  },
  setup() {
    const { alerts } = useAlerts();

    const {
      imgRef,
      cropperRef,
      cropperFile,
      uploadImg,
      resizedImg,
    } = useImg();

    const {
      teacher: newTeacher,
      valid,
      add,
    } = useEditTeacher();

    const addTeacher = () => {
      if (cropperFile.value) {
        resizedImg(async (bl: Blob) => {
          try {
            await add(newTeacher.value, bl);
            newTeacher.value.firstName = '';
            newTeacher.value.lastName = '';
            newTeacher.value.middleName = '';
            newTeacher.value.postDepartment = '';
            newTeacher.value.postTeacher = '';
            newTeacher.value.postAdditional = '';
            cropperFile.value = null;
            valid.value.$reset();
            alerts.value.push({
              type: 'info',
              message: 'Преподаватель добавлен',
            });
          } catch (e) {
            alerts.value.push({
              type: 'warning',
              message: 'Не удалось добавить преподавателя',
            });
          }
        });
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Фотография преподавателя не загружена',
        });
      }
    };

    return {
      imgRef,
      cropperRef,
      cropperFile,
      newTeacher,
      valid,
      addTeacher,
      uploadImg,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss' as utils;

.add-teacher-container {
  display: flex;
  flex-flow: column;

  .change-container {
    display: flex;
    flex-flow: row;

    div:first-child {
      flex: 1;
    }

    div:last-child {
      flex: 4;
    }

    .change-container-block {
      display: flex;
      flex-flow: column;

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
