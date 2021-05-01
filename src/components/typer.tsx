import React, { memo, useEffect, useState } from 'react'

function Typer({ words }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === words.length) {
        setSeconds(0)
      } else {
        setSeconds(seconds + 1)
      }
    }, 3000)
    return () => clearInterval(timer)
  })

  return <span>{words[seconds]}</span>
}

export default Typer
