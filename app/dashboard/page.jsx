'use client'

import React, { useContext, useState } from 'react'
import HistoryList from './_components/HistoryList'
import DoctorAgentList from './_components/DoctorAgentList'
import AddNewSessionDialog from './_components/AddNewSessionDialog'
import { SubscribeContext } from '@/context/SubscribeContext'

const Dashboard = () => {

  const {isSubscribed} = useContext(SubscribeContext);

  return (
    <div>
      <div className='flex justify-between items-center mt-8'>
        <h1 className='text-2xl font-semibold'>My Dashboard</h1>
        
        <AddNewSessionDialog/>
      </div>
      <HistoryList />
      <DoctorAgentList />
    </div>
  )
}

export default Dashboard
