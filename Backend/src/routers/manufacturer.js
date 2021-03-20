const express=require('express');
const router=new express.Router();
const Vonage = require('@vonage/server-sdk');
const Manufacturer=require('../models/manufacturer');
const Rpf=require('../models/rfp');
const Agreement=require('../models/agreement');
const Vendor=require('../models/vendor');
const Bid=require('../models/Bid');
const RegistrationUtil=require('../helpers/Registration-helper');
const Helper=require('../helpers/helper');
const nodemailer=require('nodemailer');
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

/*
Live_Agreements
Upcoming_Agreements
Completed_Agreements
*/ 
// Route-7: Sending all kind of appointments
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

//Route-8:All active rfps
router.post('/manufacturer/openrfps',async (req,res)=>{
      console.log(req.body.id)
      try{
            const allrfps=await Rpf.find({Manufacturer_id:req.body.id});
            console.log(allrfps)
            let ret=[];
            for(let i=0;i<allrfps.length;i++){
                  let showbuttons=true;
                  showbuttons&=(Helper.comparedatecurr(allrfps[i].DeadlineDate)==0 ||Helper.comparedatecurr(allrfps[i].DeadlineDate)==0);
                  ret.push(Helper.retobj2(allrfps[i],showbuttons));
            }
            ret.push({
                  Rfp_id:"132435467",
                  Product:"Alpha",
                  Unit:"Kg",
                  Price_Per_Unit:"765",
                  StartDate:"2021-05-01",
                  EndDate:"2021-12-01",
                  Total_Quantity:"100000",
                  Mode_Of_Delivery:"Expected from Vendor",
                  flag:true
            })
            res.status(200).send(ret);
      }catch(err){
            console.log(err);
            res.status(400).send();
      }
})

//Route-9:Deleting an rfp and subsequently all its active bids and open bids
router.post('/manufacturer/deleterfp',async (req,res)=>{
      try{
            await Rpf.deleteOne({_id:req.body.Rfp_id});
            await Bid.deleteMany({rfp_id:req.body.rfp_id});
            res.status(200).send();
      }catch(err){
            console.log(err);
            res.status(400).send();
      }
})

// Route-10:Sending all finalized bids
router.post('/manufacturer/finalizedbids',async (req,res)=>{
      try{
            const allfinalbids=await Bid.find({rfp_id:req.body.Rfp_id,Status:true});
            let ret=[];
            const rfp=await Rpf.findOne({_id:req.body.Rfp_id});
            const flag1=(Helper.comparedatecurr(rfp.DeadlineDate)==1);
            for(let i=0;i<allfinalbids.length;i++)
            { 
                  if (allfinalbids[i].All_negotiation.length==0)
                  {
                        //vendor straight away accepted the proposal
                        const v=await Vendor.findOne({_id:allfinalbids[i].vendor_id});
                        ret.push({
                              Product:rfp.Product_Name,
                              Quantity:rfp.Total_Quantity_required,
                              Price_Per_Unit:rfp.Cost_per_Unit,
                              vendor:v.CompanyName,
                              EndDate:rfp.EndDate,
                              StartDate:rfp.StartDate,
                              Mode_of_Delivery:rfp.ModeofDelivery,
                              flag:flag1
                        });
                  }
                  else
                  {
                        const v=await Vendor.findOne({_id:allfinalbids[i].vendor_id});
                        const o=allfinalbids[allfinalbids.length-1];
                        ret.push({
                              Product:rfp.Product_Name,
                              Quantity:rfp.Total_Quantity_required,
                              Price_Per_Unit:o.Quote_Cost_per_Unit,
                              vendor:v.CompanyName,
                              EndDate:rfp.EndDate,
                              StartDate:rfp.StartDate,
                              Mode_of_Delivery:o.Quote_ModeofDelivery,
                              flag:flag1
                        })
                  }
            }
            res.status(200).send(ret);
      }catch(err){
            console.log(err);
            res.status(200).send();
      }
})

//Route-11:Sending all open bids
router.post('/manufacturer/openbids',async (req,res)=>{
      try{
            const allopenbids=await Bid.find({rfp_id:req.body.Rfp_id,Status:false});
            res.status(200).send(allopenbids);
      }catch(err){
            console.log(err);
            res.status(200).send();
      }
})

//Route-9:Logging a user out
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