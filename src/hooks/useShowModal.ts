import { ref } from 'vue';

export default () => {
  const isShow = ref<boolean>(false);

  const toggleModal = () => {
    isShow.value = !isShow.value;
  };

  return {
    isShow,
    toggleModal,
  };
};
