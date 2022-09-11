import Timer from 'types/Timer';

export const calculateTimeLeft = (): Timer => {
  const year = new Date().getFullYear();
  const difference = +new Date('May 4, 2024 15:37:25').getTime() - +new Date().getTime();

  let timeLeft: Timer = {} as Timer;

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};
