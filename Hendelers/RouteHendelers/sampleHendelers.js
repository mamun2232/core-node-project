


// modules scapholding 
const handeler = {}

handeler.sampleHandeler = (requestProperties , callback) =>{
      console.log(requestProperties);
      callback(200 , {
            message: 'this is a sample url'
      })
}


module.exports = handeler