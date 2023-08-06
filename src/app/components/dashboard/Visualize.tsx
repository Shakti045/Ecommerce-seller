'use client'
import {Chart, registerables} from "chart.js"
import { useState } from "react";
import {Bar} from "react-chartjs-2"
Chart.register(...registerables);
function Visualize({products,ordrers}:{products:any[],ordrers:any[]}) {
    const [data,setdata]=useState<any>("products");
    function getrandomcolor(k:any){
     let colors=[];
     for(let i=0;i<k;i++){
        const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        colors.push(color);
     }
     return colors;
    }

    const chartData = {
        labels: products.map((product)=> product.productname.substring(0,10)),
        datasets: [
            {
                data: products.map((product)=> product.
                numberofpurchases),
                backgroundColor: getrandomcolor(products.length),
            }
        ]
    }
     function getproductname(productid:any){
            return products.find((product)=> product._id===productid)?.productname;
     }
    const orderchartData = {
        labels: ordrers.map((order)=>getproductname(order.productid).substring(0,10)),
        datasets: [
            {
                data: ordrers.map((order)=> order.quantity),
                backgroundColor: getrandomcolor(ordrers.length),
            }
        ]
    }

  return (
    <div  className=" w-full h-full flex-col gap-2 ">
       <div className=" w-full flex justify-end">
         
                <div className=" flex gap-2 bg-slate-800 text-white rounded-md">
                <button onClick={()=>setdata("products")} className={`rounded-md p-4  ${data==="products"?"bg-slate-700":""}`}>Product</button>
                <button onClick={()=>setdata("orders")} className={`rounded-md p-4  ${data==="orders"?"bg-slate-700":""}`}>Orders</button>
                </div>
       </div>
      <Bar data={data==="products"?chartData:orderchartData}/>

    </div>
  )
}

export default Visualize;