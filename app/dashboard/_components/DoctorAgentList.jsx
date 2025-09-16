    import { doctorAgents } from '@/shared/list'
import React from 'react'
import DoctorAgentCard from './DoctorAgentCard'

const DoctorAgentList = () => {
  return (
    <div>
      <h1 className='font-semibold text-2xl mt-10'>Ai Specialist Doctor Agents</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-5'>
        {
            doctorAgents.map((doctor)=>(
                <DoctorAgentCard key={doctor.id} doctorAgent={doctor}/>
            ))
        }
      </div>
    </div>
  )
}

export default DoctorAgentList
