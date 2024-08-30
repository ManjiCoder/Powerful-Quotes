'use client';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { useLayoutEffect, useRef } from 'react';

const calculateTimeDiff = (targetElemt: HTMLDivElement | null) => {
  const startDate = new Date().setHours(0, 0, 0, 0);
  const days = differenceInDays(new Date(), startDate);
  const hrs = (differenceInHours(new Date(), startDate) % 24)
    .toString()
    .padStart(2, '0');
  const mins = (differenceInMinutes(new Date(), startDate) % 60)
    .toString()
    .padStart(2, '0');
  const secs = (differenceInSeconds(new Date(), startDate) % 60)
    .toString()
    .padStart(2, '0');
  // console.log({ days, hrs, mins, secs });
  if (targetElemt) {
    const [dd, hh, mm, ss] = Array.from(targetElemt.querySelectorAll('h2'));
    // @ts-ignore
    dd.querySelectorAll('span')[0].innerHTML = days;
    hh.querySelectorAll('span')[0].innerHTML = hrs;
    mm.querySelectorAll('span')[0].innerHTML = mins;
    ss.querySelectorAll('span')[0].innerHTML = secs;
  }
};

export default function DaysInfo() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const targetElemt = ref.current;
    const intervalId = setInterval(() => calculateTimeDiff(targetElemt), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col place-items-center text-balance">
      <h1 className="mb-3 text-4xl md:text-6xl font-semibold">
        <span className="text-mark">{0}</span> / 150{' '}
        <span className="text-xl md:text-3xl">Days</span>{' '}
      </h1>
      <header className="flex place-items-center space-x-3 text-center">
        <div className="text-4xl">⌛</div>

        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{0}</span>
          <span className="text-base">{0 > 2 ? 'Days' : 'Day'}</span>
        </h2>
        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{0}</span>
          <span className="text-base">{0 > 2 ? 'Hrs' : 'Hr'}</span>
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
