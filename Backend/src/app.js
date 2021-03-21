const express=require('express');
const cors=require('cors');
const path=require('path');
const bodyParser=require('body-parser');
const http=require('http');
const cron=require('node-cron');

require('./db/mongoose');

const app=express();
const server=http.createServer(app);
const Rfp=require('./models/rfp');
const Bid=require('./models/Bid');

const port=process.env.PORT || 5000;

const manufacturerRouter=require('./routers/manufacturer');
const vendorRouter=require('./routers/vendor');
const helper=require('./helpers/helper');

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.json());
app.use(cors());
app.use(manufacturerRouter);
app.use(vendorRouter);


app.get('/',(req,res)=>{
      res.send("Hello,This is Team Lazy Sprinters");
})

server.listen(port,()=>{
      console.log('Server is running on port:',port);
}) 

const task=cron.schedule('0 1 * * *',async ()=>{
      const allRfps=await Rfp.find({});
      let toremove=[];
      for(let i=0;i<allRfps.length;i++){
            if (helper.comparedatecurr(allRfps[i].DeadlineDate)==1){
                  toremove.push(allRfps[i]._id);
            }
      }
      for(let i=0;i<toremove.length;i++){
            await Bid.deleteMany({rfp_id:toremove[i]});
      }
},{
      scheduled:false,
      timezone:'Asia/Kolkata'
});
task.start();