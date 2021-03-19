const express=require('express');
const router=new express.Router();
const RegistrationUtil=require('../helpers/Registration-helper');
const Vonage = require('@vonage/server-sdk');
const nodemailer=require('nodemailer');
const Vendor=require('../models/vendor');
const Rpf=require('../models/rfp');
const Agreement=require('../models/agreement');
const axios = require('axios').default;
const path=require('path');

require('dotenv').config({path:path.resolve(__dirname, '../../.env') });

//Setting up functionality for message-based authentication
const vonage = new Vonage({
      apiKey: process.env.VKEY,
      apiSecret: process.env.SECRET
});

//Setting up functionality for email-based authentication
const transporter=nodemailer.createTransport({
      service: process.env.SECRET,
      auth:{
            user:process.env.TEST_MAIL,
            pass:process.env.TEST_PASS
      }
});

//Route-1:Temporary creation of a vendor in the database(T completed)
router.post('/vendor/signup1',async (req,res)=>{
      // console.log(req.body);
      const vendor=new Vendor(req.body);
      try{
            await vendor.save();
            vendor.Status=false;
            const response=await axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+vendor.Address+'&apiKey='+process.env.API_KEY);
            const coordinates=Object.values(response.data.items[0].position);
            if (coordinates.length!=0)
            {            
                  await vendor.save();
                  res.status(201).send(vendor);
            }
            else
            {
                  await Vendor.findOneAndDelete({Email:req.body.Email});
                  res.status(400).send("Invalid Address");      
            }
      }catch(err){
            console.log(err);
            res.status(400).send();
      }
});

//Route-2:Permanent creation of a vendor in the database if OTP verification succeeds.(T completed)
router.post('/vendor/signup2',async (req,res)=>{
      // console.log(req.body);
      try{
            const vendor=await Vendor.findOne({Email:req.body.Email}) 
            if (vendor==undefined){
                  res.status(404).send();
            }
            else{
                  if (RegistrationUtil.Verificationutil(vendor,req)==true){
                        vendor.Status=true;
                        await vendor.RecentEmailOtps.pop();
                        await vendor.RecentMobileOtps.pop();
                        await vendor.save();
                        res.status(200).send(vendor);
                  }
                  else{
                        res.status(404).send(vendor);
                  }
            }
      }catch{
            res.status(400).send('Some error occured');
      }
});

//Route-3:Login setup for a vendor(T completed)
router.post('/vendor/login',async (req,res)=>{
      try{
            const vendor=await Vendor.findbycredentials(req.body.Email,req.body.password);
            if (vendor.Status==true){
                  res.status(200).send(vendor);
            }
            else{
                  res.status(403).send("You are not verified");
            }
      }catch(err){
            console.log(err);
            res.status(404).send("User not registered");
      }
});

//Route-4:Sending OTP
router.post('/vendor/newotps',async (req,res)=>{
      try{
            // console.log(req.body);
            const vendorEmail=req.body.Email;
            const vendor=await Vendor.findOne({Email:vendorEmail});
            if (vendor!==undefined && vendor.Status==false){
                  const otp1=RegistrationUtil.GetOtp();
                  const otp2=RegistrationUtil.GetOtp();
                  // const emailbody=RegistrationUtil.EmailBody(vendor.Email,otp1);
                  // const messagebody=RegistrationUtil.MessageBody(otp2);
                  // let emailinfo=await transporter.sendMail(emailbody);
                  // let messageinfo=await vonage.message.sendSms('Team',"91"+vendor.PhoneNumber,messagebody);
                  await vendor.RecentEmailOtps.push(otp1);
                  await vendor.RecentMobileOtps.push(otp2);
                  await vendor.save();
                  res.status(200).send();
            }
            else if (vendor===undefined){
                  res.status(404).send("You are not registered!");
            }
            else{
                  res.status(400).send("User is already verified");
            }
      }catch{
            res.status(404).send();
      }
});

//Route-5:Creating a new rfp
router.post('/rfp/new',async (req,res)=>{
      try{
            console.log(req.body);
            const rpf=new Rpf(req.body);
            await rpf.save();
            res.send(201).send(rpf);
      }catch{
            console.log(err);
            res.send(400).send();
      }
})

//Route-6:Sending the apt agreements
router.post('/agreements/upd',async (req,res)=>{
      try{
            const allaggreements=await Agreement.find({Manufacturer_id:req.body.id});
            let ret=[];
            for(let i=0;i<allaggreements.length;i++)
            {
                  const date1=new Date();
                  const newdate=new Date(allaggreements[i].EndDate);
                  const tdiff=newdate.getTime()-date1.getTime();
                  const ddiff=tdiff/(1000*3600*24);
                  if (ddiff>=0 && ddiff<=15)
                  {     
                        ret.push({
                              Product:allaggreements[i].Product_Name,
                              Firm:allaggreements[i].Manufacturer,
                              ContractEndDate:allaggreements[i].EndDate
                        });
                  }
            }    
            res.status(200).send(ret);
      }catch(err){
            console.log(err);
            res.status(400).send();
      }
})

//Route-7:Sending all the current contracts
router.post('/manufacturer/allcontracts',async (req,res)=>{
      try{
            const allaggreements=await Agreement.find({Manufacturer_id:req.body.id});
            let ret=[];
            for(let i=0;i<allaggreements.length;i++)
            {
                  const date1=new Date();
                  const newdate=new Date(allaggreements[i].EndDate);
                  const tdiff=newdate.getTime()-date1.getTime();
                  const ddiff=tdiff/(1000*3600*24);
                  if (ddiff>=0)
                  {     
                        ret.push(allaggreements[i]);
                  }
            }
            res.status(200).send(ret);
      }catch(err){
            console.log(err);
            res.status(400).send();
      }
})

// //Route-13:Logging a user out
// router.post('/user/logout',Authmiddleware,async (req,res)=>{
//       try{
//             // console.log(req.user);
//             req.user.tokens=[];
//             req.user.RecentEmailOtps=[];
//             req.user.RecentMobileOtps=[];
//             await req.user.save();
//             res.status(200).send();
//       }catch(err){
//             console.log(err);
//             res.status(400).send(err);
//       }
// })

module.exports =router;