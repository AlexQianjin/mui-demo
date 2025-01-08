import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(utc);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TimePeriod {
  start: number;
  end: number;
}

export function displayTotalDuration(timePeriods: TimePeriod[]): string {
  if (timePeriods == null || timePeriods.length === 0) {
    return '';
  }

  timePeriods.sort((a: TimePeriod, b: TimePeriod) => a.start - b.start);

  const durations: TimePeriod[] = [];

  durations.push({
    start: timePeriods[0].start,
    end: timePeriods[0].end
  });
  let curIndex = 0;
  for (const timePeriod of timePeriods) {
    if (timePeriod.start > durations[curIndex].end) {
      durations.push({
        start: timePeriod.start,
        end: timePeriod.end
      });
      curIndex += 1;
    } else if (timePeriod.end > durations[curIndex].end) {
      durations[curIndex].end = timePeriod.end;
    }
  }

  let totalDuration: duration.Duration = dayjs.duration(0);
  for (const duration of durations) {
    // const n = dayjs.unix(duration.end).diff(dayjs.unix(duration.start));
    // console.log(n);
    // totalDuration = totalDuration.add(n, 'milliseconds');
    totalDuration = totalDuration.add(dayjs.duration(dayjs.unix(duration.end).diff(dayjs.unix(duration.start))));
  }
  const days: number = Math.floor(totalDuration.asDays());

  return (days === 0 ? '' : `${days} Days `).concat(dayjs.utc(totalDuration.as('milliseconds')).format('HH:mm:ss'));
}
