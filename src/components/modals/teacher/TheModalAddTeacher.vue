<template>
  <div class="add-teacher-container">

    <app-message-alert type="warning"
                       message="Файл не загружен"
                       :is-show="isMessageShow"
                       :timeout="1500"
                       @vanish="isMessageShow = false"/>

    <div class="change-container">

      <div class="change-container-block">
        <div class="img-cropper">
          <cropper :src="cropperFile"
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
          Загрузить фото
        </label>
        <input type="file"
               ref="imgFileRef"
               @change="downloadImg"
               style="display: none"
               id="img-teacher">
      </div>

      <div class="change-container-block ml-20">
        <div class="double-block">
          <div class="block-column">
            <label class="field-label" for="last-name">Имя преподавателя*</label>
            <span class="field-fail" v-if="validate.firstName.$invalid && validate.firstName.$dirty">
              Поле не должно быть пустым
            </span>
            <input type="text"
                   class="field-standard"
                   v-model="newTeacher.firstName"
                   @blur="validate.firstName.$touch()"
                   placeholder="Введите имя преподавателя"
                   id="last-name">
          </div>

          <div class="block-column">
            <label class="field-label" for="first-name">Фамилия преподавателя*</label>
            <span class="field-fail" v-if="validate.lastName.$invalid && validate.lastName.$dirty">
              Поле не должно быть пустым
            </span>
            <input type="text"
                   class="field-standard"
                   @blur="validate.lastName.$touch()"
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
            <label class="field-label mt-10" for="post-name">Должность преподавателя</label>
            <input type="text"
                   id="post-name"
                   v-model="newTeacher.post"
                   class="field-standard"
                   placeholder="Введите должность преподавателя">
          </div>
        </div>

        <label class="field-label mt-10" for="scientific-degree">Ученая степень</label>
        <textarea class="field-standard text-area"
                  id="scientific-degree"
                  v-model="newTeacher.scientificDegree"
                  placeholder="Введите ученую степень преподавателя">

        </textarea>
      </div>

    </div>

    <input type="button"
           class="btn-standard mt-20"
           value="создать"
           :disabled="validate.$invalid"
           @click="addTeacher">

  </div>
</template>

<script lang="ts">

import { defineComponent, reactive, ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import AppMessageAlert from '@/components/UI/AppMessageAlert.vue';
import { createTeacher } from '@/api/TeacherApi';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TheModalAddTeacher',
  components: {
    AppMessageAlert,
    Cropper,
  },
  setup() {
    const store = useStore();
    const imgFileRef = ref<InstanceType<typeof HTMLInputElement>>();
    const cropperFile = ref<string | ArrayBuffer | null>();
    const cropperImgRef = ref<typeof Cropper | null>(null);
    const isMessageShow = ref<boolean>(false);
    const newTeacher = reactive({
      firstName: '',
      lastName: '',
      middleName: '',
      post: '',
      scientificDegree: '',
    });

    const rules = {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
    };

    const validate = useVuelidate(rules, newTeacher);

    const downloadImg = () => {
      const reader = new FileReader();
      const file = (imgFileRef.value as HTMLInputElement).files?.[0];
      reader.readAsDataURL(file as File);
      reader.onload = (e) => {
        cropperFile.value = e.target?.result;
      };
    };

    const addTeacher = async () => {
      if (cropperFile.value && cropperImgRef.value) {
        const { canvas } = cropperImgRef.value.getResult();
        canvas.toBlob(async (bl: Blob) => {
          const form = new FormData();
          form.append('img', bl, 'img.jpg');
          form.append('data', new Blob([JSON.stringify(newTeacher)], {
            type: 'application/json',
          }));
          const data = await createTeacher(form);
          store.commit('teacher/setTeacher', data);
          newTeacher.firstName = '';
          newTeacher.lastName = '';
          newTeacher.middleName = '';
          newTeacher.post = '';
          newTeacher.scientificDegree = '';
          cropperFile.value = null;
          validate.value.$reset();
        }, 'image/jpeg');
      } else {
        isMessageShow.value = true;
      }
    };

    return {
      isMessageShow,
      imgFileRef,
      cropperImgRef,
      cropperFile,
      newTeacher,
      validate,
      setTeacher: addTeacher,
      downloadImg,
      addTeacher,
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
      width: 15%;

      .img-cropper {
        width: 100%;

        .cropper {
          width: 100%;
          height: 25vh;
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
