const handeler = {}

handeler.notfounHandeler = (requestProperties , callback) =>{
      console.log(requestProperties);
      callback(404 , {
            message: 'this is notFound URl'
      })
}


module.exports = handeler