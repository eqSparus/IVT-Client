import { ref } from 'vue';
import { AlertMessage } from '@/components/UI/AppListAlert.vue';

const alerts = ref<Array<AlertMessage>>([]);

const useAlerts = () => {
  const deleteAlert = (start = 0, count = 1) => {
    alerts.value.splice(start, count);
  };

  return {
    alerts,
    deleteAlert,
  };
};

export default useAlerts;
