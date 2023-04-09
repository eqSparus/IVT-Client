<template>
  <app-base-modal title="Изменить партнера"
                  :is-show="isShow"
                  :is-footer="true"
                  @close="close">

    <div class="edit-partner-container">
      <div class="partner-image">
        <div class="partner-cropper mr-20" v-if="cropperFile">
          <cropper :src="cropperFile"
                   ref="cropperRef"
                   class="cropper"/>
        </div>
        <div class="upload-img">
          <label class="btn-standard" for="img-partner">
            Загрузить новый логотип
          </label>
          <input type="file"
                 ref="imgRef"
                 @change="uploadImg"
                 style="display: none"
                 id="img-partner">

          <input type="button"
                 class="btn-standard mt-20"
                 @click="updateImgPartner"
                 value="Обновить логотип">
        </div>
      </div>

      <label class="field-label mt-10" for="href">Ссылка на сайт партнера</label>
      <span class="field-fail" v-if="valid.href.$invalid || valid.href.$dirty">
        Поле не должно быть пустым и должно являться url адресом
      </span>
      <input type="text"
             class="field-standard"
             v-model="editPartner.href"
             @blur="valid.href.touch()"
             id="href"
             placeholder="Введите ссылку на сайт партнера">

      <input type="button"
             :disabled="valid.$invalid"
             class="btn-standard mt-20"
             @click="updatePartner"
             value="Обновить">

      <input type="button"
             class="btn-warning mt-20"
             @click="deletePartner"
             value="Удалить">

    </div>

  </app-base-modal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';
import { Partner } from '@/types/SiteContentTypes';
import { Cropper } from 'vue-advanced-cropper';
import useAlerts from '@/hooks/useAlerts';
import useEditPartner from '@/hooks/useEditPartner';
import useImg from '@/hooks/useImg';

export default defineComponent({
  name: 'TheModalEditPartner',
  components: {
    AppBaseModal,
    Cropper,
  },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    partner: {
      type: Object as PropType<Partner>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { alerts } = useAlerts();

    const {
      imgRef,
      cropperFile,
      cropperRef,
      uploadImg,
      resizedImg,
    } = useImg();

    const {
      partner: editPartner,
      valid,
      remove,
      update,
      updateImg,
    } = useEditPartner({
      id: props.partner.id,
      href: props.partner.href,
    });

    const close = () => {
      emit('close');
    };

    const deletePartner = async () => {
      close();
      try {
        await remove(props.partner.id as string);
        alerts.value.push({
          type: 'info',
          message: 'Партнер удален',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось удалить партнера',
        });
      }
    };

    const updatePartner = async () => {
      if (props.partner.href !== editPartner.value.href) {
        try {
          await update();
          alerts.value.push({
            type: 'info',
            message: 'Партнер обновлен',
          });
        } catch (e) {
          alerts.value.push({
            type: 'warning',
            message: 'Не удалось обновить партнера',
          });
        }
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Данные не изменены',
        });
      }
    };

    const updateImgPartner = async () => {
      if (cropperFile.value) {
        resizedImg(async (bl: Blob) => {
          try {
            await updateImg(bl, props.partner.id as string);
            cropperFile.value = null;
            alerts.value.push({
              type: 'info',
              message: 'Логотип обновлена',
            });
          } catch (e) {
            alerts.value.push({
              type: 'warning',
              message: 'Не удалось обновить логотип',
            });
          }
        }, 'image/png');
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Загрузите новую фотографию',
        });
      }
    };

    return {
      editPartner,
      valid,
      imgRef,
      cropperFile,
      cropperRef,
      uploadImg,
      resizedImg,
      deletePartner,
      updatePartner,
      updateImgPartner,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>

.edit-partner-container {
  display: flex;
  flex-flow: column;
  width: 40vw;

  .partner-image {
    display: flex;
    flex-flow: row;
    align-items: center;

    .partner-cropper {
      width: 30rem;

      .cropper {
        height: 10rem;
      }
    }

    .upload-img {
      display: flex;
      flex-flow: column;
      flex: 1;
    }
  }
}

</style>
