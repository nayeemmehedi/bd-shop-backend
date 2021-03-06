var express = require('express')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const ObjectId=require('mongodb').ObjectId

var app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.teacx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
  const collection = client.db("bdshop").collection("bdshop1");
  const collectionRegistration = client.db("bdshop2").collection("bdshop02");
  

  app.get('/', function (req, res) {
    res.send('hello world')
  })


  app.get('/event',(req,res)=>{

    

    collection.find({})
    .toArray((err,doc)=>{

        res.send(doc)


    })
  })




  app.get('/event/:id',(req,res)=>{

    const id = req.params.id

    collection.find({_id:ObjectId(id)})
    .toArray((err,doc)=>{

        res.send(doc[0])


    })
  })


  // app.post('/addEvents',(req,res)=>{

  //   const events = req.body
   
   
  //     collection.insertMany(events,(err,result)=>{

       

  //       res.send({count:result})



  //     })

  // })


  app.post('/addRegistration',(req,res)=>{

    const registration = req.body

    
   
    collectionRegistration.insertOne(registration,(err,result)=>{


      res.send({count:result})



      })

  })


  app.post('/addlastEvent',(req,res)=>{

    const addnewevent = req.body

    
   
    collection.insertOne(addnewevent,(err,result)=>{


      res.send({count:result})



      })

  })












  app.get('/registrationAll',(req,res)=>{

    

    collectionRegistration.find({})
    .toArray((err,doc)=>{

        res.send(doc)


    })
  })



  app.get('/registrationAll/:email',(req,res)=>{

    const email = req.params.userEmail

    

    collectionRegistration.find({email:email})
    .toArray((err,doc)=>{

        res.send(doc)


    })
  })



  app.delete('/delete/:id',(req,res)=>{

    const id =req.params.id

    collectionRegistration.deleteOne({_id:ObjectId(id)},(result)=>{

      if(!err){
        res.send({count:1})

      }
      

    })




  })





});





app.listen(process.env.PORT||4540)
