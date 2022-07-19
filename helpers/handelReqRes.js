
// dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const {notfounHandeler} = require('../Hendelers/RouteHendelers/notfoundHandeler');
const {parseJson} = require('./utilitis')

// scaphollding
const handeler = {}

handeler.handelReqRes  = ( req , res) =>{
      // work in request hendeler
      // get the url perse in
      const persedUrl = url.parse(req.url , true)
      const path = persedUrl.path
      const trimmedPath = path.replace(/^\/+|\/+$/g, '')
      const method = req.method.toLowerCase()
      const qyeryStringObj = persedUrl.query
      const headersObj = req.headers

      const requestProperties = {
            persedUrl,
            path ,
            trimmedPath,
            method,
            qyeryStringObj,
            headersObj

      }
       
      // body te data pataile ta buffer hisabe ektu ektu asbe sei data recive korar jonno
      const decoder = new StringDecoder('utf-8')
      let realData = ''
      // check Route 
      const chouseHandelers = routes[trimmedPath] ? routes[trimmedPath] : notfounHandeler
     
      req.on('data' , (buffer) => {
            realData += decoder.write(buffer)
      })
      req.on('end' , () =>{
            realData += decoder.end()
            // real data jeta asbe setake pase korte hobe 
            requestProperties.body = parseJson(realData)


           
            chouseHandelers(requestProperties , (statusCode , paylod) => {
                  // type chack 
                  statusCode = typeof(statusCode) === 'number' ? statusCode : 500
                  paylod = typeof(paylod) === 'object' ? paylod : {}
                  const paylodSting = JSON.stringify(paylod)
                  // return the final response 
                  
                  res.setHeader('Content-Type', 'application/json');
                  res.writeHead(statusCode)
                  res.end(paylodSting)
            })
            
            // response hendeler
      // res.end('Hellow World')

      })
    
}


module.exports = handeler