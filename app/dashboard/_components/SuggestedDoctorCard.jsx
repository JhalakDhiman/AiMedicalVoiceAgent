import React from 'react'
import Image from 'next/image'

const SuggestedDoctorCard = ({doctorAgent,setSelectedDoctorFunc,selectedDoctor}) => {
  return (
    <div className={`flex flex-col items-center border rounded-2xl p-2 py-6 hover:border-blue-500
    ${selectedDoctor?.id===doctorAgent?.id&&'border-blue-500'}
    `}
    onClick={()=>{setSelectedDoctorFunc(doctorAgent)}}>
      <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={30} height={30}
       className='w-[50px] h-[50px] object-cover rounded-full' />
        <h1 className='font-bold text-gray-600 text-sm text-center'>{doctorAgent.specialist}</h1>
        <p className='text-xs text-center line-clamp-3'>{doctorAgent.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard
