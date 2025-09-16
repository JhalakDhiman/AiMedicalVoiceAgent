import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import doctor from '@/models/doctor'
import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const DoctorAgentCard = ({doctorAgent}) => {

  return (
    <div className='flex flex-col gap-1 relative'>
      {
        doctorAgent.subscriptionRequired && 
        <Badge className='absolute m-2 right-0'>
          Premium
        </Badge>
      }
      <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={230} height={230}
      className='w-full h-[230px] object-cover rounded-xl'/>
      <h2 className='font-bold'>{doctorAgent.specialist}</h2>
      <p className='line-clamp-3 text-sm text-gray-500 mb-2'>{doctorAgent.description}</p>
      <Button>Consult <FaArrowRight/></Button>
    </div>
  )
}

export default DoctorAgentCard
