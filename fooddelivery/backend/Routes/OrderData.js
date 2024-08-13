const express = require("express");
const router = express.Router();
const Order=require('../models/Orders')

router.post('/orderData',async(req,res)=>{
    console.log('checkout Enterd:',req.body);
    let data =req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    let eId=await Order.findOne({'email':req.body.email})
    console.log('eId :',eId);
    console.log('Email: ',req.body.email);
    if(eId===null){
        console.log('eid is null');
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log('Error:::::::::',error.message);
            res.send("Server Error",error.message)
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}
            ).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            res.send("Server Error",error.message)
        }
    }
})

router.post('/myOrderData',async(req,res)=>{
   try {
    console.log('hello')
      let myData= await Order.find({'email':req.body.email})
      console.log(myData)
    //   res.send({orderData:myData})
        res.send(myData)
   } catch (error) {
    res.send("Server Error",error.message)
   }
}  
)  

module.exports=router;