const express=require('express');
const router=new express.Router();
const Vonage = require('@vonage/server-sdk');
const Manufacturer=require('../models/manufacturer');
const Rpf=require('../models/rfp');
const Agreement=require('../models/agreement');
const Vendor=require('../models/vendor');
const RegistrationUtil=require('../helpers/Registration-helper');
const Helper=require('../helpers/helper');
const nodemailer=require('nodemailer');
const axios = require('axios').default;
const bcrypt=require('bcryptjs');
const path=require('path');
const { start } = require('repl');

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

//Route-1:Temporary creation of a manufacturer in the database(T completed)
router.post('/manufacturer/signup1',async (req,res)=>{
      // console.log(req.body);
      const manufacturer=new Manufacturer(req.body);
      try{
            await manufacturer.save();
            manufacturer.Status=false;
            const response=await axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+manufacturer.Address+'&apiKey='+process.env.API_KEY);
            const coordinates=Object.values(response.data.items[0].position);
            console.log(coordinates)
            if (coordinates.length!=0)
            {            
                  await manufacturer.save();
                  res.status(201).send(manufacturer);
            }
            else
            {
                  await Manufacturer.findOneAndDelete({Email:req.body.Email});
                  res.status(400).send("Invalid Address");      
            }
      }catch(err){
            console.log(err)
            res.status(400).send(err);
      }
});

//Route-2:Permanent creation of a manufacturer in the database if OTP verification succeeds.(T completed)
router.post('/manufacturer/signup2',async (req,res)=>{
      // console.log(req.body);
      try{
            const manufacturer=await Manufacturer.findOne({Email:req.body.Email}) 
            if (manufacturer==undefined){
                  res.status(404).send();
            }
            else{
                  if (RegistrationUtil.Verificationutil(manufacturer,req)==true){
                        manufacturer.Status=true;
                        await manufacturer.RecentEmailOtps.pop();
                        await manufacturer.RecentMobileOtps.pop();
                        await manufacturer.save();
                        res.status(200).send(manufacturer);
                  }
                  else{
                        res.status(404).send(manufacturer);
                  }
            }
      }catch{
            res.status(400).send('Some error occured');
      }
});

//Route-3:Login setup for a user(T completed)
router.post('/manufacturer/login',async (req,res)=>{
      try{
            const manufacturer=await Manufacturer.findbycredentials(req.body.Email,req.body.password);
            if (manufacturer.Status==true){
                  res.status(200).send(manufacturer);
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
router.post('/manufacturer/newotps',async (req,res)=>{
      try{
            // console.log(req.body);
            const ManufacturerEmail=req.body.Email;
            const manufacturer=await Manufacturer.findOne({Email:ManufacturerEmail});
            if (manufacturer!==undefined && manufacturer.Status==false){
                  const otp1=RegistrationUtil.GetOtp();
                  const otp2=RegistrationUtil.GetOtp();
                  // const emailbody=RegistrationUtil.EmailBody(user.Email,otp1);
                  // const messagebody=RegistrationUtil.MessageBody(otp2);
                  // let emailinfo=await transporter.sendMail(emailbody);
                  // let messageinfo=await vonage.message.sendSms('Team',"91"+user.PhoneNumber,messagebody);
                  await manufacturer.RecentEmailOtps.push(otp1);
                  await manufacturer.RecentMobileOtps.push(otp2);
                  await manufacturer.save();
                  res.status(200).send();
            }
            else if (manufacturer===undefined){
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
            res.status(201).send(rpf);
      }catch(err){
            console.log(err);
            res.status(400).send();
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
            const allvendors=await Vendor.find({});
            let s =new Set();
            for(let i=0;i<allvendors.length;i++){
                  for(let j=0;j<allvendors[i].Services.length;j++){
                        s.add(allvendors[i].Services[j]);
                  }
            }
            const services=Array.from(s);
            res.status(200).send({ret,services});
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
/*
Live_Agreements
Upcoming_Agreements
Completed_Agreements
*/ 
// Route-8: Sending all kind of appointments
router.post('/manufacturer/agreements',async(req,res)=>{
      try{
            const allagreements=await Agreement.find({Manufacturer_id:req.body.id});
            let Live_Agreements=[],Upcoming_Agreements=[],Completed_Agreements=[];
            for(let i=0;i<allagreements.length;i++){
                  const startdate=allagreements[i].StartDate;
                  const enddate=allagreements[i].EndDate;
                  if (Helper.comparedatecurr(startdate)==0)
                  {
                        Upcoming_Agreements.push(Helper.retobj(allagreements[i]));
                  }
                  else if (Helper.comparedatecurr(enddate)==1)
                  {
                        Completed_Agreements.push(Helper.retobj(allagreements[i]));
                  }
                  else{
                        Live_Agreements.push(Helper.retobj(allagreements[i]));
                  }
            }
            res.status(200).send({Upcoming_Agreements,Live_Agreements,Completed_Agreements});
      }catch(err){
            console.log(err);
            res.status(400).send();
      }
})

//Route-13:Logging a user out
router.post('/manufacturer/logout',async (req,res)=>{
      try{          
            req.user.RecentEmailOtps=[];
            req.user.RecentMobileOtps=[];
            await req.user.save();
            res.status(200).send();
      }catch(err){
            console.log(err);
            res.status(400).send(err);
      }
})

module.exports =router;