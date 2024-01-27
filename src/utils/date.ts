import { DateTime } from "luxon";

export function formatDate(dateUtc: string) {
  return DateTime.fromISO(dateUtc).setLocale("it").toFormat("dd/MM");
}
