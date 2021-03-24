import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import yearAgo from 'dayjs/plugin/relativeTime'

dayjs.extend(customParseFormat)
dayjs.extend(yearAgo)

const dateFormat = (date: string) => dayjs(date)
const ago = (date: string) => dayjs().to(date)

export { dateFormat, ago }