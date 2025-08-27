import {
  differenceInDays,
  format,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";

// today >> earlier today
// yesterday >> yesterday
// 2 days ago >> 2 days ago
// 9 days ago >> 9 days ago
// 10 days ago >> 5 Mar
// 3 weeks ago >> 27 Feb

export function formatDate(date: string): string {
  const now = new Date();
  const providedDate = parseISO(date);

  if (isToday(providedDate)) {
    return "earlier today";
  }

  if (isYesterday(providedDate)) {
    return "yesterday";
  }

  const daysDiff = differenceInDays(now, providedDate);
  if (daysDiff < 10) {
    return `${daysDiff} days ago`;
  }

  return format(providedDate, "d MMM");
}
