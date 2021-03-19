const express=require('express');
const cors=require('cors');
const path=require('path');
const bodyParser=require('body-parser');

require('./db/mongoose');

const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
      res.send("Hello,This is Team Lazy Sprinters");
})

app.listen(port,()=>{
      console.log('Server is running on port:',port);
})
