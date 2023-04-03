<template>
  <div class="add-partner-container">
    <div class="partner-cropper">
      <cropper :src="cropperFile"
               v-if="cropperFile"
               ref="cropperRef"
               class="cropper"/>
    </div>
    <label class="btn-standard mt-20" for="img-partner">
      Загрузить логотип
    </label>
    <input type="file"
           ref="imgRef"
           @change="uploadImg"
           style="display: none"
           id="img-partner">
    <label class="field-label mt-10" for="href-partner">Ссылка на сайт</label>
    <span class="field-fail" v-if="valid.href.$invalid && valid.href.$dirty">
        Поле не должно быть пустым и должно являться url адресом
    </span>
    <input type="text"
           id="href-partner"
           v-model="partner.href"
           @blur="valid.href.$touch()"
           class="field-standard">
    <input type="button"
           :disabled="valid.$invalid"
           @click="addPartner"
           class="btn-standard mt-20"
           value="Создать">
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import useImg from '@/hooks/useImg';
import useAlerts from '@/hooks/useAlerts';
import useEditPartner from '@/hooks/useEditPartner';

export default defineComponent({
  name: 'TheAddPartner',
  components: {
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
      partner,
      valid,
      add,
    } = useEditPartner();

    const addPartner = async () => {
      if (cropperFile.value) {
        resizedImg((blob: Blob) => {
          try {
            add(partner.value, blob);
            partner.value.href = '';
            cropperFile.value = null;
            valid.value.$reset();
            alerts.value.push({
              type: 'info',
              message: 'Партнер добавлен',
            });
          } catch (e) {
            alerts.value.push({
              type: 'warning',
              message: 'Не удалось добавит партнера',
            });
          }
        });
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Логотип партнера не загружен',
        });
      }
    };

    return {
      partner,
      valid,
      imgRef,
      cropperRef,
      cropperFile,
      addPartner,
      uploadImg,
      resizedImg,
    };
  },
});
</script>

<style lang="scss" scoped>

.add-partner-container {
  display: flex;
  flex-flow: column;

  .partner-cropper {
    align-self: center;
    width: 30rem;

    .cropper {
      height: 10rem;
    }
  }
}

</style>
