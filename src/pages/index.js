import Image from "next/image";
import Footer from '@/components/Footer';
import Main from '@/components/Main';
import HomeHeader from '@/components/HomeHeader';
export default function Home() {



  return (
    <>
      <div className = 'bg-[#090922]'>
       <HomeHeader />
       <Main />
      <Footer />
      </div>
    </>
  );
}
