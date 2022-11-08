import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formateUTC(
  utcString: string,
  formateString = 'YYYY-MM-DD hh:mm:ss'
): string {
  return dayjs.utc(utcString).utcOffset(8).format(formateString)
}
