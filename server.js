const ex=require('express');
const mon=require('mongoose')
const app=ex();



// cors For no cors Error
const cors = require('cors');
app.use(cors())



/// Mongo Connection 
mon.connect('mongodb+srv://omkarparekh:omkarparekh@cluster0-6r5le.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true})
.then(res=>console.log("Mongodb connected"))
.catch(err=>console.log("err"))



// index
app.get('/',(req,res)=>{
    res.send("http://{baseurl}/display  for contact display")
})



// Models for the Contact
require('./model/Contact');
const Contact=mon.model('Contact')



// Fetching Contact From Mongo
app.get('/display',(req,res)=>{
     Contact.find({})
     .then(contact=>{
       res.send(contact)
     })
})



// Add the Contact
app.get('/add/:Name/:Contact',(req,res)=>{
    const user={
        Name:req.params.Name,
        Number:req.params.Contact
    }
    console.log(user)
    new Contact(user)
    .save()
    .then(con=>{
        console.log("data Gone")
    })
})


// Hosting Port
const Port=process.env.Port || 3000;
app.listen(Port,()=>console.log("Server Started")
)