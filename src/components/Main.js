import React from "react";
import Image from "next/image";

const Main = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="max-w-5xl pt-24 pb-24 mx-auto">
        <h1 class="text-[78px] text-center font-4 lh-6 ld-04 font-bold text-yellow-200 mb-6 uppercase">
          Create and Sell NFT Tickets for your Events
        </h1>
        <h2 class="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-white text-center">
          Unlock exclusive experiences with our NFT ticketing platform,
          <br />
          where art and events meet blockchain innovation.
        </h2>
        <div className="ml-6 text-center">
          <a
            className="inline-flex items-center py-3 font-semibold transition duration-500 ease-in-out transform bg-[#3E3121] px-7 text-md md:mt-0 text-white border-2 border-[#E58719] rounded-lg hover:bg-[#E58719] focus:shadow-outline"
            href="/CreateEvent"
          >
            <div className="flex text-lg">
              <span className="justify-center">Get Started</span>
            </div>
          </a>
        </div>
      </div>

      <div className="flex gap-10 justify-center items-center">
        <div className = 'w-[40%] text-gray-200 text-xl text-justify'>
          <p>
            Experience a revolution in event ticketing like never before. NFTix
            combines the power of Non-Fungible Tokens (NFTs) with cutting-edge
            blockchain technology to bring you a seamless and secure way to
            access events. Say goodbye to traditional ticketing systems and
            welcome a new era of digital ownership, transparency, and
            unforgettable experiences.
          </p>
          <p className = 'mt-5 mb-10'>
            No more paper tickets to lose, no more reliance on intermediaries.
            NFTICKETX empowers you to take control of your event destiny, seamlessly
            navigating a landscape where your ownership is indisputable.
          </p>
       
          <a
            className="inline-flex items-center py-1 font-semibold transition duration-500 ease-in-out transform bg-[#3E3121] px-7 text-md md:mt-0 text-white border-2 border-[#E58719] rounded-lg hover:bg-[#E58719] focus:shadow-outline"
            href="/CreateEvent"
          >
            <div className="flex text-lg text-white">
              <span className="justify-center">Get Started</span>
            </div>
          </a>
        </div>

        <div>
          <div className="container flex flex-col items-center  justify-center mx-auto">
            <Image
              className="h-[30rem] w-full object-cover object-top"
              src={"/pngwing 1.png"}
              width={500}
              height={500}
              alt=""
            />
          </div>
        </div>
      </div>

      <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-yellow-200 lg:text-7xl md:text-6xl">
      Tap into Web3 with NFT Tickets
      </h2>
      <br></br>

      <div className="container flex flex-col items-center  justify-center mx-auto">
        <Image
          className="h-[30rem] w-1/2 object-cover object-top"
          src={"/sports_bar_nft 1.png"}
          width={500}
          height={500}
          alt=""
        />
      </div>
      <p className="mx-auto text-xl mt-10 text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
      NFTICKETX is your digital passport to a future where events are more than gatherings; they are experiences owned, cherished, and remembered. Embrace the excitement of a cutting-edge ecosystem that defies convention, embraces innovation, and sets a new standard for event engagement. Step into a world where the journey is as remarkable as the destination, where digital ownership becomes a tangible reality, and where transparency and authenticity reign supreme.
      </p>

      <section class="relative pb-24">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div class="py-24 md:py-36">
            <h1 class="mb-5 text-6xl font-bold text-yellow-200">
              Subscribe to our newsletter
            </h1>
            <h1 class="mb-9 text-2xl font-semibold text-gray-200">
              Enter your email address and get our newsletters straight away.
            </h1>
            <input
              type="email"
              placeholder="jack@example.com"
              name="email"
              autocomplete="email"
              class="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-200 font-semibold hover:border-gray-700 bg-transparent"
            />{" "}
            <a
              class="inline-flex items-center py-3 font-semibold transition duration-500 ease-in-out transform bg-[#3E3121] px-7 text-md md:mt-0 text-white border-2 border-[#E58719] rounded-lg hover:bg-[#E58719] focus:shadow-outline"
              href="/"
            >
              <span class="justify-center">Subscribe</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Main;
