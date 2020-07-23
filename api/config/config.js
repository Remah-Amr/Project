  module.exports=function ConnectMongoDB(){
      const mongoose = require('mongoose');
      mongoose.connect('mongodb+srv://nada:handzone@hanzone-zzizo.mongodb.net/<dbname>?retryWrites=true&w=majority' ,
       { useNewUrlParser: true 
          ,useUnifiedTopology: true} )
        
          .then(()=>{
           console.log('mongodb connected')
       })
      
        
         }


