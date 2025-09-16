import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AppHeader = () => {

    const options = [
        {
            id:1,
            name:"Home",
            path:"/"
        },
        {
            id:2,
            name:"History",
            path:"/dashboard/history"
        },
        {
            id:3,
            name:"Subscription",
            path:"/dashboard/subscription"
        },
        {
            id:4,
            name:"Profile",
            path:"/profile"
        }
    ]

  return (
    <div className='flex justify-between items-center p-4 px-10 md:px-20 lg:px-32 shadow'>
    <div className='flex gap-2 items-center'>
        <Image src='/images/logoImage.svg' alt='logo' width={30} height={30} />
        <h1 className='font-bold'>MediVoice AI</h1>
    </div>
      <div className='flex gap-12'>
        {
            options.map((option,index)=>(
                <Link href={option.path} key={index} className='hover:text-blue-600 font-semibold transition-all hidden md:flex cursor-pointer'>
                    {option.name}
                </Link>
            ))
        }
      </div>
    </div>
  )
}

export default AppHeader
