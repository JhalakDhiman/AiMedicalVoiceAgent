'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Circle, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Vapi from '@vapi-ai/web';
import { FaPhoneSlash } from "react-icons/fa6";

const MedicalAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState();
  const [vapiInstance, setVapiInstance] = useState();
  const [callStarted, setCallStarted] = useState(false);
  const [currentRole, setCurrentRole] = useState();
  const [liveTranscript, setLiveTranscript] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const startCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

    const vapiAgentConfig = {
      name: "Ai Medical Doctor Voice Agent",
      firstMessage: "Hello,Thank you for connecting.I am here to help you What problem do you have?",
      transcriber: {
        provider: 'assembly-ai',
        language: 'en'
      },
      voice: {
        provider: 'vapi',
        voiceId: sessionDetail?.selectedDoctor?.voiceId
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: sessionDetail?.selectedDoctor?.agentPrompt
          }
        ]
      }
    }

    setVapiInstance(vapi);
    vapi.start(vapiAgentConfig);

    vapi.on('call-start', () => {
      setCallStarted(true)
      console.log('Call started')
    });
    vapi.on('call-end', () => {
      setCallStarted(false)
      console.log('Call ended')
    });
    vapi.on('message', (message) => {

      if (message.type === 'transcript') {
        const { role, transcript, transcriptType } = message;
        console.log(`${message.role}: ${message.transcript}`);

        if (transcriptType === 'partial') {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        }
        else if (transcriptType === 'final') {
          setMessages((prev) => [...prev, { role: role, text: transcript }])
          setLiveTranscript("");
          setCurrentRole(null)
        }
      }
    });

    vapi.on('speech-start', () => {
      console.log('assistant started speaking')
      setCurrentRole('assistant')
    })

    vapi.on('speech-end', () => {
      console.log('assistant stopped speaking')
      setCurrentRole('user')
    })
  }

  const endCall = async () => {

    setLoading(true);
    console.log("hello here 1");

    if (!vapiInstance) {
      return;
    }

    console.log(vapiInstance);
    vapiInstance.stop();

    console.log("hello here 2");

    vapiInstance.removeAllListeners('call-start');
    vapiInstance.removeAllListeners('call-end');
    vapiInstance.removeAllListeners('message');

    console.log("hello here 3");


    setCallStarted(false);
    setVapiInstance(null);
    console.log("going to fetch medical report");
    console.log("messages in the conversation : ",messages)
    const result = await generateReport();

    setLoading(false);
  }

  const generateReport = async () => {
    setLoading(true);

    const res = await fetch('/api/medicalReport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages,
        sessionId: sessionId,
        sessionDetail: sessionDetail
      })
    })

    const data = await res.json();
    console.log(data);

    setLoading(false);
  }

  useEffect(() => {
    sessionId && getSessionDetails();
  }, [sessionId])

  const getSessionDetails = async () => {
    const toastId = toast.loading('Fetching Session Details....')
    try {
      const response = await fetch(`/api/fetchSessionDetails/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json();
      console.log(data?.sessionChat?.selectedDoctor);

      setSessionDetail(data?.sessionChat);
    } catch (error) {
      console.log(error);
    }
    finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <div className='p-5 border rounded-3xl mt-10 bg-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className={`p-1 px-2 border rounded-md flex gap-2 cursor-pointer`}>
          <Circle className={` rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />
          {
            callStarted ? 'Connected' : 'Not Connected'
          }
        </h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      </div>

      {sessionDetail && <div className='flex flex-col items-center mt-10'>

        <Image src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.specialist}
          width={120} height={120} className='h-[100px] w-[100px] object-cover rounded-full' />

        <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
        <p className='text-sm text-gray-400'>Ai Medical Voice Agent</p>

        <div className='mt-32 overflow-y-auto flex flex-col items-center px-10  md:px-28 lg:px-52 xl:px-72'>
          {
            messages?.slice(-4).map((msg, index) => (
              <h2 className='text-gray-400 p-2' key={index}>{msg.role} : {msg.text}</h2>
            ))
          }
          {
            liveTranscript?.length > 0 && <h2 className='text-lg'>{currentRole} {liveTranscript}</h2>
          }
        </div>

        {
          !callStarted ? (
            <button onClick={startCall} className='mt-20 cursor-pointer rounded-lg bg-black text-white p-2 flex items-center gap-2'>
              <PhoneCall /> Start Call
            </button>) : (
            <button onClick={endCall} className='mt-20 cursor-pointer rounded-lg bg-black text-white p-2 items-center flex gap-2'>
              <FaPhoneSlash /> Disconnect Call
            </button>
          )
        }
      </div>}
    </div>
  )
}

export default MedicalAgent
