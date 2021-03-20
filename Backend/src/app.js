const express=require('express');
const cors=require('cors');
const path=require('path');
const bodyParser=require('body-parser');
const http=require('http');

require('./db/mongoose');

const app=express();
const server=http.createServer(app);

const port=process.env.PORT || 5000;

const manufacturerRouter=require('./routers/manufacturer');
const vendorRouter=require('./routers/vendor');

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
