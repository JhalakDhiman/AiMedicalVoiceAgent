'use client'
import Button from '@/components/common/button';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import AddNewSessionDialog from '../_components/AddNewSessionDialog';
import { AuthContext } from '@/context/AuthContext';
import HistoryTable from '../_components/HistoryTable';

const HistoryList = () => {

    const [historyList, setHistoryList] = useState([]);
    const [sessionModal, setSessionModal] = useState(false);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            getHistoryList();
        }
    }, [token]);

    const getHistoryList = async () => {
        const sessionId = 'all';
        console.log(token);
        const res = await fetch(`/api/fetchSessionDetails/${sessionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await res.json();
        console.log("session data is : ", data)
        setHistoryList(data.sessionChats);
    }

    return (

        <div className='mt-10'>
            {

                historyList?.length === 0 ? (
                    <div className='flex flex-col p-7 border-[1px] border-dashed rounded-2xl justify-center items-center'>
                        <Image src='/images/medAss.jpg' alt='medical-assistance' width={150} height={150} />
                        <h2 className='font-bold text-xl mt-2'>No Recent Consultations</h2>
                        <p className='mb-3'>It looks like you haven't consulted with any doctor yet.</p>
                        <Button text='+ Start New Consultation' clickHandler={() => {
                            setSessionModal(true)
                        }} />
                    </div>
                ) : (
                    <div>
                        <HistoryTable historyList={historyList} />
                    </div>
                )
            }
            {
                sessionModal && <AddNewSessionDialog setSessionModal={setSessionModal} />
            }
        </div>
    )
}

export default HistoryList
