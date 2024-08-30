'use client';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { useLayoutEffect, useRef } from 'react';

export default function DaysInfo() {
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
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    console.log(ref.current);
    console.log({ days, hrs, mins, secs });
  }, []);

  return (
    <div ref={ref} className="flex flex-col place-items-center text-balance">
      <h1 className="mb-3 text-4xl md:text-6xl font-semibold">
        <span className="text-mark">{days}</span> / 150{' '}
        <span className="text-xl md:text-3xl">Days</span>{' '}
      </h1>
      <header className="flex place-items-center space-x-3 text-center">
        <div className="text-4xl">⌛</div>

        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{days}</span>
          <span className="text-base">{days > 2 ? 'Days' : 'Day'}</span>
        </h2>
        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{hrs}</span>
          <span className="text-base">{parseInt(hrs) > 2 ? 'Hrs' : 'Hr'}</span>
        </h2>
        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{mins}</span>
          {/* <span className="text-base">{mins > 2 ? 'Mins' : 'Min'}</span> */}
          <span className="text-base">M</span>
        </h2>
        <h2 className="min-w-14 md:min-w-24 mb-3 mt-4 text-2xl font-semibold flex space-x-1 items-baseline">
          <span className="text-mark">{secs}</span>
          <span className="text-base">S</span>
        </h2>
      </header>
    </div>
  );
}
