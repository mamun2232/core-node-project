const data = require("../../liv/data");
const { hash } = require("../../helpers/utilitis");
const { parseJson } = require("../../helpers/utilitis");
const {createRandomString } = require("../../helpers/utilitis");

// modules scapholding
const handeler = {};

handeler.tokenHandeler = (requestProperties, callback) => {
  const accepctMethod = ["get", "post", "put", "delete"];
  // method check
  if (accepctMethod.indexOf(requestProperties.method) > -1) {
    // method check
    handeler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handeler._token = {};

// user post
handeler._token.post = (requestProperties, callback) => {
      // check the phone and pass valid 
      const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

      const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

      if(phone && password){
            // check korbo database ache kina sei phone 
            data.read('users' , phone , (error , userData) =>{
                  let passwordHash = hash(password)
                  // check password judi pass mile random token create korbo
                  if(passwordHash === parseJson(userData).password){
                        // create to token 
                        const tokenId = createRandomString(20);
                        const expires = Date.now() + 60 * 60 * 1000
                        const token = {
                              phone,
                              id: tokenId,
                              expires
                        }

                        // store to data base 
                        data.create('tokens', tokenId , token ,(error) =>{
                              if(!error){
                                    callback(200 , token)
                              }
                              else{
                                    callback(500 , {error: 'there was a problem server side'})
                              }

                        })


                  }
                  else{
                        callback(400 , {error: "Password not vaild"})
                  }
            })

      }
      else{
            callback(400 , {error: "Your Request is fail"})
      }

  
};

// user information get
handeler._token.get = (requestProperties, callback) => {
  // chack the id number is valid
  const id =
    typeof requestProperties.qyeryStringObj.id === "string" &&
    requestProperties.qyeryStringObj.id.trim().length === 11
      ? requestProperties.qyeryStringObj.id
      : false;

  if (id) {
    // look up the user (user ache kina chaeck korbo )
    data.read("tokens", id, (error, tokenData) => {
      // object takee pass kora hoise
      const token = { ...parseJson(tokenData) };
      if (!error && token) {
        callback(200, user);
      } else {
        callback(404, { error: "file read fail" });
      }
    });
  } else {
    callback(404, { error: "Request Was a not found" });
  }
};

// user update
handeler._token.update = (requestProperties, callback) => {
  // chack user information
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 11
      ? requestProperties.body.id
      : false;

      const extend =  typeof requestProperties.body.extend === 'boolean' &&
      requestProperties.body.extend === true
        ? true
        : false;

        if(id & extend){
            data.read('tokens' , id , (error , tokenData) =>{
                  const tokenObject = parseJson(tokenData)
                  if(tokenObject.expires > Date.now()){
                  tokenObject.expires = Date.now() + 60 * 60 * 1000;
                  // store to data base 
                  data.update('tokens' , id , tokenObject , (error) =>{
                        if(!error){
                              callback(200 , {error: 'token update id'})
                        }
                        else{
                              callback(500, {
                                    error: 'There was a server side error!',
                                });
                        }
                  })

                  }
                  else{
                        callback(400, {
                              error: 'Token already expired!',
                          });
                  }
            })

        }
        else{
            callback(400, {
                  error: 'There was a problem in your request',
              });
        }
 
};

// user delete
handeler._token.delete = (requestProperties, callback) => {
  // chack the phone number is valid
  const id =
  typeof requestProperties.qyeryStringObj.id === "string" &&
  requestProperties.qyeryStringObj.id.trim().length === 11
    ? requestProperties.qyeryStringObj.id
    : false;

  if (id) {
    data.read("tokens", id, (error, Tokendata) => {
      if (!error && Tokendata) {
        data.delete('tokens', id, (error) => {
          if (!error) {
            callback(200, { message: "User Delete SuccessFull" });
          } else {
            callback(500, { error: "server side error" });
          }
        });
      } else {
        callback(500, { error: "server side error" });
      }
    });
  } else {
    callback(400, { error: "there was request fail" });
  }
};

handeler._token.verifay = (id , phone , callback) =>{
      data.read('tokens' , id , (error , tokenData) =>{
            if(!error && tokenData){
                  // ekhane chak kortesi phone judi phone hoi ,, and time judi boro hoi jai 
                  if (parseJson(tokenData).phone === phone && parseJson(tokenData).expires > Date.now()) {
                        callback(true);
                    } 

            }
            else{
                  callback(false)
            }

      })
}

module.exports = handeler;
