<template>
  <form class="review-item-container">

    <div class="review-point-container">

      <img class="point-image" :src="review.urlImg" :alt="review.urlImg">

      <span class="fs-24 ml-20 review-author">{{ review.name }}</span>

      <button class="btn-standard-icon ml-20"
              @click="toggleBlock">
        <img :src="arrowIcon"
             :class="{'open-edit-block': !isToggleEditBlock}"
             alt="assets/images/icon/arrow.svg">
      </button>
      <button class="btn-warning-icon ml-20"
              @click="removeReview">
        <img :src="trashcanIcon"
             alt="assets/images/icon/trashcan.svg">
      </button>
    </div>

    <div class="review-edit-container mt-10" v-if="isToggleEditBlock">
      <div class="edit-content">
        <div class="data-block">
          <div class="img-cropper">
            <img v-if="!cropperFile" :src="review.urlImg" :alt="review.urlImg" class="cropper-default">
            <cropper :src="cropperFile"
                     ref="cropperRef"
                     v-else
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
          <input type="button"
                 value="обновить"
                 class="btn-standard mt-20"
                 @click="updateImgReview">
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
                   v-model="editableReview.name"
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
                   v-model="editableReview.jobTitle"
                   @blur="valid.jobTitle.$touch()"
                   placeholder="Введите место работы автора"
                   id="jobTitle">
          </app-base-field>
          <app-base-field id="comment"
                          class="mt-10"
                          label="Текст отзыва"
                          :fails="[{
                              isShow: valid.comment.$invalid && valid.comment.$dirty,
                              description: 'Поле не должно быть пустым и быть до 500 символов',
                        }]">
            <app-tooltip text="Размер текста не должен превышать 500 символов включая пробелы.">
              <textarea class="field-standard"
                                  v-model="editableReview.comment"
                                  @blur="valid.comment.$touch()"
                                  placeholder="Введите отзыв"
                                  id="comment">
              </textarea>
              <span class="fs-14" style="align-self: flex-end">{{ `${editableReview.comment.length}/500` }}</span>
            </app-tooltip>
          </app-base-field>
          <button class="btn-standard-icon mt-20"
                  style="width: 100%"
                  :disabled="valid.$invalid"
                  @click="updateReview">
            <img :src="refreshIcon" :alt="refreshIcon">
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { Review } from '@/types/site.types';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import arrowIcon from '@/assets/images/icons/arrow.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import { useStore } from 'vuex';
import useAlerts from '@/hooks/useAlerts';
import useEditReview from '@/hooks/useEditReview';
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import AppBaseField from '@/components/UI/AppBaseField.vue';
import useImg from '@/hooks/useImg';
import AppTooltip from '@/components/UI/AppTooltip.vue';

export default defineComponent({
  name: 'AppEditReviewItem',
  components: {
    AppTooltip,
    AppBaseField,
    Cropper,
    // eslint-disable-next-line vue/no-unused-components
    CircleStencil,
  },
  props: {
    review: {
      type: Object as PropType<Review>,
      required: true,
    },
  },
  setup(props) {
    const { alerts } = useAlerts();
    const store = useStore();
    const isToggleEditBlock = ref<boolean>(false);

    const toggleBlock = () => {
      isToggleEditBlock.value = !isToggleEditBlock.value;
    };

    const {
      review: editableReview,
      valid,
    } = useEditReview({
      id: props.review.id,
      name: props.review.name,
      jobTitle: props.review.jobTitle,
      comment: props.review.comment,
    });

    const {
      imgRef,
      cropperRef,
      cropperFile,
      uploadImg,
      resizedImg,
    } = useImg();

    const removeReview = async () => {
      try {
        await store.dispatch('review/remove', props.review.id);
        alerts.value.push({
          type: 'info',
          message: 'Отзыв удален',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось удалить отзыв',
        });
      }
    };

    const updateImgReview = () => {
      if (cropperFile.value) {
        resizedImg(async (bl: Blob) => {
          try {
            await store.dispatch('review/updateImg', {
              id: props.review.id,
              image: bl,
            });
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

    const updateReview = async () => {
      if (editableReview.value.name !== props.review.name
        || editableReview.value.jobTitle !== props.review.jobTitle
        || editableReview.value.comment !== props.review.comment
      ) {
        try {
          await store.dispatch('review/update', editableReview.value);
          alerts.value.push({
            type: 'info',
            message: 'Отзыв обновлен',
          });
        } catch (e) {
          alerts.value.push({
            type: 'warning',
            message: 'Не удалось обновить отзыв',
          });
        }
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Данные не изменены',
        });
      }
    };

    return {
      editableReview,
      valid,
      imgRef,
      cropperRef,
      cropperFile,
      isToggleEditBlock,
      toggleBlock,
      uploadImg,
      removeReview,
      updateImgReview,
      updateReview,
      trashcanIcon,
      arrowIcon,
      refreshIcon,
    };
  },
});
</script>

<style lang="scss" scoped>

.review-item-container {
  display: flex;
  flex-flow: column;

  .review-point-container {
    display: flex;
    align-items: center;

    .review-author {
      width: 25rem;
      word-wrap: break-word;
      flex: 1;
    }

    .point-image {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
    }
  }

  .review-edit-container {
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

          .cropper-default {
            height: 20rem;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .open-edit-block {
    transform: rotate(180deg);
  }
}

</style>
