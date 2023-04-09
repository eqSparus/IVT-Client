<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="background-modal-window"
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
              <input type="button" value="закрыть" class="btn-warning" @click="closeModal"/>
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
@use '@/assets/scss/utils.scss';
@import '@/assets/scss/extends.scss';

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
  @extend %standard-scroll-bar;
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
      border-bottom: 1px solid prop.$main-first-color;
      user-select: none;
      @include utils.fontStyle($color: prop.$main-first-color);
    }

    .modal-content {
      padding: 2rem;
    }

    .modal-footer {
      border-top: 1px solid prop.$main-first-color;
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
