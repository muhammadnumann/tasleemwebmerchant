'use client'

import dynamic from "next/dynamic"
const TimeSetupscreen = dynamic(() => import("@/components/screens/TimeSetups/TimeSetupScreen"))


const TimeSetupPage = () => {

  return (<>
    <TimeSetupscreen />
  </>)
}

export default TimeSetupPage
