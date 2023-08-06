"use client"
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import {AiOutlineUpload} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import { memo } from 'react';
const Images = ({images,setimages}) => {

  function handleuplaod(result){
    const newimages=[...images,result]
    setimages(newimages)
  }
  function handledelete(index){
    const newimages=images.filter((url,i)=>i!==index);
    setimages(newimages)
  }
  return (
    <div className=' w-[92%] flex gap-4 flex-wrap items-center mx-auto'>
      {
        images.map((link,index)=>{
          return(
            <div key={index} className='relative'>
              <Image  width={200} height={200} src={link} alt='productimage'   />
              <button onClick={()=>handledelete(index)} className=' p-2 bg-red-600 rounded-md absolute top-0 right-0'>
                <AiFillDelete size={15} />
              </button>
            </div>
          )
        })
      }
       
     <div>
     <CldUploadWidget onUpload={(result)=>{handleuplaod(result.info.secure_url)}} uploadPreset='rfahuwwl'>
          
          {({ open }) => {
            const onClick = () => {
              open();
            };
  
            return (
              <button 
                type="button" 
                
                variant="secondary" 
                onClick={onClick}
              >
               <div   className=' h-[200px] w-[180px] flex flex-col gap-4 items-center justify-center  border-dotted border-2 border-slate-800 '>
                <AiOutlineUpload size={30} />
                <p>Upload Image</p>
               </div>
              </button>
            );
          }}
  
        </CldUploadWidget>
     </div>
        
                
    </div>
  )
}

export default memo(Images);







