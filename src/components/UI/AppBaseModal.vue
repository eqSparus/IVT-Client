<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="background-modal-window"
           v-if="isShow"
           @click="closeModal"
           @keydown.esc="closeModal">
        <div class="modal-window" @click.stop>

          <div v-if="title" class="modal-title">
            <h3 class="fs-32">{{ title }}</h3>
          </div>

          <div class="modal-content">
            <slot></slot>
          </div>

          <div class="modal-footer" v-if="isFooter">
            <div v-if="$slots.footer">
              <slot name="footer"></slot>
            </div>
            <div class="footer-container" v-else>
              <div class="block-end">
                <input type="button" value="закрыть" class="btn-warning" @click="closeModal"/>
              </div>
            </div>
          </div>

        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">

import { defineComponent, onUpdated } from 'vue';

export default defineComponent({
  icon: 'AppModalWindow',
  props: {
    isShow: {
      type: Boolean,
      require: true,
    },
    title: {
      type: String,
      default: '',
    },
    isFooter: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    onUpdated(() => {
      if (props.isShow) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    });

    const closeModal = () => {
      emit('close');
    };

    return {
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;

  .modal-window {
    transition: all 0.5s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  .modal-window {
    transform: translateY(-20vh);
  }

  opacity: 0;
}

.background-modal-window {
  @include utils.scrollbar(prop.$scroll-slider-color,
    prop.$scroll-slider-body-color);
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: prop.$modal-window-area-color;
  z-index: 99999;

  .modal-window {
    background: prop.$modal-window-background-color;
    margin: 20vh auto;
    border-radius: 20px;
    display: flex;
    flex-flow: column;
    width: auto;

    .modal-title {
      padding: 10px 20px;
      text-align: center;
      border-bottom: 1px solid black;

      h3 {
        @include utils.fontStyle($weight: 400, $color: prop.$modal-window-text-color);
      }
    }

    .modal-content {
      padding: 20px;
    }

    .modal-footer {
      border-top: 1px solid black;
      padding: 20px;

      .footer-container {
        display: flex;
        flex-flow: column;

        .block-end {
          align-self: flex-end;
        }
      }
    }

  }
}
</style>
