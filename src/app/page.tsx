"use client"
import Homebanner from "@/assets/images/Desktop_sell.webp"
import Image from "next/image"
import Image1 from "@/assets/images/crore_users_revamp.svg"
import Image2 from "@/assets/images/wallet-icon.svg"
import Image3 from "@/assets/images/low-cost-icon.svg"
import Image4 from "@/assets/images/shopping-bag-icon.svg"
import Image5 from "@/assets/images/seller-support-icon.svg"
import Helpimage from "@/assets/images/untitled_15_04_1.webp"
import Login from "./components/Login"
import { useContext } from "react"
import { Appcontext } from "./context/Appcontext"
const page = () => {

  const {showLogin}=useContext(Appcontext);
  const data=[
    {
      logo:Image1,
      text:"45 crore+ Flipkart customers"
    },
    {
      logo:Image2,
      text:"7* days secure & regular payments"
    },
    {
      logo:Image3,
      text:"Low cost of doing business"
    },
    {
      logo:Image4,
      text:"One click Seller Support"
    },
    {
      logo:Image5,
      text:"Access to The Big Billion Days & more"
    },
  ]
  return (
    <div className="  p-4">
          <div className=" relative">
          <Image  src={Homebanner} alt="Homebanner"/>
      <div className=" absolute top-[50%] ">

        <p className=" text-4xl  font-semibold">Become a Flipkart Seller<br></br>
and sell to 45+Crore customers</p>
      </div>
          </div>
      <div className=" hidden bg-slate-100 p-4 lg:flex  items-center justify-between">
         {
          data.map((e,i)=>(
            <div key={i} className=" flex items-center gap-5">
            <div  className=" flex flex-col items-center gap-2">
              <Image  src={e.logo} alt="bannerlogo"/>
              <p className=" w-[200px] text-center">{e.text}</p>
            </div>
             {
              i!==4 && (
                <div className=" border-2 h-[40px] "></div>
              )
            }
            </div>
          ))
         }
      </div>
      <div className=" bg-slate-200 p-3 mt-6 flex flex-col gap-4">
         <h1 className=" text-3xl font-semibold">Help & Support</h1>
         <div className=" flex justify-between items-center">
           <p className=" opacity-70 w-[40%]">
           What sets us apart is our exceptional Flipkart seller support assistance. We prioritise your needs and are committed to providing you with prompt assistance, whether you have questions, doubts, or require any kind of support for your business. Our dedicated team is here to help you every step of the way, ensuring that you have a smooth and successful selling experience on Flipkart. Feel free to reach out to us whenever you need assistance - we're always here to support you.
           </p>
           <Image src={Helpimage} alt="Helpimage"/>
         </div>
      </div>
      {
        showLogin && (
          <div className=" w-[100vw] h-[100vh] absolute top-0 flex flex-col items-center justify-center bg-opacity-50 bg-slate-100">
          <Login/>
        </div>
        )
      }
    </div>
  )
}

export default page;