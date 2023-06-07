<template>
  <div class="add-review-container">
    <div class="edit-content">
      <div class="data-block">
        <div class="img-cropper">
          <cropper :src="cropperFile"
                   ref="cropperRef"
                   :stencil-component="$options.components.CircleStencil"
                   :stencil-props="{
                     aspectRatio: 1/1
                   }"
                   class="cropper"/>
        </div>
        <label class="btn-standard mt-10" for="img-review">
          Загрузить
        </label>
        <input type="file"
               ref="imgRef"
               @change="uploadImg"
               style="display: none"
               id="img-review">
      </div>
      <div class="data-review" style="flex: 1">
        <app-base-field id="name"
                        label="Имя автора"
                        :fails="[{
                              isShow: valid.name.$invalid && valid.name.$dirty,
                              description: 'Поле не должно быть пустым',
                        }]">
          <input type="text"
                 class="field-standard"
                 v-model="review.name"
                 @blur="valid.name.$touch()"
                 placeholder="Введите ФИО автора"
                 id="name">
        </app-base-field>
        <app-base-field id="jobTitle"
                        class="mt-10"
                        label="Место работы автора"
                        :fails="[{
                              isShow: valid.jobTitle.$invalid && valid.jobTitle.$dirty,
                              description: 'Поле не должно быть пустым',
                        }]">
          <input type="text"
                 class="field-standard"
                 v-model="review.jobTitle"
                 @blur="valid.jobTitle.$touch()"
                 placeholder="Введите место работы автора"
                 id="jobTitle">
        </app-base-field>
        <app-base-field id="comment"
                        class="mt-10"
                        label="Текст отзыва"
                        :fails="[{
                              isShow: valid.comment.$invalid && valid.comment.$dirty,
                              description: 'Поле не должно быть пустым и быть не более 500 символов',
                        }]">
          <app-tooltip text="Размер текста не должен превышать 500 символов включая пробелы.">
            <textarea class="field-standard"
                      v-model="review.comment"
                      @blur="valid.comment.$touch()"
                      placeholder="Введите отзыв"
                      id="comment">
            </textarea>
            <span class="fs-14" style="align-self: flex-end">{{ `${review.comment.length}/500` }}</span>
          </app-tooltip>
        </app-base-field>
      </div>
    </div>
    <input type="button"
           class="btn-standard mt-20"
           value="Добавить"
           @click="addReview"
           :disabled="valid.$invalid">
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { CircleStencil, Cropper } from 'vue-advanced-cropper';
import useImg from '@/hooks/useImg';
import AppBaseField from '@/components/UI/AppBaseField.vue';
import useEditReview from '@/hooks/useEditReview';
import { useStore } from 'vuex';
import useAlerts from '@/hooks/useAlerts';
import AppTooltip from '@/components/UI/AppTooltip.vue';

export default defineComponent({
  name: 'TheAddReviewBlock',
  components: {
    AppTooltip,
    AppBaseField,
    Cropper,
    // eslint-disable-next-line vue/no-unused-components
    CircleStencil,
  },
  setup() {
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
      review,
      valid,
    } = useEditReview();

    const addReview = () => {
      if (cropperFile.value) {
        resizedImg(async (bl: Blob) => {
          try {
            await store.dispatch('review/add', {
              dataReview: review.value,
              image: bl,
            });
            review.value.name = '';
            review.value.jobTitle = '';
            review.value.comment = '';
            cropperFile.value = null;
            valid.value.$reset();
            alerts.value.push({
              type: 'info',
              message: 'Отзыв добавлен',
            });
          } catch (e) {
            alerts.value.push({
              type: 'warning',
              message: 'Не удалось добавить отзыв',
            });
          }
        });
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Фотография автора не загружена',
        });
      }
    };

    return {
      review,
      valid,
      imgRef,
      cropperRef,
      cropperFile,
      uploadImg,
      addReview,
    };
  },
});
</script>

<style lang="scss" scoped>

.add-review-container {
  display: flex;
  flex-flow: column;

  .edit-content {
    display: flex;
    flex-flow: row;
    column-gap: 2%;
    align-items: flex-end;

    .data-block {
      display: flex;
      flex-flow: column;

      .img-cropper {
        width: 20rem;

        .cropper {
          height: 20rem;
        }
      }
    }
  }
}

</style>
