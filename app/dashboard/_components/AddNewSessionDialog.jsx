'use client'
import React, { useContext, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import toast from 'react-hot-toast';
import SuggestedDoctorCard from './SuggestedDoctorCard';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog';
import { SubscribeContext } from '@/context/SubscribeContext';

const AddNewSessionDialog = () => {

    const [note, setNote] = useState();
    const [suggestedDoctors, setSuggestedDoctors] = useState();
    const [loading,setLoading] = useState(false);
    const [selectedDoctor,setSelectedDoctor] = useState();
    const {user} = useContext(AuthContext);
    const {isSubscribed} = useContext(SubscribeContext)
    const router = useRouter()

    const nextHandler = async () => {
        const toastId = toast.loading('Loading...');
        if(!isSubscribed){
            toast.error('Please subscribe to start a consultation')
            toast.dismiss(toastId)
            return;
        }
        console.log(note);
        try {
            setLoading(true);
            const res = await fetch('/api/suggestDoctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    notes: note
                })
            })

            const data = await res.json();
            console.log(data.res);
            setSuggestedDoctors(data.res);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
        finally {
            toast.dismiss(toastId)
        }
    }

    const startConsultationHandler= async()=>{
        setLoading(true)
        const response = await fetch('/api/sessionChats',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                notes:note,
                selectedDoctor:selectedDoctor,
                email:user?.email
            })
        })
        
        const data = await response.json();
        console.log(data);
        setLoading(false);

        router.push(`/dashboard/medical-agent/${data.result.sessionId}`)
    }


    

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='cursor-pointer'><Button>+ Start a Consultation</Button></div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        {
                            suggestedDoctors?.length>0 ? <div className='grid grid-cols-3 gap-3'>
                                {
                                    suggestedDoctors.map((doctor,index)=>(
                                        <SuggestedDoctorCard doctorAgent={doctor} setSelectedDoctorFunc={()=>{setSelectedDoctor(doctor)}} 
                                        //@ts-ignore
                                        selectedDoctor={selectedDoctor} key={index}/>
                                    ))
                                }
                            </div> :
                                <div className='flex flex-col gap-4'>
                                    <h2>Add Symptoms and any other details</h2>
                                    <Textarea
                                        placeholder='Add detail here......'
                                        className='h-[200px]'
                                        onChange={(e) => { setNote(e.target.value) }}></Textarea>
                                </div>
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter asChild>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Close</Button>
                    </DialogClose>
                    {
                        suggestedDoctors?.length>0 ? 
                         (
                            <Button disabled={!note || loading ||!selectedDoctor} onClick={startConsultationHandler}>
                                {loading && <Loader2 className='animate-spin' />}
                                Start Consultation
                                <FaArrowRight/>
                            </Button>
                        ):(<Button disabled={!note || loading} onClick={nextHandler}>
                                {loading && <Loader2 className='animate-spin' />}
                                Next
                                <FaArrowRight />
                            </Button>)
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog
