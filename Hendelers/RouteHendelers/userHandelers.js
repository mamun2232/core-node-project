
const data = require('../../liv/data')
const {hash} = require('../../helpers/utilitis')
// modules scapholding 
const handeler = {}

handeler.userHandeler = (requestProperties , callback) =>{
      const accepctMethod = ["get" , "post" , 'put' , 'delete']
      // method check 
      if(accepctMethod.indexOf(requestProperties.method) > -1){
            // method check 
            handeler._user[requestProperties.method](requestProperties , callback)

      }
      else{
            callback(405)
      }
}


handeler._user = {}
// user post 
handeler._user.post = (requestProperties , callback) =>{
      // chack user information 
      const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false

      const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false

      const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false

      const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false

      const toAgree = typeof(requestProperties.body.toAgree) === 'boolean' && requestProperties.body.toAgree ? requestProperties.body.toAgree : false

      // chack validation 
      if(firstName && lastName && phone && password && toAgree){
            // make sure that the file all ready exsits 
            data.read('users', phone ,(error) =>{
                  // jeheuto fail ache kina chack kortesi tai error hole bujbo file ache 
                  if(error){
                        const userObject = {
                              firstName,
                              lastName,
                              phone,
                              password: hash(password),
                              toAgree
                        }

                        // store user to database 
                        data.create('users' , phone , userObject , (error) =>{
                              if(!error){
                                    callback(200, {
                                          'message': 'user cerate Successfull'
                                    })
                              }
                              else{
                                    callback(400, {
                                          'error': 'colud not create user.'
                                    })
                              }
                        })

                  }
                  else{
                        // all ready user ache 
                        callback(400 , {
                              error: "Server was a problem in server side"
                        })
                  }

            })

      }
      else{
            callback(400 , {
                  error: "You have a problem in your requst"
            })
      }

}




module.exports = handeler