'use client';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
export default function DaysInfo() {
  const startDate = new Date().setHours(0, 0, 0, 0);
  const days = differenceInDays(new Date(), startDate);
  const hrs = differenceInHours(new Date(), startDate) % 24;
  const mins = differenceInMinutes(new Date(), startDate) % 60;
  const secs = differenceInSeconds(new Date(), startDate) % 60;
  console.log({ days, hrs, mins, secs });
  return (
    <div className="flex flex-col place-items-center text-balance">
      <h1 className="mb-3 text-6xl font-semibold md:ml-20">
        <span className="text-mark">{days}</span> / 150{' '}
        <span className="text-5xl">Days</span>{' '}
      </h1>
      <h2 className="mb-3  mt-4 text-2xl font-semibold">
        Time Complete <span className="text-mark">{days}</span>{' '}
        {days > 2 ? 'Days' : 'Day'}
      </h2>
    </div>
  );
}
