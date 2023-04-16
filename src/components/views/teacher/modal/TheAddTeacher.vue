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
            <app-base-field id="first-name"
                            label="Имя преподавателя*"
                            :fails="[{
                              isShow: valid.firstName.$invalid && valid.firstName.$dirty,
                              description: 'Поле не должно быть пустым',
                            }]">
              <input type="text"
                     class="field-standard"
                     v-model="newTeacher.firstName"
                     @blur="valid.firstName.$touch()"
                     placeholder="Введите имя преподавателя"
                     id="last-name">
            </app-base-field>
          </div>

          <div class="block-column">
            <app-base-field id="last-name"
                            label="Фамилия преподавателя*"
                            :fails="[{
                              isShow: valid.lastName.$invalid && valid.lastName.$dirty,
                              description: 'Поле не должно быть пустым',
                            }]">
              <input type="text"
                     class="field-standard"
                     @blur="valid.lastName.$touch()"
                     v-model="newTeacher.lastName"
                     placeholder="Введите фамилия преподавателя"
                     id="last-name">
            </app-base-field>
          </div>
        </div>

        <div class="double-block mt-10">
          <div class="block-column">
            <app-base-field id="middle-name"
                            label="Отчество преподавателя">
              <input type="text"
                     class="field-standard"
                     v-model="newTeacher.middleName"
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
                       v-model="newTeacher.postDepartment"
                       class="field-standard"
                       placeholder="Введите должность на кафедре">
              </app-tooltip>
            </app-base-field>
          </div>
        </div>

        <app-base-field id="post-teacher"
                        class="mt-10"
                        label="Должность преподавателя">
          <app-tooltip text="Должность преподавателя по ППС (профессорско-преподавательский состав) например
профессор, доцент, стр. преподаватель, ассистент и тд.">
                  <textarea class="field-standard field-area"
                            id="post-teacher"
                            v-model="newTeacher.postTeacher"
                            placeholder="Введите должность преподавателя">

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
                   v-model="newTeacher.postAdditional">
          </app-tooltip>
        </app-base-field>
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
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  name: 'TheAddTeacher',
  components: {
    AppBaseField,
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

.add-teacher-container {
  display: flex;
  flex-flow: column;

  .change-container {
    display: flex;
    flex-flow: row;

    textarea {
      flex: 3;
    }

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

</style>
