import { computed, ref, watch } from 'vue';

export function useTimer(time = 300) {
  const timeToResend = ref(0);
  const ticker = ref('');

  function startTimer() {
    timeToResend.value = localStorage.getItem('timeToResend') || time;

    ticker.value = setInterval(() => {
      timeToResend.value--;

      localStorage.setItem('timeToResend', timeToResend.value);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(ticker.value);
    timeToResend.value = 0;
    localStorage.removeItem('timeToResend');
  }

  const timerValue = computed({
    get: () => {
      const seconds = timeToResend.value % 60;
      const minutes = (timeToResend.value - seconds) / 60;

      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    },
  });

  watch(timeToResend, (time) => {
    if (time > 0) {
      return;
    }

    stopTimer();
  });

  return {
    timeToResend,
    startTimer,
    stopTimer,
    timerValue,
  };
}
