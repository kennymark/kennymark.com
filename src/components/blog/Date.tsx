import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { dateFormat } from 'lib/dateFormat'

dayjs.extend(customParseFormat)

function Date({ date }) {
  return (
    <p>{dateFormat(date).format('MMMM DD, YYYY')} </p>
  )
}

export default Date
