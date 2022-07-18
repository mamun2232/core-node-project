// dependencies
const http = require('http');
const {handelReqRes} = require('./helpers/handelReqRes');
const url = require('url');
const enverment = require('./helpers/evenverment')
const data = require('./liv/data');

// app object : module caploding 
const app = {}

// configuration
app.config = {
      port: 5000
}

// note: testing for file system 
data.create('test', 'newFile' , {name: "Mamun" , job: "developer"} ,(error)=>{
// console.log('error was' , error);
})

data.read('test' , 'newFile' , (eror , result) =>{
      // console.log(eror , result);
})

data.update('test', 'newFile' , {name: "Mamun" , job: "Desine"} ,(error)=>{
      // console.log('error was' , error);
      })

data.delete('test', 'newFile' ,(error)=>{
      console.log('error was' , error);
      })





// create a server 
app.createServer = () => {
      const server  = http.createServer(app.handelReqRes)
      server.listen(enverment.port, () =>{
            console.log(`listening to port ${enverment.port}`);
      })
}

// handle request and response
app.handelReqRes = handelReqRes


// start the server 
app.createServer()