import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const Button = ({text,clickHandler,icon}) => {
  return (
    <div>
        <button onClick={clickHandler} className='bg-black cursor-pointer font-semibold text-white text-sm rounded-lg p-3 px-5 hover:scale-[0.98] flex gap-2 items-center'>
            {text}
            {
              icon==='right' && <div>
                {" "}
                <FaArrowRight/>
              </div>
            }
        </button>
    </div>
  )
}

export default Button
