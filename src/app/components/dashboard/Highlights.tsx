'use client'
import { useState } from "react";
import {RxCross2} from 'react-icons/rx'
import { memo } from "react";
const Highlights = ({highlights,sethighlights}:{highlights:any,sethighlights:any}) => {

    const [data,setdata]=useState<any>("");
    function handle(e:any){
        setdata(e.target.value);
    }
    function additem(){
        if(data){
            sethighlights([...highlights,data]);
            setdata("");
        }
    }
    function deleteitem(index:number){
       const newitems=highlights.filter((e:any,i:number)=>i!==index);
         sethighlights(newitems);
    }
  return (
    <div className=" flex flex-col gap-2 w-[92%] mx-auto">
        <label htmlFor="heighligts">Highlights<sup className=" text-pink-600">*</sup></label>
        <input value={data} onChange={handle} placeholder="Enter one heighlight and press enter to add" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"/>
        <button onClick={additem} className=" flex justify-start items-start text-blue-700 font-semibold">add+</button>
        {
            highlights.map((e:any,index:number)=>(
                <div key={index} className=" flex items-center gap-2">
                    <p className=" text-blue-600">{e}</p>
                    <button onClick={()=>deleteitem(index)}><RxCross2/></button>
                </div>
            ))
        }
    </div>
  )
}

export default memo(Highlights);