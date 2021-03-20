import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import yearAgo from 'dayjs/plugin/relativeTime'

dayjs.extend(customParseFormat)
dayjs.extend(yearAgo)

const dateFormat = (date: string) => dayjs(date, 'DD/MM/YY')
const ago = (date: string) => dayjs().to(dayjs(date, 'DD/MM/YY'))

export { dateFormat, ago }