import { intervalToDuration, formatDuration, Interval, format } from 'date-fns';
import { get } from 'lodash';
import { INDY_ROLE_TYPES, INDY_TXN_TYPES } from './contstant';

export const durationInWords = (s: number) => {
  let duration = intervalToDuration({ start: 0, end: s });
  if (duration.minutes) {
    duration.seconds = undefined;
  }
  if (duration.days) {
    duration.seconds = undefined;
    duration.minutes = undefined;
  }
  if (duration.weeks) {
    duration.hours = undefined;
  }
  if (duration.months) {
    duration.hours = undefined;
  }
  if (duration.years) {
    duration.weeks = undefined;
  }
  return formatDuration(duration);
};

export const dateToString = (
  s: number,
  formatString: string = 'MMM d, yyyy pp'
) => format(s, formatString);

export const convertToType = (s: string) => get(INDY_TXN_TYPES, s);
