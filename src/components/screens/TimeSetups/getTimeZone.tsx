import { getLocalStorage } from "@/redux/store/Auth/AuthActions"
import { allTimezones, useTimezoneSelect } from 'react-timezone-select'


import React from 'react'

function GetTimeZone() {
  const data = getLocalStorage("userData").userRetailer
  let offset = data.store_timezone

  offset = offset / 3600

  const { options } = useTimezoneSelect({
    labelStyle: 'original',
    timezones: allTimezones
  })
  const result = options.filter((val) => val.offset == offset)

  return (result[0])
}

export default GetTimeZone