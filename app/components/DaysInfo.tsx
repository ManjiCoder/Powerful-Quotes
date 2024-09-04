'use client';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { useLayoutEffect, useRef } from 'react';

const calculateTimeDiff = (
  targetElemt: HTMLDivElement | null,
  startDate: Date | number,
  currentDate: Date
) => {
  const days = differenceInDays(currentDate, startDate);
  const hrs = (differenceInHours(currentDate, startDate) % 24)
    .toString()
    .padStart(2, '0');
  console.log({
    startDate: new Date(startDate).toLocaleTimeString(),
    currentDate: new Date(currentDate).toLocaleTimeString(),
  });
  const mins = (differenceInMinutes(currentDate, startDate) % 60)
    .toString()
    .padStart(2, '0');
  const secs = (differenceInSeconds(currentDate, startDate) % 60)
    .toString()
    .padStart(2, '0');
  // console.log({ days, hrs, mins, secs });
  if (targetElemt) {
    const ongoingDay = targetElemt.querySelector('h1');
    const [dd, hh, mm, ss] = Array.from(targetElemt.querySelectorAll('h2'));
    // @ts-ignore
    ongoingDay.querySelectorAll('span')[0].innerHTML = days;
    // @ts-ignore
    dd.querySelectorAll('span')[0].innerHTML = days;
    if (days > 2) {
      dd.querySelectorAll('span')[1].innerHTML = 'Days';
    }
    hh.querySelectorAll('span')[0].innerHTML = hrs;
    if (parseInt(hrs) > 2) {
      hh.querySelectorAll('span')[1].innerHTML = 'Hrs';
    }
    mm.querySelectorAll('span')[0].innerHTML = mins;
    ss.querySelectorAll('span')[0].innerHTML = secs;
  }
};

export default function DaysInfo() {
  const getDates = () => {
    // @ts-ignore
    const startDate = JSON.parse(localStorage.getItem('startDate'));
    return startDate;
  };

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const startDate = getDates();
    const targetElemt = ref.current;
    if (startDate) {
      const intervalId = setInterval(
        () => calculateTimeDiff(targetElemt, 1725474600000, new Date()),
        1000
      );
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <div
      ref={ref}
      className="relative max-sm:left-8 flex flex-col place-items-center text-balance"
    >
      <h1 className="mb-3 text-4xl md:text-6xl font-semibold">
        <span className="text-mark">{0}</span> / 150{' '}
        <span className="text-xl md:text-3xl">Days</span>{' '}
      </h1>
      <header className="flex place-items-center space-x-3 text-center">
        <div className="text-4xl">⌛</div>

        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{0}</span>
          <span className="text-base">Day</span>
        </h2>
        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{0}</span>
          <span className="text-base">Hr</span>
        </h2>
        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{0}</span>
          {/* <span className="text-base">{mins > 2 ? 'Mins' : 'Min'}</span> */}
          <span className="text-base mins">M</span>
        </h2>
        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span suppressHydrationWarning className="text-mark">
            {0}
          </span>
          <span className="text-base">S</span>
        </h2>
      </header>
    </div>
  );
}
