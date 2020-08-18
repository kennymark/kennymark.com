import React from 'react'
import moment from 'moment/moment'

function Date({ date }) {
  return (
    <p className='text-gray-500 pr-3 tracking-wider'>{moment(date, 'DD-MM-YY').format('MMMM Do YYYY')} </p>
  )
}

export default Date
