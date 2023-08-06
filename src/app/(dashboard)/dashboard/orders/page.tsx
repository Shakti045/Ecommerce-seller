'use client'
import { Appcontext } from "@/app/context/Appcontext"
import axios from "axios"
import { useEffect ,useState} from "react"
import { useContext } from "react"
import Myorder from "@/app/components/dashboard/Myorder"
const page = () => {
  const {token} = useContext(Appcontext);
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true);
  async function getOrders() {
    try{
      const response = await axios.get('/api/order',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(response.data.Success){
        console.log(response.data.Orders)
        setOrders(response.data.Orders)
      }
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <div className=" h-full w-full flex flex-col gap-4 p-2">
      {
        loading?<div className="  mx-auto w-[92%] h-full flex flex-col  justify-center items-center">
         <h1>Loading.....</h1>
        </div>:(

          <>

            <div className=" w-[95%]  p-5   flex justify-between items-center">
              <h1 className="text-3xl font-bold">My Orders</h1>
              <h1 className=" text-slate-500">{`Total orders (${orders.length})`}</h1>
            </div>
             {
              orders.length>0 ? (<div className=" wrapper mx-auto w-[95%] overflow-y-scroll">
              <div className="     gap-3  mx-auto   flex flex-col  justify-center items-center">
              {
                orders.map((e:any,i:number)=>{
                  return <Myorder getOrders={()=>getOrders()}  key={i}  data={e}/>
                })
              }
              </div>
              </div>):(<div className="wrapper h-full  mx-auto w-[95%]  flex flex-col justify-center items-center">
                <h1 className=" text-2xl font-bold">No Orders Yet</h1>
              </div>)
             }
            </>
        )

      }
    </div>
  )
}

export default page



// <div  className=" h-full  flex flex-col gap-4 p-2">
// <div className=" mx-auto w-[92%] flex justify-between items-center">
// <h1 className="  text-3xl font-bold">My Products</h1>
// <button onClick={()=>router.push("/dashboard/createproduct")} className=" bg-yellow-400  px-4 py-2 rounded-md" >Create Product + </button>
// </div>
// <div className="  h-full w-[92%] mx-auto ">
//  {
//    products.length===0 ? (<div className=" h-full flex flex-col items-center justify-center ">
//      <h1 className=" text-2xl font-bold">You Have Not Created Any Products Yet</h1>
//      <button className=" bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>router.push("/dashboard/createproduct")}>Create Product + </button>
//    </div>):(<div className=" product h-full overflow-y-scroll w-full flex flex-col">
//       <div className=" flex justify-between border-b-[1px] p-4 bg-slate-700 rounded-t-md text-white ">
//        <div className=" w-[300px]">
//          <h1>Product Image</h1>
//        </div>
  
//         <h1>Product Price</h1>
//         <h1>Selling Price</h1>
//        <h1>Product Quantity</h1>
//        <h1>Actions</h1>
//       </div>
//       <div className=" h-full w-full overflow-y-scroll product flex flex-col  gap-3">
//       {
//          products.map((product:any,index:any)=>(
//            <div key={product._id} className=" w-full bg-white rounded-md p-3 border-b-2   pb-3 font-semibold flex justify-between items-center" >
         
         
//            <div className=" w-[300px]">
//            <div className=" w-[200px] h-[200px] relative ">
//               <img   className=" absolute top-0 bottom-0 right-0 left-0 max-w-full max-h-full mx-auto my-auto overflow-clip"  src={product?.productimages[0]} alt="productimage"/>
//               </div>
//            </div>
          
               
                
              
//               <h1>{product.originalprice}</h1>
//                <h1>{product.sellprice}</h1>
//                <h1>{product.numberofproducts}</h1>
//                <div className=" flex gap-2">
//                  <button onClick={()=>edithandler(product,index)} className=" p-2 rounded-md bg-yellow-500"><AiFillEdit/></button>
//                  <button onClick={()=>deleteproduct(index)} className=" p-2 rounded-md bg-red-600"><AiFillDelete/></button>
//            </div>
//            </div>
//          ))
//        }
//        </div>
//    </div>)
//    }
// </div>
// </div>