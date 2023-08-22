/* eslint-disable react-hooks/exhaustive-deps */
import MainCardList from "./DashboardCard"
import CustomerFlow from "./Charts/CustomerFlow"
import DailyRevenue from "./Charts/DailyRevenue"
import { useEffect, useState } from "react"
import { DashbpardApiHandler } from "@/redux/services/Dashboard"
import Loader from "@/components/ui/Dailog/loader"
import { useDispatch, useSelector } from "react-redux"
import { AddDashboardData } from "@/redux/store/Dashboard"
import Reviews from "./Reviews"

const Dashboard = () => {
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const data = useSelector((state: any) => state?.Dashboard?.Data)

  const fetchData = async () => {
    setloading(true)
    try {
      const res = await DashbpardApiHandler()
      dispatch(AddDashboardData({ data: res.data }))
      setloading(false)
    } catch (error) {
      setloading(false)
    }
  }
  useEffect(() => {
    if (!data)
      fetchData()
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className="px-12 pt-9">
        <div className="cl:w-10/12">
          <MainCardList />
          <div className="w-full bg-[#D6D6D6] pt-[1px] my-7"></div>
          <div className="flex gap-7 lg:flex-nowrap flex-wrap lg:flex-row flex-col-reverse">
            <div className="lg:w-1/3 md:w-2/3 w-full">
              <CustomerFlow />
            </div>
            <div className="lg:w-2/3 w-full">
              <DailyRevenue />
            </div>
          </div>
        </div>
        <Reviews />
      </div >
    </>
  )
}

export default Dashboard
