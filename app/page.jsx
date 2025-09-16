'use client'
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import ProfileDropdown from "@/components/ProfileDropdown";
import Link from "next/link";
import { Description } from "@radix-ui/react-dialog";
import { FaStethoscope, FaFileMedical, FaRegClock, FaArrowRight } from "react-icons/fa";
import { FaCalendarAlt, FaCalendarCheck, FaUserMd, FaComments, FaEnvelope, FaPhoneAlt, FaMoneyBill, FaFilePrescription } from "react-icons/fa";


export default function Home() {

  const router = useRouter();
  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-up");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.2 } // trigger when 20% of section is visible
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  const loginHandler = () => {
    router.push('/auth/login');
  }

  const features = [
    { icon: <FaCalendarAlt className="text-blue-600 text-2xl" />, text: "Book Appointments" },
    { icon: <FaCalendarCheck className="text-blue-600 text-2xl" />, text: "Verify, Cancel & Reschedule Appointments" },
    { icon: <FaUserMd className="text-blue-600 text-2xl" />, text: "Connect With Multiple Departments" },
    { icon: <FaComments className="text-blue-600 text-2xl" />, text: "Get Queries Resolved (Powered By ChatGPT)" },
    { icon: <FaEnvelope className="text-blue-600 text-2xl" />, text: "Drop A Message For The Doctor" },
    { icon: <FaPhoneAlt className="text-blue-600 text-2xl" />, text: "Connect With On Call Doctor" },
    { icon: <FaMoneyBill className="text-blue-600 text-2xl" />, text: "Pay Bills" },
    { icon: <FaFilePrescription className="text-blue-600 text-2xl" />, text: "Request For Prescription Refill" },
  ];



  const data = [
    {
      heading: "Symptom-Based Doctor Matching",
      description: "Patients can enter their symptoms, and the AI instantly suggests the most relevant AI doctors for consultation.",
      icon: <FaStethoscope className="text-3xl text-blue-600" />,
    },
    {
      heading: "Real-Time Voice Consultations",
      description: "Seamless voice conversations with AI doctors that provide personalized medicines, health tips, and recommendations.",
      icon: <FaPhoneAlt className="text-3xl text-green-600" />,
    },
    {
      heading: "Automated Medical Reports",
      description: "After each consultation, the system generates a structured medical report summarizing symptoms, prescriptions, and advice.",
      icon: <FaFileMedical className="text-3xl text-purple-600" />,
    },
    {
      heading: "24/7 Accessible Healthcare",
      description: "Always available to assist, ensuring patients can receive timely medical guidance anytime, anywhere.",
      icon: <FaRegClock className="text-3xl text-red-600" />,
    },
  ];


  return (
    <>
      <div className="m-8 border border-gray-300 rounded-xl shadow-[10px_10px_50px_-5px] shadow-[#013147]">
        <div className="flex justify-between items-center p-2 mb-8 border-b-[1px] border-gray-300">
          <div className="flex items-center gap-3">
            <Image
              className="w-12 h-12 rounded-full"
              src='/images/logoImage.svg'
              width='48'
              alt='logo'
              height='48'
            />
            <p className="text-lg font-bold text-[#013147]">MediVoice AI</p>
          </div>

          <div>
            {
              user ? (
                <ProfileDropdown user={user} />
              ) : (
                <>
                  <Button onClick={loginHandler}>Login</Button>
                  <Link href="/auth/signup">
                    <Button className="ml-2">Register</Button>
                  </Link>
                </>
              )
            }
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center text-center space-y-4 my-24 reveal-up">
          <h1 className="text-4xl font-bold leading-snug text-[#013147]">
            Transform HealthCare with AI Medical Voice Agents
          </h1>
          <p className="text-gray-500 max-w-xl">
            Provide 24/7 intelligent medical support using conversational AI.
            Triage symptoms, book appointments, and deliver empathetic care with
            voice-first automation.
          </p>
          <Link href="/dashboard">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center px-6 pb-24 mt-24 reveal-up">
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-10">
          Human-Like Voice AI Assistant For Patient Calls!
        </h2>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
          {data.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl hover:shadow-lg transition-shadow duration-300 bg-white p-6 flex flex-col shadow-[5px_5px_30px_-5px] shadow-[#013147]"
            >
              <div className="flex gap-3 items-center">
                <div>{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {item.heading}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-b from-white to-[#f4f9f8] py-24 px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center max-w-2xl mb-12">
          Leverage Healthcare Conversational AI <br /> To Reduce Receptionist Workload
        </h2>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl w-full cursor-pointer">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white px-5 py-6"
            >
              <div className="p-3 bg-blue-100 rounded-lg">{item.icon}</div>
              <p className="text-gray-700 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#f4f9f8] py-2 px-6 flex items-center x-auto w-10/12 mx-auto">
          <div className="w-[50%]">
            <h1 className="text-3xl font-bold text-[#013147]">Transform Healthcare with<br/> AI-Powered Voice Consultations – Start Today!</h1>
            <Button className="mt-6" onClick={() => router.push('/dashboard')}>Consult Now <FaArrowRight/></Button>
          </div>
          <div className="w-[50%]">
            <Image
              className="w-132 h-120"
              src='/images/home1.png'
              width={528}
              alt='doctor'
              height={480}
            />
          </div>
      </div>

    </>
  );
}
