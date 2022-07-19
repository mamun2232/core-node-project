// scapholding 
const crypto = require('crypto');
const utilitis = {}

//  parse json string to  object 
utilitis.parseJson = (jsonString) =>{
      /* note: use valid object nao patate pare tai etike error hendeling kore parse korte hobe 
 */
let outPut;
   try{
      outPut = JSON.parse(jsonString)
   }
   catch{
      outPut = {}
   }

   return outPut
}

// password secure use to crypto module 
utilitis.hash = (str) =>{
   if(typeof(str) === 'string' && str.length > 0){
      let hash = crypto.createHmac('sha256', 'pogrammer')
                    
      // updating data
      .update(str)

      // Encoding to be used
      .digest('hex');
      return hash
   }
   else{
      return false
   }
   

}
module.exports = utilitis

