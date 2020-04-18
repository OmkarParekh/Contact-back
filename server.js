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

// Deleting Contact
app.post('/delete/:id',(req,res)=>{
    Contact.deleteOne({_id:req.params.id})
    .then(()=>{
        console.log(`Data Deleted of id ${req.params.id}`)
    })
})



// Add the Contact
app.post('/add/:Name/:Contact',(req,res)=>{
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

app.listen(process.env.PORT || 3000);
// const port=process.env.Port || 3000;
// app.listen(port,()=>console.log("Server Started")
// )