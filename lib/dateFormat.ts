import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

function dateFormat(date) {
  return dayjs(date, 'DD-MM-YY')
}
export { dateFormat }