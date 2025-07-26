export function formatDate(
  date: Date | string | number,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" }
): string {
  const dt = new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dt);
}

export function formatTime(
  date: Date | string | number,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = { timeStyle: "short" }
): string {
  const dt = new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dt);
}

export function formatDateTime(
  date: Date | string | number,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  }
): string {
  const dt = new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dt);
}
