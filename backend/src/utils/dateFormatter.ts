import { formatDistanceToNow, format } from "date-fns";

/**
 * Returns a relative time string like "2 weeks ago"
 * @param {Date} date - The date to compare with now
 */
export const getRelativeTime = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};

/**
 * Returns a formatted absolute date like "2 Oct 2025"
 * @param {Date} date - The date to format
 */
export const getFormattedDate = (date: Date) => {
  return format(date, "d MMM yyyy");
};

export const formatBDT = (amount: number) => {
  return amount.toLocaleString("en-BD");
};
