const mongoose = require('mongoose')
const app = require('./app');



// monog connection 
(async()=>{
   try{
      mongoose.connect('mongodb://127.0.0.1:27017',
         {
             useNewUrlParser: true,
             useUnifiedTopology: true
         }
     ).then(() => {
         console.log("connected")
     }).catch((err) => {
         console.log(err)
     })

   app.listen(5000,()=>{
    console.log("listening on port 5000")
   })
   }catch(err){
    console.log(err);
    throw err;
   }
})()

module.exports = app;