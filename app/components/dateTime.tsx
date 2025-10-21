"use client"

import { useEffect, useRef, useState } from "react";

const DateTime = ({className }: { className: string }) => {
  let date = new Date();
  const [convertedDate, setConvertedDate] = useState<string>(date.toLocaleDateString());
  const [convertedTime, setConvertedTime] = useState<string>(date.toLocaleTimeString().split(" ")[0].split(":").slice(0,2).join(":").concat(` ${date.toLocaleTimeString().split(" ")[1]}`));
  
  const updateTime = useRef(setInterval(() => {
      date = new Date();
      setConvertedDate(date.toLocaleDateString())
      setConvertedTime(date.toLocaleTimeString().split(" ")[0].split(":").slice(0,2).join(":").concat(` ${date.toLocaleTimeString().split(" ")[1]}`))
    }, 1000));

  useEffect(() => {
    () => {
      clearInterval(updateTime.current);
    }
  }, [])

  return (
    <span className={className}>
      <p>{convertedDate}</p>
      <p>{convertedTime}</p>
    </span>
  )
}

export default DateTime;