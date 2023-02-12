import { ref } from 'vue';

export default () => {
  const isShow = ref<boolean>(false);

  const changeShowModal = () => {
    isShow.value = !isShow.value;
  };

  return {
    isShow,
    changeShowModal,
  };
};
