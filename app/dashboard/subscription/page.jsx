'use client'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext'
import { SubscribeContext } from '@/context/SubscribeContext'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { FaArrowRight } from 'react-icons/fa'

const Subscription = () => {

    const data = [
        {
            heading: "One Month Subscription",
            price: "$0",
            benefits: [
                "Access to all features",
                "Priority customer support",
                "Exclusive content and updates"
            ],
            duration: "1 month"
        },
        {
            heading: "Six Month Subscription",
            price: "$50",
            benefits: [
                "Access to all features",
                "Exclusive content and updates",
                "Free merchandise"
            ],
            duration: "6 months"
        },
        {
            heading: "Annual Subscription",
            price: "$90",
            benefits: [
                "Exclusive content and updates",
                "Free merchandise",
                "Early access to new features"
            ],
            duration: "12 months"
        }
    ]

    const {setIsSubscribed} = useContext(SubscribeContext)
    const {token} = useContext(AuthContext)

    const clickHandler = async() => {

        const res = await fetch('/api/subscribe',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })

        const data = await res.json();
        console.log(data);
        setIsSubscribed(true)
        
        toast.success('started subscription successfully!')
    }

    return (
        <div className='flex flex-col md:flex-row justify-center mt-10'>
            {
                data.map((plan, index) => (
                    <div key={index} className='border p-6 m-6 rounded-lg h-fit shadow-md'>
                        <h2 className='text-2xl font-semibold mb-4'>{plan.heading}</h2>
                        <p className='text-4xl font-bold mb-4 text-blue-900 text-center'>{plan.price}</p>
                        <p className='text-lg mb-4'>Duration: {plan.duration}</p>
                        <h3 className='text-lg font-semibold mb-2'>Benefits:</h3>
                        <ul className='list-disc list-inside mb-4'>
                            {plan.benefits.map((benefit, idx) => (
                                <li key={idx}>{benefit}</li>
                            ))}
                        </ul>
                        {
                            index === 0 ?
                                (
                                    <>
                                        <p className='text-sm mb-4 text-gray-500'>* Free plan with limited features</p>
                                        <Button onClick={clickHandler} className='w-full'>Start 1 Month Free trial <FaArrowRight/></Button>
                                    </>
                                )
                                : <Button onClick={clickHandler} className='w-full'>Buy Now <FaArrowRight/></Button>
                        }

                    </div>
                ))
            }
        </div>
    )
}

export default Subscription
