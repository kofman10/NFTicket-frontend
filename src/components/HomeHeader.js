import React from 'react'

const HomeHeader = () => {


  return (
    <div class="max-w-5xl flex flex-wrap p-5 flex-col md:flex-row gap-[290px] mx-auto justify-between">
        <div className="flex flex-row items-center p-3 mr-22 md:p-1">
          <a
            href="/"
            class="flex text-3xl md:-ml-20 text-[#E58719] font-medium mb-4 md:mb-0"
          >NFTICKETX
          </a>
        
        </div>
        <div
          className=
            "md:flex flex-grow items-center" 
          
        >
          <div class="md:ml-auto font-4 pt-1 pl-1 flex flex-wrap items-center md:text-base text-1xl  justify-items-start gap-9">
            <a class=" cursor-pointer text-gray-300 hover:text-[#E58719] font-semibold" href = '/events'>
              Find events
            </a>
            <a class=" cursor-pointer text-gray-300 hover:text-[#E58719] font-semibold " href = '/CreateEvent'>
              Create events
            </a>
            <a class="cursor-pointer text-gray-300 hover:text-[#E58719] font-semibold tr04">
              Contact
            </a>
            <a class="cursor-pointer text-gray-300 hover:text-[#E58719] font-semibold tr04">
              Login
            </a>
            <a class="cursor-pointer text-gray-300 hover:text-[#E58719] font-semibold tr04">
              Signup
            </a>
            </div>
          </div>
        
        </div>
  )
}

export default HomeHeader