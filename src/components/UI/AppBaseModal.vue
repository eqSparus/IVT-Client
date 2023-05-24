<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="modal-window-background"
           v-if="isShow"
           @click="closeModal"
           @keydown.esc="closeModal">
        <div class="modal-window" @click.stop>

          <h3 v-if="title" class="modal-title fs-32">{{ title }}</h3>

          <div class="modal-content">
            <slot></slot>
          </div>

          <div class="modal-footer" v-if="isFooter">
            <slot v-if="$slots.footer" name="footer"></slot>
            <div class="footer-container" v-else>
              <input type="button"
                     value="закрыть"
                     class="btn-warning"
                     @click="closeModal"/>
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
    isFocus: {
      type: Boolean,
      require: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    onUpdated(() => {
      if (props.isShow) {
        const elementContainer = document.querySelector('.modal-content');
        if (elementContainer && props.isFocus) {
          const elementFocus = elementContainer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          (elementFocus as HTMLInputElement).focus();
        }
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
@use '@/assets/scss/utils.scss';
@import '@/assets/scss/extends.scss';

$animation-name: 'modal';

@include utils.animation-to($name: $animation-name) {
  transition: all 0.5s ease;

  .modal-window {
    transition: all 0.5s ease;
  }
}

@include utils.animation-from($name: $animation-name) {
  opacity: 0;

  .modal-window {
    transform: translateY(-20vh);
  }
}

.modal-window-background {
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: prop.$main-first-dark-transparent-color;
  z-index: 99999;

  .modal-window {
    margin: 20vh auto;
    background: prop.$main-second-color;
    border-radius: 2rem;
    display: flex;
    flex-flow: column;
    max-width: max-content;

    .modal-title {
      padding: 1rem 2rem;
      text-align: center;
      border-bottom: 0.1rem solid prop.$main-first-color;
      user-select: none;
      @include utils.font-style($color: prop.$main-first-color);
    }

    .modal-content {
      padding: 2rem;
    }

    .modal-footer {
      border-top: 0.1rem solid prop.$main-first-color;
      padding: 2rem;

      .footer-container {
        display: flex;
        flex-flow: column;
        align-items: flex-end;
      }
    }
  }
}
</style>
