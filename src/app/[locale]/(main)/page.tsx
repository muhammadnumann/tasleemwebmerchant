'use client'
import dynamic from 'next/dynamic'
const Dashboard = dynamic(() => import("@/components/screens/Dashboard/Dashboard"))

const index = () => {
  return <>
    <Dashboard />
  </>
}

export default index
