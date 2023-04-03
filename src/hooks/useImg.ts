import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';

const useImg = () => {
  const imgRef = ref<HTMLInputElement>();
  const cropperRef = ref<typeof Cropper>();
  const cropperFile = ref<string | ArrayBuffer | null>();

  const uploadImg = () => {
    const reader = new FileReader();
    const file = (imgRef.value as HTMLInputElement).files?.[0];
    reader.readAsDataURL(file as File);
    reader.onload = (e) => {
      cropperFile.value = e.target?.result;
    };
  };

  const resizedImg = (action: (blob: Blob) => void, typeImg = 'image/jpeg') => {
    if (cropperRef.value) {
      const { canvas } = cropperRef.value.getResult();
      canvas.toBlob((bl: Blob) => action(bl), typeImg);
    }
  };

  return {
    imgRef,
    cropperRef,
    cropperFile,
    uploadImg,
    resizedImg,
  };
};

export default useImg;
