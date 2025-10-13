export function formatTimezone(timezoneSeconds?: number): string {
  if (timezoneSeconds === null || timezoneSeconds === undefined) {
    return 'N/A';
  }

  if (timezoneSeconds === 0) {
    return 'UTC';
  }

  const hours = timezoneSeconds / 3600;
  const absoluteHours = Math.abs(hours);
  const sign = hours >= 0 ? '+' : '-';

  const wholeHours = Math.floor(absoluteHours);
  const minutes = Math.round((absoluteHours - wholeHours) * 60);

  return `UTC${sign}${wholeHours}:${minutes.toString().padStart(2, '0')}`;
}
