import { describe, test, expect } from 'vitest';
import { useTimer } from '../timer.js';

describe('useTimer', () => {
  const { timeToResend, startTimer, stopTimer, timerValue } = useTimer();

  test('Метод startTimer должен запускать таймер', () => {
    expect(timeToResend.value).toBe(0);

    startTimer();

    expect(timeToResend.value).toBe(300);
  });

  test('Метод stopTimer должен запускать таймер', () => {
    startTimer();
    expect(timeToResend.value).toBe(300);

    stopTimer();
    expect(timeToResend.value).toBe(0);
  });

  test('Computed timerValue должен возвращать отформатированное время', () => {
    startTimer();
    expect(timerValue.value).toBe('5:00');

    timeToResend.value = 144;

    expect(timerValue.value).toBe('2:24');
  });
});
