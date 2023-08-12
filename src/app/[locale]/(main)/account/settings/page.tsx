'use client'
import Loader from "@/components/ui/Dailog/loader"
import { SettingDataApi } from "@/redux/services/Account"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const SettingsPage = dynamic(() => import("@/components/screens/setting"))

const Settings = () => {
  const [result, setResult] = useState()
  const [loading, setloading] = useState(true)
  const fetchData = async () => {
    try {
      const res = await SettingDataApi()
      setResult(res.data)
      setloading(false)
    } catch (error) {
      setloading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {loading && <Loader />}
      <SettingsPage data={result} />
    </>
  )

}

export default Settings
