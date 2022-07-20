const data = require("../../liv/data");
const { hash } = require("../../helpers/utilitis");
const { parseJson } = require("../../helpers/utilitis");
const tokenHandeler = require('./tokenHandelers')
// modules scapholding
const handeler = {};

handeler.userHandeler = (requestProperties, callback) => {
  const accepctMethod = ["get", "post", "put", "delete"];
  // method check
  if (accepctMethod.indexOf(requestProperties.method) > -1) {
    // method check
    handeler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handeler._user = {};

// user post
handeler._user.post = (requestProperties, callback) => {

  // chack user information
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

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

  const toAgree =
    typeof requestProperties.body.toAgree === "boolean" &&
    requestProperties.body.toAgree
      ? requestProperties.body.toAgree
      : false;

  // chack validation
  if (firstName && lastName && phone && password && toAgree) {
    // make sure that the file all ready exsits
    data.read("users", phone, (error) => {
      // jeheuto fail ache kina chack kortesi tai error hole bujbo file ache
      if (error) {
        const userObject = {
          firstName,
          lastName,
          phone,
          // password secure korar jonno hash user kora hoie
          password: hash(password),
          toAgree,
        };
        // store user to database
        data.create("users", phone, userObject, (error) => {
          if (!error) {
            callback(200, {
              message: "user cerate Successfull",
            });
          } else {
            callback(400, {
              error: "colud not create user.",
            });
          }
        });
      } else {
        // all ready user ache
        callback(400, {
          error: "Server was a problem in server side",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your requst",
    });
  }
};

// user information get
handeler._user.get = (requestProperties, callback) => {
  // chack the phone number is valid
  const phone =
    typeof requestProperties.qyeryStringObj.phone === "string" &&
    requestProperties.qyeryStringObj.phone.trim().length === 11
      ? requestProperties.qyeryStringObj.phone
      : false;

  if (phone) {
    // verifayToken 
    const token = typeof requestProperties.headersObj === 'string' ? requestProperties.headersObj : false
    tokenHandeler._token(token , phone , (tokenId) =>{

      
      if(tokenId){

         // look up the user (user ache kina chaeck korbo )
    data.read("users", phone, (error, data) => {
      // object takee pass kora hoise
      const user = { ...parseJson(data) };
      if (!error && user) {
        delete user.password;
        // user er password er delet
        callback(200, user);
      } else {
        callback(404, { error: "file read fail" });
      }
    });
  } else {
    callback(404, { error: "Request Was a not found" });
        
      }
    }) }};

// user update
handeler._user.update = (requestProperties, callback) => {
  // chack user information
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

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

  if (phone) {
    // jeti update korbe seti ache kina
    if (firstName || lastName || password) {
      // chack the user (user ache kina check korbo)
      data.read("users", phone, (error, user) => {
        const userData = { ...parseJson(user) };
        if (!error && userData) {
          // ja update korbo seti ace kina chek krbo
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }

          // store to database
          data.update("users", phone, userData, (error) => {
            if (!error) {
              callback(200, { message: "update seccessFull" });
            } else {
              callback(500, {
                error: "there was a problem in the server side!",
              });
            }
          });
        } else {
          callback(400, { error: "you have not update it" });
        }
      });
    } else {
      callback(400, { error: "you have not update it" });
    }
  } else {
    callback(400, { error: "you have problem in your request" });
  }
};

// user delete
handeler._user.delete = (requestProperties, callback) => {
  // chack the phone number is valid
  const phone =
    typeof requestProperties.qyeryStringObj.phone === "string" &&
    requestProperties.qyeryStringObj.phone.trim().length === 11
      ? requestProperties.qyeryStringObj.phone
      : false;

  if (phone) {
    data.read("users", phone, (error, data) => {
      if (!error && data) {
        data.delete(users, phone, (error) => {
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

module.exports = handeler;
