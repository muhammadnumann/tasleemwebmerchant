import MainCardList from "./DashboardCard"
import DashboardCard from "./DashboardCard"
import CustomerFlow from "./Charts/CustomerFlow"
import DailyRevenue from "./Charts/DailyRevenue"
import UserCard from "./Card"

const Dashboard = () => {
  return (
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
      <div className="flex overflow-x-auto gap-4 mt-[42px] pb-6">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((val, index) => {
          return (
            <div key={index}>
              <UserCard />
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default Dashboard
