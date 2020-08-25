import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

function Date({ date }) {
  return (
    <p>{dayjs(date, 'DD-MM-YY').format('MMMM DD, YYYY')} </p>
  )
}

export default Date
